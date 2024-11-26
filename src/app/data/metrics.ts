export const marketMetrics: { name: string; value: string; info: string; status: string; threshold: string }[] = [
  { name: "CBBI", value: "N/A", info: "Crypto Bull/Bear Index - A composite index that combines multiple indicators to determine market sentiment and cycle position", status: "N/A", threshold: "> 90%" },
  { name: "Pi Cycle", value: "N/A", info: "A technical indicator that tracks the relationship between two moving averages to identify market tops", status: "N/A", threshold: ">= 95%" },
  { name: "MVRV Z-Score", value: "N/A", info: "Measures how far the current market value deviates from the 'fair value' of Bitcoin based on realized value", status: "N/A", threshold: ">= 98%" },
  { name: "RUPL/NUPL", value: "N/A", info: "Ratio of Realized to Net Unrealized Profit/Loss - Compares current profits to historical realized profits", status: "N/A", threshold: ">= 98%" },
  { name: "RHODL", value: "N/A", info: "Ratio of young to old coin ages, indicating potential market tops when long-term holders start selling", status: "N/A", threshold: "100%" },
  { name: "Puell Multiple", value: "N/A", info: "Evaluates mining profitability by comparing daily coin issuance value to its moving average", status: "N/A", threshold: "100%" },
  { name: "2Y MA", value: "N/A", info: "2-Year Moving Average - Long-term trend indicator showing average price over 2 years", status: "N/A", threshold: ">= 98%" },
  { name: "Trolololo Trend Line", value: "N/A", info: "A logarithmic support line tracking Bitcoin's long-term price trajectory", status: "N/A", threshold: ">= 90%" },
  { name: "Reserve Risk", value: "N/A", info: "Measures the confidence of long-term holders relative to the price of Bitcoin", status: "N/A", threshold: ">= 90%" },
  { name: "Woobull", value: "N/A", info: "A collection of charts and metrics created by Willy Woo to analyze Bitcoin market cycles", status: "N/A", threshold: ">= 90%" },
  { name: "NUPL", value: "N/A", info: "Net Unrealized Profit/Loss - Shows the total unrealized profit/loss of all Bitcoin holders", status: "N/A", threshold: ">= 70%" },
  { name: "Monthly RSI", value: "N/A", info: "Relative Strength Index calculated on monthly timeframe to identify overbought/oversold conditions", status: "N/A", threshold: ">= 70%" },
  { name: "BTC Dominance", value: "N/A", info: "Bitcoin's market capitalization as a percentage of total cryptocurrency market cap", status: "N/A", threshold: "<= 45%" },
  { name: "Fear & Greed (7-day average)", value: "N/A", info: "Measures market sentiment using multiple data sources averaged over 7 days", status: "N/A", threshold: ">= 90%" },
];

export const appRankings: { name: string; value: string; info: string; status: string; threshold: string }[] = [
  { name: "Coinbase App Rank (US)", value: "N/A", info: "App Store ranking of Coinbase in the United States - indicates retail interest in crypto", status: "N/A", threshold: "1st" },
  { name: "Binance App Rank (FR)", value: "N/A", info: "App Store ranking of Binance in France - shows European retail crypto adoption", status: "N/A", threshold: "<= 10th" },
  { name: "Binance App Rank (UK)", value: "N/A", info: "App Store ranking of Binance in the United Kingdom - indicates UK crypto market activity", status: "N/A", threshold: "<= 10th" },
  { name: "Phantom App Rank (US)", value: "N/A", info: "App Store ranking of Phantom wallet in the US - shows Solana ecosystem interest", status: "N/A", threshold: "<= 10th" },
];

export const googleTrends: { name: string; value: string; info: string; status: string; threshold: string }[] = [
  { name: 'Google trend "Crypto"', value: "N/A", info: "Search volume for 'crypto' term relative to its peak - indicates general crypto awareness", status: "N/A", threshold: ">= 80%" },
  { name: 'Google trend "Buy crypto"', value: "N/A", info: "Search volume for 'buy crypto' - shows direct retail purchase interest", status: "N/A", threshold: ">= 80%" },
  { name: 'Google trend "Bitcoin"', value: "N/A", info: "Search volume for 'Bitcoin' - indicates mainstream interest in Bitcoin", status: "N/A", threshold: ">= 60%" },
  { name: 'Google trend "Ethereum"', value: "N/A", info: "Search volume for 'Ethereum' - shows interest in the largest altcoin", status: "N/A", threshold: ">= 50%" },
  { name: 'Google trend "Solana"', value: "N/A", info: "Search volume for 'Solana' - indicates interest in emerging blockchain platforms", status: "N/A", threshold: ">= 80%" },
];

export const otherMetrics: { name: string; value: string; info: string; status: string; threshold: string }[] = [
  { name: "Number of JVC connected users", value: "N/A", info: "Number of active users on JVC platform - indicates retail trading activity", status: "N/A", threshold: "> 250" },
  { name: "Days since halving", value: "N/A", info: "Days elapsed since the last Bitcoin halving event - historically correlated with market cycles", status: "N/A", threshold: "> 338 (first top 2021)\n> 547 (second top 2021)\n> 526 (top 2017)" },
];