WITH sales AS(
SELECT seller, sum(original_amount), sum(usd_amount) AS usd_amount, count(*) as total
FROM NFT.trades
WHERE (original_currency = 'ETH' OR original_currency = 'WETH') AND "block_time" >= '2020-11-30 00:00:00' AND "nft_contract_address" != '\xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
GROUP BY seller), 

buys AS(
SELECT buyer, sum(original_amount), 
sum(original_amount) AS usd_amount,
count(*) as total
FROM NFT.trades
WHERE (original_currency = 'ETH' OR original_currency = 'WETH') AND "block_time" >= '2020-11-30 00:00:00'  AND "nft_contract_address" != '\xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
GROUP BY buyer),

ens as (
SELECT distinct on (address)
name, address
FROM (
SELECT distinct on (name) 
name, address, updated_at
FROM labels.labels
WHERE "type" = 'ens name'
ORDER BY name, updated_at desc
) temp
ORDER BY address, updated_at desc
)

SELECT ROW_NUMBER() OVER (ORDER BY (sales.sum - buys.sum) DESC) AS "Rank",
CASE WHEN ens.name IS NOT NULL 
THEN CONCAT(ens.name, '.eth')
ELSE CONCAT(substring(sales.seller::text from 2), CONCAT('0', substring(sales.seller::text from 2)))
END as "Wallet",
CONCAT('0', substring(sales.seller::text from 2)) as "Wallet Address",
(sales.sum - buys.sum) AS "profit (ETH)",
sales.sum AS "ETH Received (ETH)",
buys.sum AS "ETH Spent (ETH)",
CASE WHEN
buys.sum < 0.25 THEN 0
ELSE ROUND(((sales.sum - buys.sum)/buys.sum), 2) END AS "ROI %",
buys.total + sales.total as "Total # of trades (ETH)",
buys.sum+sales.sum as "Total trading volume (ETH)"
FROM sales
JOIN buys
ON sales.seller = buys.buyer
JOIN ens
ON sales.seller = ens.address
ORDER BY "profit (ETH)" DESC
LIMIT 1000
