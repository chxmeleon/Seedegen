CREATE
OR REPLACE VIEW dune_user_generated.NFT_TOP_100 AS
WITH
  contracts AS (
    SELECT
      SUM(original_amount),
      nft_contract_address AS address
    FROM
      nft.trades
    WHERE
      "block_time" >= '2020-11-30 00:00:00'
      AND buyer != seller
      AND original_currency in ('ETH', 'WETH')
      AND "platform" != 'LooksRare'
    GROUP BY
      nft_contract_address
    ORDER BY
      SUM(original_amount) DESC
    LIMIT
      99
  ),
  nfts AS (
    SELECT
      "nft_contract" AS contract,
      "nft_collection"
    FROM
      dune_user_generated.NFT_Projects_Name
  )
SELECT
  address,
  nft_collection
FROM
  contracts
  LEFT JOIN nfts ON contracts.address = nfts.contract
ORDER BY
  sum DESC
