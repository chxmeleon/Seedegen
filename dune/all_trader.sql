WITH sales_one AS(
SELECT seller, sum(original_amount), sum(usd_amount) AS usd_amount, count(*) as total
FROM NFT.trades
WHERE (original_currency = 'ETH' OR original_currency = 'WETH') 
AND block_time >= NOW() - INTERVAL '1 MONTH' 
AND "nft_contract_address" != '\xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
GROUP BY seller), 

buys_one AS(
SELECT buyer, sum(original_amount), 
sum(original_amount) AS usd_amount,
count(*) as total
FROM NFT.trades
WHERE (original_currency = 'ETH' OR original_currency = 'WETH') 
AND block_time >= NOW() - INTERVAL '1 MONTH' 
AND "nft_contract_address" != '\xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
GROUP BY buyer),

gain_one_month AS(
  SELECT CONCAT('0', substring(sales_one.seller::text from 2)) as "Wallet Address",
  FROM sales_one
  JOIN buys_one
  ON sales_one.seller = buys_one.buyer
  ORDER BY (sales_one.sum - buys_one.sum) DESC
  LIMIT 500
),

sales_all AS(
SELECT seller, sum(original_amount), sum(usd_amount) AS usd_amount, count(*) as total
FROM NFT.trades
WHERE (original_currency = 'ETH' OR original_currency = 'WETH') AND "block_time" >= '2020-11-30 00:00:00' AND "nft_contract_address" != '\xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
GROUP BY seller), 

buys_all AS(
SELECT buyer, sum(original_amount), 
sum(original_amount) AS usd_amount,
count(*) as total
FROM NFT.trades
WHERE (original_currency = 'ETH' OR original_currency = 'WETH') AND "block_time" >= '2020-11-30 00:00:00'  AND "nft_contract_address" != '\xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'
GROUP BY buyer),

gain_all AS(
  SELECT 
  CONCAT('0', substring(sales_all.seller::text from 2)) as "Wallet Address",
  FROM sales_all
  JOIN buys_all
  ON sales_all.seller = buys_all.buyer
  ORDER BY (sales_all.sum - buys_all.sum) DESC
  LIMIT 1000
)

SELECT * FROM gains_all
UNION ALL
SELECT * FROM gains_one
