WITH
  top_100 AS (
    SELECT 
      "address" AS contract_address
    FROM dune_user_generated.NFT_TOP_100
  ),
  nfts AS (
    SELECT 
      "nft_contract" AS contract,
      "nft_collection" AS name
    FROM dune_user_generated.NFT_Projects_Name
  ),
  trader AS (
    SELECT
      "Wallet Address" AS address
    FROM
      dune_user_generated.trader_address
  ),
  mint AS (
    select
      erc721."to" AS "buyer",
      (value / 1e18) AS spent,
      erc721."evt_tx_hash" AS mint_tx_hash,
      erc721."contract_address",
      CAST(erc721."tokenId" AS varchar(10)) as tokenid
    FROM
      erc721."ERC721_evt_Transfer" erc721
      LEFT JOIN ethereum."transactions" et on erc721."evt_tx_hash" = et.hash
    WHERE
      erc721."from" = '\x0000000000000000000000000000000000000000'
      AND et."block_time" >= '2020-11-30 00:00:00'
  ),
  buy AS (
    select
      "buyer",
      "nft_contract_address",
      "nft_project_name",
      "nft_token_id" as tokenid,
      "original_amount" as spent,
      "tx_hash"
    from
      nft."trades"
    where
      "block_time" >= '2020-11-30 00:00:00'
      AND "original_currency" in ('ETH','WETH')
      --   AND "buyer" =  CONCAT('\x', substring('{{address}}' from 3))::bytea
      AND "erc_standard" != 'erc1155'
      AND LENGTH(nft_token_id) <= 5
      AND "platform" != 'LooksRare'
  ),
  sell AS (
    select
      "seller",
      "nft_contract_address",
      "nft_project_name",
      "nft_token_id" as tokenid,
      "original_amount" as received,
      "tx_hash"
    from
      nft."trades"
    where
      "block_time" >= '2020-11-30 00:00:00'
      AND "original_currency" in ('ETH','WETH')
      --   AND "seller" = CONCAT('\x', substring('{{address}}' from 3))::bytea
      AND "erc_standard" != 'erc1155'
      AND LENGTH(nft_token_id) <= 5
      AND "platform" != 'LooksRare'
  )
SELECT
  ROW_NUMBER() OVER (ORDER BY (sell.received - buy.spent) DESC) AS "Rank",
  trader.address AS "address",
  buy.spent AS "cost",
  sell.received AS "got",
  CASE WHEN (sell.received - buy.spent) > 0 THEN 'WIN' ELSE 'LOSE'
  END AS "stauts",
  (sell.received - buy.spent) AS "net",
  nfts.name AS "name",
  CONCAT('0',substring(sell.nft_contract_address :: text from 2)) AS "project address",
  buy.tokenid AS "token id",
  CONCAT('0',substring(buy."tx_hash" :: text from 2)) AS "buy tx_hash",
  CONCAT('0',substring(sell."tx_hash" :: text from 2)) AS "sell tx_hash"
FROM
  sell
  FULL JOIN buy ON buy."buyer" = sell."seller"
  AND buy."nft_contract_address" = sell."nft_contract_address"
  AND buy.tokenid = sell.tokenid
  FULL JOIN mint ON mint."buyer" = sell."seller"
  AND mint."contract_address" = sell."nft_contract_address"
  AND mint.tokenid = sell.tokenid
  JOIN trader ON buy.buyer = CONCAT('\x',substring(trader.address from 3))::bytea
  FULL JOIN top_100 ON buy."nft_contract_address" = top_100.contract_address
  LEFT JOIN nfts ON nfts.contract = buy."nft_contract_address"
WHERE
  (sell.received - buy.spent) != '0'
ORDER BY "address" DESC
