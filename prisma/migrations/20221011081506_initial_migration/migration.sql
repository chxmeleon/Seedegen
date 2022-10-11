-- CreateTable
CREATE TABLE "ProfitLeaderboard30Days" (
    "id" TEXT NOT NULL,
    "ens" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "profit" TEXT NOT NULL,
    "revernced" TEXT NOT NULL,
    "spent" TEXT NOT NULL,
    "ROI" TEXT NOT NULL,

    CONSTRAINT "ProfitLeaderboard30Days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfitLeaderboard" (
    "id" TEXT NOT NULL,
    "ens" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "profit" TEXT NOT NULL,
    "revernced" TEXT NOT NULL,
    "spent" TEXT NOT NULL,
    "ROI" TEXT NOT NULL,

    CONSTRAINT "ProfitLeaderboard_pkey" PRIMARY KEY ("id")
);
