WITH os_remove AS (SELECT call_tx_hash AS txs
                    FROM opensea."WyvernExchange_call_atomicMatch_"
                    WHERE (addrs[4] = '\x5b3256965e7c3cf26e11fcaf296dfc8807c01073'
                           OR addrs[11] = '\x5b3256965e7c3cf26e11fcaf296dfc8807c01073')
                    AND call_success
                    AND call_block_time > '2022-01-21'
                    GROUP BY 1
                    HAVING count(DISTINCT CASE WHEN addrs[7] = '\x0000000000000000000000000000000000000000'
                        THEN '\xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' ELSE addrs[7]
                        END) > 1),


supply_and_holders AS (WITH aggregated AS 
        (WITH transfers AS 
            (   (SELECT "to" AS wallet,
                1 AS value,
                contract_address
                FROM erc721."ERC721_evt_Transfer" n
                WHERE "from" = '\x0000000000000000000000000000000000000000')
            UNION ALL
                (SELECT "to" AS wallet,
                1 AS value,
                contract_address
                FROM erc721."ERC721_evt_Transfer" n
                WHERE "from" != '\x0000000000000000000000000000000000000000')
            UNION ALL 
                (SELECT "from" AS wallet,
                -1 AS value,
                contract_address
                FROM erc721."ERC721_evt_Transfer" n
                WHERE "from" != '\x0000000000000000000000000000000000000000')
            )
        SELECT wallet,
        SUM(value) AS tokens,
        contract_address
        FROM transfers 
        GROUP BY 3, 1)
    SELECT contract_address AS contract,
    COUNT(distinct wallet) AS owners,
    SUM(tokens) AS supply
    FROM aggregated
    WHERE tokens > 0 
    GROUP BY 1
    ORDER BY 2 DESC),
weekly_volume AS (
    SELECT SUM(original_amount) AS weekly_eth_volume,
    SUM(usd_amount) AS weekly_usd_volume,
    nft_contract_address AS contract
    FROM nft.trades
    WHERE block_time > now() - interval '1 week'
    AND buyer != seller
    AND tx_hash != '\x92488a00dfa0746c300c66a716e6cc11ba9c0f9d40d8c58e792cc7fcebf432d0'
    AND tx_hash NOT IN (SELECT txs FROM os_remove)
    GROUP BY nft_contract_address),
daily_volume AS (
    SELECT SUM(original_amount) AS daily_eth_volume,
    SUM(usd_amount) AS daily_usd_volume,
    nft_contract_address AS contract
    FROM nft.trades
    WHERE block_time > now() - interval '1 day'
    AND buyer != seller
    AND tx_hash != '\x92488a00dfa0746c300c66a716e6cc11ba9c0f9d40d8c58e792cc7fcebf432d0'
    AND tx_hash NOT IN (SELECT txs FROM os_remove)
    GROUP BY nft_contract_address),
prices AS (SELECT nft_contract_address,
    percentile_cont(.05) within GROUP (ORDER BY original_amount) AS floor,
    percentile_cont(.5) within GROUP (ORDER BY original_amount) AS median,
    AVG(original_amount) AS average
    FROM nft.trades
    WHERE original_currency in ('ETH','WETH')
    AND block_time > (date_trunc('day', now()))
    AND buyer != seller
    AND tx_hash != '\x92488a00dfa0746c300c66a716e6cc11ba9c0f9d40d8c58e792cc7fcebf432d0'
    AND tx_hash NOT IN (SELECT txs FROM os_remove)
    GROUP BY 1),

nfts AS (
SELECT (CASE
       WHEN (nft_project_name IS NOT NULL AND nft_contract_address != '\xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270') THEN nft_project_name
       WHEN nft_contract_address = '\xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB' THEN 'CryptoPunks'
       WHEN nft_contract_address = '\xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' THEN 'Bored Ape Yacht Club'
       WHEN nft_contract_address = '\x8Cd8155e1af6AD31dd9Eec2cEd37e04145aCFCb3' THEN 'Cupcats'
       WHEN nft_contract_address = '\xd31fc221d2b0e0321c43e9f6824b26ebfff01d7d' THEN 'Brotchain'
       WHEN nft_contract_address = '\xc0cf5b82ae2352303b2ea02c3be88e23f2594171' THEN 'The Fungible by Pak'
       WHEN nft_contract_address = '\xb932a70a57673d89f4acffbe830e8ed7f75fb9e0' THEN 'SuperRare'
       WHEN nft_contract_address = '\xa7ee407497b2aeb43580cabe2b04026b5419d1dc' THEN 'Superlative Secret Society (Official)'
       WHEN nft_contract_address = '\xa0c38108bbb0f5f2fb46a2019d7314cce38f3f22' THEN 'ArcadeNFT'
       WHEN nft_contract_address = '\xc3f733ca98e0dad0386979eb96fb1722a1a05e69' THEN 'Official MoonCats - Acclimated'
       WHEN nft_contract_address = '\xe7191c896d59a9c39965e16c5184c44172ec9cf9' THEN 'The Soliders of the Metaverse'
       WHEN nft_contract_address = '\x61598e2e6b012293cb6012b055ad77aa020e0206' THEN 'BroadcastersNFT'
       WHEN nft_contract_address = '\xa08126f5e1ed91a635987071e6ff5eb2aeb67c48' THEN 'Galaxy-Eggs'
       WHEN nft_contract_address = '\x219b8ab790decc32444a6600971c7c3718252539' THEN 'Sneaky Vampire Syndicate'
       WHEN nft_contract_address = '\x329fd5e0d9aad262b13ca07c87d001bec716ed39' THEN 'Adventure Cards'
       WHEN nft_contract_address = '\xa7206d878c5c3871826dfdb42191c49b1d11f466' THEN 'LOSTPOETS'
       WHEN nft_contract_address = '\xa66f3bd98b4741bad68bcd7511163c6f855d2129' THEN 'Impermanent Digital'
       WHEN nft_contract_address = '\xbad6186e92002e312078b5a1dafd5ddf63d3f731' THEN 'Anonymice'
       WHEN nft_contract_address = '\x33825285eb66c11237cc68cc182c1e9bf01ba00b' THEN 'The Glitches NFT'
       WHEN nft_contract_address = '\x57a204aa1042f6e66dd7730813f4024114d74f37' THEN 'CyberKongz'
       WHEN nft_contract_address = '\x0ee24c748445fb48028a74b0ccb6b46d7d3e3b33' THEN 'NAH FUNGIBLE BONES'
       WHEN nft_contract_address = '\xd153f0014db6d1f339c6340d2c9f59214355d9d7' THEN 'Crypto Hobos'
       WHEN nft_contract_address = '\x943cc300dd938d8490d33d794507fedc25c49002' THEN 'uunicorns'
       WHEN nft_contract_address = '\xe433e90c5b898819544346e73a501d9e8013dbd8' THEN 'CurrencyPunks'
       WHEN nft_contract_address = '\x050dc61dfb867e0fe3cf2948362b6c0f3faf790b' THEN 'Wrapped PixelMap'
       WHEN nft_contract_address = '\x36d30b3b85255473d27dd0f7fd8f35e36a9d6f06' THEN '888 inner circle'
       WHEN nft_contract_address = '\xfb61bd914d4cd5509ecbd4b16a0f96349e52db3d' THEN 'APE DAO REMIX'
       WHEN nft_contract_address = '\x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6' THEN 'CrypToadz by GREMPLIN'
       WHEN nft_contract_address = '\x73da73ef3a6982109c4d5bdb0db9dd3e3783f313' THEN 'My Curio Cards'
       WHEN nft_contract_address = '\xecdd2f733bd20e56865750ebce33f17da0bee461' THEN 'The CryptoDads'
       WHEN nft_contract_address = '\xb5f3dee204ca76e913bb3129ba0312b9f0f31d82' THEN 'Omnimorphs'
       WHEN nft_contract_address = '\x2d0ee46b804f415be4dc8aa1040834f5125ebd2e' THEN 'Dapper Dinos NFT'
       WHEN nft_contract_address = '\x8630cdeaa26d042f0f9242ca30229b425e7f243f' THEN 'Claylings'
       WHEN nft_contract_address = '\xc9e2c9718ff7d3129b9ac12168195507e4275cea' THEN '0xVampire Project'
       WHEN nft_contract_address = '\xf36446105ff682999a442b003f2224bcb3d82067' THEN 'Axolittles'
       WHEN nft_contract_address = '\x4f89cd0cae1e54d98db6a80150a824a533502eea' THEN 'PEACEFUL GROUPIES'
       WHEN nft_contract_address = '\x99c2546aebc070fb1f286a346ec4d25e70533474' THEN 'Quadrums'
       WHEN nft_contract_address = '\x11739d7bd793543a6e83bd7d8601fcbcde04e798' THEN 'Wrapped Strikers'
       WHEN nft_contract_address = '\x3702f4c46785bbd947d59a2516ac1ea30f2babf2' THEN 'GalaxyFightClub'
       WHEN nft_contract_address = '\x7ea3cca10668b8346aec0bf1844a49e995527c8b' THEN 'CyberKongz VX'
       WHEN nft_contract_address = '\xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270' THEN 'Art Blocks (Combined)'
       WHEN nft_contract_address = '\x80416304142fa37929f8a4eee83ee7d2dac12d7c' THEN 'Generative Masks'
       WHEN nft_contract_address = '\x76be3b62873462d2142405439777e971754e8e77' THEN 'Parallel'
       WHEN nft_contract_address = '\x60e4d786628fea6478f785a6d7e704777c86a7c6' THEN 'Mutant Ape Yacht Club'
       WHEN nft_contract_address = '\xff9c1b15b16263c61d017ee9f65c50e4ae0113d7' THEN 'Loot'
       WHEN nft_contract_address = '\xc92ceddfb8dd984a89fb494c376f9a48b999aafc' THEN 'Creature World'
       WHEN nft_contract_address = '\x3f5fb35468e9834a43dca1c160c69eaae78b6360' THEN 'Koala Intelligence Agency'
       WHEN nft_contract_address = '\xbd3531da5cf5857e7cfaa92426877b022e612cf8' THEN 'Pudgy Penguins'
       WHEN nft_contract_address = '\x343f999eaacdfa1f201fb8e43ebb35c99d9ae0c1' THEN 'Lonely Aliens Space Club'
       WHEN nft_contract_address = '\xaadc2d4261199ce24a4b0a57370c4fcf43bb60aa' THEN 'The Currency'
       WHEN nft_contract_address = '\xe785e82358879f061bc3dcac6f0444462d4b5330' THEN 'World Of Women'
       WHEN nft_contract_address = '\x3F4a885ED8d9cDF10f3349357E3b243F3695b24A' THEN 'Incognito'
       WHEN nft_contract_address = '\x7afeda4c714e1c0a2a1248332c100924506ac8e6' THEN 'FVCK_CRYSTAL'
       WHEN nft_contract_address = '\x49ac61f2202f6a2f108d59e77535337ea41f6540' THEN 'Star Sailor Siblings'
       WHEN nft_contract_address = '\x88091012eedf8dba59d08e27ed7b22008f5d6fe5' THEN 'Secret Society of Whales'
       WHEN nft_contract_address = '\xbe6e3669464e7db1e1528212f0bff5039461cb82' THEN 'Wicked Apes Bone Club'
       WHEN nft_contract_address = '\x7bd29408f11d2bfc23c34f18275bbf23bb716bc7' THEN 'Meebits'
       WHEN nft_contract_address = '\x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63' THEN 'Blitmap'
       WHEN nft_contract_address = '\x1a92f7381b9f03921564a437210bb9396471050c' THEN 'Cool Cats'
       WHEN nft_contract_address = '\x8184a482a5038b124d933b779e0ea6e0fb72f54e' THEN 'Wanderers'
       WHEN nft_contract_address = '\x3b3ee1931dc30c1957379fac9aba94d1c48a5405' THEN 'FND NFT'
       WHEN nft_contract_address = '\xdda32aabbbb6c44efc567bac5f7c35f185338456' THEN 'Cypher'
       WHEN nft_contract_address = '\x80adb36595239fe918c7d118c1f81e07d070801a' THEN 'HeavenComputer'
       WHEN nft_contract_address = '\xd4d871419714b778ebec2e22c7c53572b573706e' THEN 'Stoner Cats'
       WHEN nft_contract_address = '\x797a48c46be32aafcedcfd3d8992493d8a1f256b' THEN 'MintPassFactory'
       WHEN nft_contract_address = '\xf621b26ce64ed28f42231bcb578a8089f7958372' THEN 'Bored Mummy Waking Up'
       WHEN nft_contract_address = '\x375ea781c49eafedde07afe6196f885761f166ae' THEN 'CryptoTrunks'
       WHEN nft_contract_address = '\x4a8b01e437c65fa8612e8b699266c0e0a98ff65c' THEN 'Space Poggers'
       WHEN nft_contract_address = '\xf4ee95274741437636e748ddac70818b4ed7d043' THEN 'The Doge Pound'
       WHEN nft_contract_address = '\x91f7bb6900d65d004a659f34205beafc3b4e136c' THEN 'Derpy Birds'
       WHEN nft_contract_address = '\x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d' THEN '0N1 Force'
       WHEN nft_contract_address = '\x18df6c571f6fe9283b87f910e41dc5c8b77b7da5' THEN 'Animetas'
       WHEN nft_contract_address = '\xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d' THEN 'FLUF'
       WHEN nft_contract_address = '\xb159f1a0920a7f1d336397a52d92da94b1279838' THEN 'Royal Society'
       WHEN nft_contract_address = '\x0fb69d1dc9954a7f60e83023916f2551e24f52fc' THEN 'Lost Souls Sanctuary'
       WHEN nft_contract_address = '\x82c7a8f707110f5fbb16184a5933e9f78a34c6ab' THEN 'Emblem Vault V2'
       WHEN nft_contract_address = '\x2acab3dea77832c09420663b0e1cb386031ba17b' THEN 'DeadFellaz'
       WHEN nft_contract_address = '\xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c' THEN 'VoX Series 1'
       WHEN nft_contract_address = '\x15c2b137e59620552bd0d712fe7279cf1f47468d' THEN 'Glue Factory Show'
       WHEN nft_contract_address = '\x31f3bba9b71cb1d5e96cd62f0ba3958c034b55e9' THEN 'Party Penguins'
       WHEN nft_contract_address = '\x763864f1a74d748015f45f7c1181b60e62e40804' THEN 'Dope Shibas'
       WHEN nft_contract_address = '\xd0a07a76746707f6d6d36d9d5897b14a8e9ed493' THEN 'Pixel Vault Founder`s DAO'
       WHEN nft_contract_address = '\xbace7e22f06554339911a03b8e0ae28203da9598' THEN 'CryptoArte'
       WHEN nft_contract_address = '\x50f5474724e0ee42d9a4e711ccfb275809fd6d4a' THEN 'Sandbox`s LANDs'
       WHEN nft_contract_address = '\x0b0b186841c55d8a09d53db48dc8cab9dbf4dbd6' THEN 'Satoshibles'
       WHEN nft_contract_address = '\xda9f43015749056182352e9dc6d3ee0b6293d80a' THEN 'EtherLambos'
       WHEN nft_contract_address = '\x18c7766a10df15df8c971f6e8c1d2bba7c7a410b' THEN 'Vogu'
       WHEN nft_contract_address = '\x91673149ffae3274b32997288395d07a8213e41f' THEN 'JunkYardDogs'
       WHEN nft_contract_address = '\x45db714f24f5a313569c41683047f1d49e78ba07' THEN 'Space Punks'
       WHEN nft_contract_address = '\x3fe1a4c1481c8351e91b64d5c398b159de07cbc5' THEN 'SupDucks'
       WHEN nft_contract_address = '\x80a4b80c653112b789517eb28ac111519b608b19' THEN 'Crypto Cannabis Club'
       WHEN nft_contract_address = '\x83b7261db8c795701c6fc86d1fcd073ece940e10' THEN 'MembershipToken'
       WHEN nft_contract_address = '\xcab65c60d9dc47e1d450c7e9074f73f1ff75f181' THEN 'Proof of Steak'
       WHEN nft_contract_address = '\xef0182dc0574cd5874494a120750fd222fdb909a' THEN 'RumbleKongLeague'
       WHEN nft_contract_address = '\x4Fece400c0d3DB0937162AB44BAB34445626eCfe' THEN 'ETH.TOWN Hero'
       WHEN nft_contract_address = '\xc70be5b7c19529ef642d16c10dfe91c58b5c3bf0' THEN 'Mythereum Card'
       WHEN nft_contract_address = '\xb2c0782ae4a299f7358758b2d15da9bf29e1dd99' THEN 'EtheremonAsset'
       WHEN nft_contract_address = '\x14b2d558687942834839874d33a73c852be5401d' THEN 'WWWorld Cup'
       WHEN nft_contract_address = '\xdcaad9fd9a74144d226dbf94ce6162ca9f09ed7e' THEN 'CryptoStrikers'
       WHEN nft_contract_address = '\xcfbc9103362aec4ce3089f155c2da2eea1cb7602' THEN 'CryptoCrystal'
       WHEN nft_contract_address = '\x663e4229142a27f00bafb5d087e1e730648314c3' THEN 'PandaEarth'
       WHEN nft_contract_address = '\xa92e3ab42c195e52c9fbf129be47ecbb03845dfd' THEN 'Masterpieces'
       WHEN nft_contract_address = '\x41a322b28d0ff354040e2cbc676f0320d8c8850d' THEN 'SuperRare'
       WHEN nft_contract_address = '\x273f7f8e6489682df756151f5525576e322d51a3' THEN 'MyCryptoHeroes:Hero'
       WHEN nft_contract_address = '\xd4e4078ca3495de5b1d4db434bebc5a986197782' THEN 'Autoglyphs'
       WHEN nft_contract_address = '\xdceaf1652a131f32a821468dc03a92df0edd86ea' THEN 'MyCryptoHeroes:Extension'
       WHEN nft_contract_address = '\x913ae503153d9a335398d0785ba60a2d63ddb4e2' THEN 'SomniumSpace'
       WHEN nft_contract_address = '\x11595fFB2D3612d810612e34Bc1C2E6D6de55d26' THEN 'Tom Sachs Rocket Components'
       WHEN nft_contract_address = '\xdf801468a808a32656d2ed2d2d80b72a129739f4' THEN 'Somnium Space Cubes'
       WHEN nft_contract_address = '\x181aea6936b407514ebfc0754a37704eb8d98f91' THEN 'yInsurenNFT'
       WHEN nft_contract_address = '\x6fc355d4e0ee44b292e50878f49798ff755a5bbc' THEN 'DeadHeads'
       WHEN nft_contract_address = '\x3a8778a58993ba4b941f85684d74750043a4bb5f' THEN 'Bulls On The Block'
       WHEN nft_contract_address = '\x00039fc9e54a042a0bdc85a0baf3a0274c3564dc' THEN 'The Million Dollar Punk Draw'
       WHEN nft_contract_address = '\x47e22659d9ae152975e6cbfa2eed5dc8b75ac545' THEN 'Fortune Media'
       WHEN nft_contract_address = '\xb9341cca0a5f04b804f7b3a996a74726923359a8' THEN 'OFF BLUE'
       WHEN nft_contract_address = '\xbc4ca343167a5e2d9f700cf5b6b3f849585cd6fc' THEN 'The 140 Collection (Twitter)'
       WHEN nft_contract_address = '\xd92e44ac213b9ebda0178e1523cc0ce177b7fa96' THEN 'Beeple Round 2 Open Edition'
       WHEN nft_contract_address = '\x4ad4455ad5ef891695c221e8e683efa65fabede0' THEN 'Bullrun Babes'
       WHEN nft_contract_address = '\xe3782b8688ad2b0d5ba42842d400f7adf310f88d' THEN 'BCCG'
       WHEN nft_contract_address = '\x099689220846644f87d1137665cded7bf3422747' THEN 'Robotos'
       WHEN nft_contract_address = '\x86f6bf16f495afc065da4095ac12ccd5e83a8c85' THEN 'Crazy Lizard Army'
       WHEN nft_contract_address = '\xa98771a46Dcb34B34cDAD5355718F8a97C8E603e' THEN 'EulerBeats Enigma'
       WHEN nft_contract_address = '\xf3e6dbbe461c6fa492cea7cb1f5c5ea660eb1b47' THEN 'FameLadySquad'
       WHEN nft_contract_address = '\xdfacd840f462c27b0127fc76b63e7925bed0f9d5' THEN 'Avid Lines'
       WHEN nft_contract_address = '\x8754f54074400ce745a7ceddc928fb1b7e985ed6' THEN 'EulerBeats Genesis'
       WHEN nft_contract_address = '\x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42' THEN 'Forgotten Runes Wizards Cult'
       WHEN nft_contract_address = '\xe4cfae3aa41115cb94cff39bb5dbae8bd0ea9d41' THEN 'COVIDPunks'
       WHEN nft_contract_address = '\x22c36bfdcef207f9c0cc941936eff94d4246d14a' THEN 'Bored Ape Chemistry Club'
       WHEN nft_contract_address = '\x7ab2352b1d2e185560494d5e577f9d3c238b78c5' THEN 'Adam Bomb Squad'
       WHEN nft_contract_address = '\x4f8730e0b32b04beaa5757e5aea3aef970e5b613' THEN 'Bloot (not for Weaks)'
       WHEN nft_contract_address = '\x34b4df75a17f8b3a6eff6bba477d39d701f5e92c' THEN 'GEVOLs'
       WHEN nft_contract_address = '\x05a46f1e545526fb803ff974c790acea34d1f2d6' THEN 'The n project'
       WHEN nft_contract_address = '\xc22616e971a670e72f35570337e562c3e515fbfe' THEN 'Playing Arts Crypto Edition'
       WHEN nft_contract_address = '\xce25e60a89f200b1fa40f6c313047ffe386992c3' THEN 'dotdotdots'
       WHEN nft_contract_address = '\x392179031da3012dac321703a29e4c9fbd26316b' THEN 'Al Cabones'
       WHEN nft_contract_address = '\x1ca39c7f0f65b4da24b094a9afac7acf626b7f38' THEN 'GEN.ART Membership'
       WHEN nft_contract_address = '\x40fb1c0f6f73b9fc5a81574ff39d27e0ba06b17b' THEN 'The Mike Tyson NFT Collection by Cory Van Lew'
       WHEN nft_contract_address = '\xf497253c2bb7644ebb99e4d9ecc104ae7a79187a' THEN 'The Sevens (Official)'
       WHEN nft_contract_address = '\x8943c7bac1914c9a7aba750bf2b6b09fd21037e0' THEN 'Lazy Lions'
       WHEN nft_contract_address = '\xc9cb0fee73f060db66d2693d92d75c825b1afdbf' THEN 'First First NFTs'
       WHEN nft_contract_address = '\x8bf2f876e2dcd2cae9c3d272f325776c82da366d' THEN 'Extension Loot (For Adventurers)'
       WHEN nft_contract_address = '\x1b829b926a14634d36625e60165c0770c09d02b2' THEN 'Treeverse'
       WHEN nft_contract_address = '\x909899c5dbb5002610dd8543b6f638be56e3b17e' THEN 'Plasma Bears'
       WHEN nft_contract_address = '\x21850dcfe24874382b12d05c5b189f5a2acf0e5b' THEN 'The KILLAZ'
       WHEN nft_contract_address = '\x80f1ed6a1ac694317dc5719db099a440627d1ea7' THEN 'IKB cachet dee Garantie'
       WHEN nft_contract_address = '\x059edd72cd353df5106d2b9cc5ab83a52287ac3a' THEN 'Art Blocks (Old)'
       WHEN nft_contract_address = '\xd754937672300ae6708a51229112de4017810934' THEN 'Deafbeef'
       WHEN nft_contract_address = '\xc170384371494b2a8f6ba20f4d085c4dde763d96' THEN 'BEEPLE: EVERYDAYS - THE 2020 COLLECTION'
       WHEN nft_contract_address = '\xe573b99ffd4df2a82ea0986870c33af4cb8a5589' THEN 'Chain/Saw'
       WHEN nft_contract_address = '\xba30e5f9bb24caa003e9f2f0497ad287fdf95623' THEN 'Bored ape Kennel Club'
       WHEN nft_contract_address = '\x3c62e8de798721963b439868d3ce22a5252a7e03' THEN 'F1 Delta Time'
       WHEN nft_contract_address = '\x9a534628b4062e123ce7ee2222ec20b86e16ca8f' THEN 'MekaVerse'
       WHEN nft_contract_address = '\x12d2d1bed91c24f878f37e66bd829ce7197e4d14' THEN 'GalacticApes'
       WHEN nft_contract_address = '\xdd69da9a83cedc730bc4d3c56e96d29acc05ecde' THEN 'TIMEPieces Build a Better Future: Genesis Drop'
       WHEN nft_contract_address = '\x3a5051566b2241285be871f650c445a88a970edd' THEN 'The Humanoids'
       WHEN nft_contract_address = '\xc8bcbe0e8ae36d8f9238cd320ef6de88784b1734' THEN 'Winter Bears'
       WHEN nft_contract_address = '\x6dc6001535e15b9def7b0f6a20a2111dfa9454e2' THEN 'MetaHero Universe: Generative Identities'
       WHEN nft_contract_address = '\x8a1bbef259b00ced668a8c69e50d92619c672176' THEN 'Habbo Avatars'
       WHEN nft_contract_address = '\x90ca8a3eb2574f937f514749ce619fdcca187d45' THEN 'Gambling Apes Official'
       WHEN nft_contract_address = '\x1d20a51f088492a0f1c57f047a9e30c9ab5c07ea' THEN 'loomlocknft (Wassies)'
       WHEN nft_contract_address = '\xd31fc221d2b0e0321c43e9f6824b26ebfff01d7d' THEN 'Brotchain'
       WHEN nft_contract_address = '\xa7206d878c5c3871826dfdb42191c49b1d11f466' THEN 'LOSTPOETS: PAGE'
       WHEN nft_contract_address = '\x8cd8155e1af6ad31dd9eec2ced37e04145acfcb3' THEN 'Cupcats Official'
       WHEN nft_contract_address = '\xaadba140ae5e4c8a9ef0cc86ea3124b446e3e46a' THEN 'MutantCats'
       WHEN nft_contract_address = '\x4b3406a41399c7fd2ba65cbc93697ad9e7ea61e5' THEN 'LOSTPOETS: POETS'
       WHEN nft_contract_address = '\x236672ed575e1e479b8e101aeeb920f32361f6f9' THEN 'Frontier Game'
       WHEN nft_contract_address = '\x86357a19e5537a8fba9a004e555713bc943a66c0' THEN 'Neo Tokio Identities'
       WHEN nft_contract_address = '\x9c57d0278199c931cf149cc769f37bb7847091e7' THEN 'Sipheria Surge'
       WHEN nft_contract_address = '\x9261b6239a85348e066867c366d3942648e24511' THEN 'Monkey Bet DAO'
       WHEN nft_contract_address = '\xfcb1315c4273954f74cb16d5b663dbf479eec62e' THEN 'Capsule House'
       WHEN nft_contract_address = '\x454cbc099079dc38b145e37e982e524af3279c44' THEN 'The Yakuza Cats Society'
       WHEN nft_contract_address = '\x9d418c2cae665d877f909a725402ebd3a0742844' THEN 'Fang Gang'
       WHEN nft_contract_address = '\x1897d69cc0088d89c1e94889fbd2efffcefed778' THEN 'Gutter Spiecies Mint Pass'
       WHEN nft_contract_address = '\xa406489360a47af2c74fc1004316a64e469646a5' THEN 'The Official Surreals'
       WHEN nft_contract_address = '\x6317c4cab501655d7b85128a5868e98a094c0082' THEN 'MonsterBuds'
       WHEN nft_contract_address = '\xce50f3ca1f1dbd6fa042666bc0e369565dda457d' THEN 'TheHeartProject'
       WHEN nft_contract_address = '\x364c828ee171616a39897688a831c2499ad972ec' THEN 'Sappy Seals'
       WHEN nft_contract_address = '\x2d3f39663d43c0862589a8a24bf05ccd44b0ac4d' THEN 'StackedToadz'
       WHEN nft_contract_address = '\x0bb3e1c80c0ffde985fb0ec6392aa18a1d2de40e' THEN 'Fatales'
       WHEN nft_contract_address = '\x74ecb5f64363bd663abd3ef08df75dd22d853bfc' THEN 'Gauntlets'
       WHEN nft_contract_address = '\xc6735852e181a55f736e9db62831dc63ef8c449a' THEN 'Rogue Society Bots'
       WHEN nft_contract_address = '\x8707276df042e89669d69a177d3da7dc78bd8723' THEN 'Dope Wars'
       WHEN nft_contract_address = '\xccee4d557588e982ecf3a2391d718c76589d8af9' THEN 'CryptoZoo.co'
       WHEN nft_contract_address = '\x1981cc36b59cffdd24b01cc5d698daa75e367e04' THEN 'Crypto.Chicks'
       WHEN nft_contract_address = '\xaa6612f03443517ced2bdcf27958c22353ceeab9' THEN 'Bamboozlers'
       WHEN nft_contract_address = '\x1710d860034b50177d793e16945b6a25c7d92476' THEN 'ZombieToadz'
       WHEN nft_contract_address = '\xe885d519025348e30174a218be3e3e4754222860' THEN 'Woodies Mint Passport'
       WHEN nft_contract_address = '\x08f0b2a4351514e63e9e03a661adfe58d463cfbc' THEN 'The Project URS'
       WHEN nft_contract_address = '\x15a2d6c2b4b9903c27f50cb8b32160ab17f186e2' THEN 'GOOP TROOP'
       WHEN nft_contract_address = '\x960b7a6bcd451c9968473f7bbfd9be826efd549a' THEN 'OnChainMonkey'
       WHEN nft_contract_address = '\xdd467a6c8ae2b39825a452e06b4fa82f73d4253d' THEN 'MarsCatsVoyage'
       WHEN nft_contract_address = '\x7cba74d0b16c8e18a9e48d3b7404d7739bb24f23' THEN 'FoxFam'
       WHEN nft_contract_address = '\xb5c747561a185a146f83cfff25bdfd2455b31ff4' THEN 'Boss Beauties'
       WHEN nft_contract_address = '\x986aea67c7d6a15036e18678065eb663fc5be883' THEN 'Nifty League DEGENs'
       WHEN nft_contract_address = '\xbd4455da5929d5639ee098abfaa3241e9ae111af' THEN 'NFT Worlds (nftworlds.com)'
       WHEN nft_contract_address = '\x36d02dcd463dfd71e4a07d8aa946742da94e8d3a' THEN 'SympathyForTheDevils'
       WHEN nft_contract_address = '\xf3ae416615a4b7c0920ca32c2dfebf73d9d61514' THEN 'Chiptos'
       WHEN nft_contract_address = '\x0b35406f0215422ae1fd33560f11e92799150ad6' THEN 'Wicked Monsters'
       WHEN nft_contract_address = '\xce82d65314502ce39472a2442d4a2cbc4cb9f293' THEN 'Animal Society'
       WHEN nft_contract_address = '\x1a2f71468f656e97c2f86541e57189f59951efe7' THEN 'CryptoMories'
       WHEN nft_contract_address = '\xa64c5ec80784675bf289a4722a2eca180212f9db' THEN 'Wicked Hounds'
       WHEN nft_contract_address = '\x4621f7789179808114c5685fd5e2847a0f7b2246' THEN 'Penguin Fight Club'
       WHEN nft_contract_address = '\xfaff15c6cdaca61a4f87d329689293e07c98f578' THEN 'Zapper NFT'
       WHEN nft_contract_address = '\x1c645e4075f225ec82ed7fc4d81ff935c6fa00ae' THEN 'LevX DAO Collection'
       WHEN nft_contract_address = '\xa3b7cee4e082183e69a03fc03476f28b12c545a7' THEN 'Chill Frogs'
       WHEN nft_contract_address = '\x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b' THEN 'Clone X - X TAKASHI MURAKAMI'
       WHEN nft_contract_address = '\x8a90cab2b38dba80c64b7734e58ee1db38b8992e' THEN 'Doodles'
       WHEN nft_contract_address = '\x348fc118bcc65a92dc033a951af153d14d945312' THEN 'RTFKT - CloneX Mintvial'
       WHEN nft_contract_address = '\x7e6bc952d4b4bd814853301bee48e99891424de0' THEN 'Jungle Freaks'
       WHEN nft_contract_address = '\x0c2e57efddba8c768147d1fdf9176a0a6ebd5d83' THEN 'KaijuKingz'
       WHEN nft_contract_address = '\xeb834ae72b30866af20a6ce5440fa598bfad3a42' THEN 'Wolf Game'
       WHEN nft_contract_address = '\x28472a58a490c5e09a238847f66a68a47cc76f0f' THEN 'adidas Originals: Into the Metaverse'
       WHEN nft_contract_address = '\x999e88075692bcee3dbc07e7e64cd32f39a1d3ab' THEN 'Wizards & Dragons Game'
       WHEN nft_contract_address = '\x11450058d796b02eb53e65374be59cff65d3fe7f' THEN 'SHIBOSHIS'
       WHEN nft_contract_address = '\xf1268733c6fb05ef6be9cf23d24436dcd6e0b35e' THEN 'Desperate ApeWives'
       WHEN nft_contract_address = '\x9bf252f97891b907f002f2887eff9246e3054080' THEN 'Ape Kids Club'
       WHEN nft_contract_address = '\x97597002980134bea46250aa0510c9b90d87a587' THEN 'Chain Runners'
       WHEN nft_contract_address = '\xab0b0dd7e4eab0f9e31a539074a03f1c1be80879' THEN 'Neo Tokyo Part 2: Valut Cards'
       WHEN nft_contract_address = '\x698fbaaca64944376e2cdc4cad86eaa91362cf54' THEN 'Neo Tokyo: Outer Identities'
       WHEN nft_contract_address = '\xf7143ba42d40eaeb49b88dac0067e54af042e963' THEN 'Metasaurs'
       WHEN nft_contract_address = '\x469823c7b84264d1bafbcd6010e9cdf1cac305a3' THEN 'Crypto Bull Society'
       WHEN nft_contract_address = '\xf75140376d246d8b1e5b8a48e3f00772468b3c0c' THEN 'uwucrew'
       WHEN nft_contract_address = '\xed5af388653567af2f388e6224dc7c4b3241c544' THEN 'Azuki'
       WHEN nft_contract_address = '\xfb3765e0e7ac73e736566af913fa58c3cfd686b7' THEN 'Audioglyphs'
       WHEN nft_contract_address = '\x67d9417c9c3c250f61a83c7e8658dac487b56b09' THEN 'PhantaBear'
       WHEN nft_contract_address = '\x6632a9d63e142f17a668064d41a21193b49b41a0' THEN 'Prime Ape Planet'
       WHEN nft_contract_address = '\x4db1f25d3d98600140dfc18deb7515be5bd293af' THEN 'HAPE PRIME'
       WHEN nft_contract_address = '\x7f36182dee28c45de6072a34d29855bae76dbe2f' THEN 'Wolf Game'
       WHEN nft_contract_address = '\xfe8c6d19365453d26af321d0e8c910428c23873f' THEN 'Cold Blooded Creepz'
       WHEN nft_contract_address = '\xd78b76fcc33cd416da9d3d42f72649a23d7ac647' THEN 'Lil` Heroes by Edgar Plans'
       WHEN nft_contract_address = '\x6be69b2a9b153737887cfcdca7781ed1511c7e36' THEN 'Killer GF'
       WHEN nft_contract_address = '\xc8adfb4d437357d0a656d4e62fd9a6d22e401aa0' THEN 'CryptoBatz by Ozzy Osborne'
       WHEN nft_contract_address = '\x6fd053bff10512d743fa36c859e49351a4920df6' THEN 'C-01 Official Collection'
       WHEN nft_contract_address = '\x75e95ba5997eb235f40ecf8347cdb11f18ff640b' THEN 'Psychedelics Anonymous Genesis'
       WHEN nft_contract_address = '\x0e9d6552b85be180d941f1ca73ae3e318d2d4f1f' THEN 'Metaverse City Block'
       WHEN nft_contract_address = '\xe106c63e655df0e300b78336af587f300cff9e76' THEN 'OxyaOriginProject'
       WHEN nft_contract_address = '\xa5c0bd78d1667c13bfb403e2a3336871396713c5' THEN 'Coolman`s Universe'
       WHEN nft_contract_address = '\x0b4b2ba334f476c8f41bfe52a428d6891755554d' THEN 'JRNY CLUB OFFICIAL'
       WHEN nft_contract_address = '\x09233d553058c2f42ba751c87816a8e9fae7ef10' THEN 'My Pet Hooligan'
       WHEN nft_contract_address = '\xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51' THEN 'Worldwide Webb Land'
       WHEN nft_contract_address = '\xf1083e064f92db0561fd540f982cbf73a4e2f8f6' THEN 'Creepz Shapeshifters'
       WHEN nft_contract_address = '\xd532b88607b1877fe20c181cba2550e3bbd6b31c' THEN 'Zipcy`s SuperNormal'
       WHEN nft_contract_address = '\x94638cbf3c54c1f956a5f05cbc0f9afb6822020d' THEN 'inBetweeners'
       WHEN nft_contract_address = '\x9372b371196751dd2f603729ae8d8014bbeb07f6' THEN 'Bored Bunny'
       WHEN nft_contract_address = '\x4e1f41613c9084fdb9e34e11fae9412427480e56' THEN 'Terraforms'
       ELSE CONCAT('0', SUBSTRING(nft_contract_address::text, 2))
END) AS name,
SUM(original_amount) AS eth_volume,
SUM(usd_amount) AS usd_volume,
nft_contract_address AS contract
FROM nft.trades
WHERE original_currency in ('ETH','WETH')
AND buyer != seller
AND trade_type = 'Single Item Trade'
AND nft_contract_address NOT IN ('\x495f947276749ce646f68ac8c248420045cb7b5e', -- OpenSea Shared Storefront
                                '\xc99f70bfd82fb7c8f8191fdfbfb735606b15e5c5') -- WyvernAtomicizer
AND tx_hash != '\x92488a00dfa0746c300c66a716e6cc11ba9c0f9d40d8c58e792cc7fcebf432d0'
AND tx_hash NOT IN (SELECT txs FROM os_remove)
GROUP BY  nft_contract_address, nft_project_name
ORDER BY SUM(original_amount) DESC
)

SELECT ROW_NUMBER() OVER (ORDER BY eth_volume DESC) AS "Rank",
n.name AS "Project Name",
n.eth_volume AS "Total Volume (ETH)",
n.usd_volume AS "Total Volume ($)",
CASE WHEN w.weekly_eth_volume IS NULL THEN 0 ELSE w.weekly_eth_volume END AS "1W Volume (ETH)",
CASE WHEN d.daily_eth_volume IS NULL THEN 0 ELSE d.daily_eth_volume END AS "1D Volume (ETH)",
s.supply AS "Supply",
s.owners AS "Owners",
p.floor AS "Floor Price",
--average AS "Today's Average Sale",
CASE WHEN p.median IS NULL THEN 0 ELSE p.median END AS "Today's Median Sale",
CONCAT('<a href="https://etherscan.io/address/0', substring(n.contract::text from 2),'" target="_blank" >', CONCAT('0', substring(n.contract::text from 2)), '</a>') as  "NFT Contract"
--owners/supply AS "Owners/Supply %"
FROM nfts n
LEFT JOIN supply_and_holders s ON n.contract = s.contract
LEFT JOIN prices p ON n.contract = p.nft_contract_address
LEFT JOIN daily_volume d on n.contract = d.contract
LEFT JOIN weekly_volume w on n.contract = w.contract
WHERE n.eth_volume > 100
AND n.usd_volume > 10000
ORDER BY eth_volume DESC


