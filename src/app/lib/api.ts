import { Metric, CoinGeckoProResponse, AppRankingResponse, GoogleTrendResponse } from "@/src/app/types/metrics"
import { calculateMonthlyRSI } from "./rsi"

// API Constants
const APIS = {
  CBBI: "https://colintalkscrypto.com/cbbi/data/latest.json",
  COINGECKO_PRO: "https://pro-api.coingecko.com/api/v3",
  FEAR_GREED: "https://api.alternative.me/fng/?limit=7",
  FETCH_TIMEOUT: 30000
}

const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY
console.log(process.env)
// Metric Configurations
const METRIC_INFO = {
  CBBI: {
    info: "Crypto Bull/Bear Index - A composite index combining multiple indicators to determine market sentiment",
    threshold: "> 90%",
    thresholds: { danger: 90, warning: 70 }
  },
  "Pi Cycle": {
    info: "Technical indicator tracking the relationship between two moving averages to identify market tops",
    threshold: ">= 95%",
    thresholds: { danger: 95, warning: 90 }
  },
  MVRV: {
    info: "Market Value to Realized Value Z-Score - Shows how far the current price deviates from fair value",
    threshold: ">= 98%",
    thresholds: { danger: 98, warning: 90 }
  },
  RUPL: {
    info: "Ratio of Realized to Net Unrealized Profit/Loss - Compares current profits to historical realized profits",
    threshold: ">= 98%",
    thresholds: { danger: 98, warning: 90 }
  },
  RHODL: {
    info: "Ratio of young to old coin ages - Indicates potential market tops when long-term holders start selling",
    threshold: "100%",
    thresholds: { danger: 100, warning: 95 }
  },
  Puell: {
    info: "Evaluates mining profitability by comparing daily coin issuance value to its moving average",
    threshold: ">= 100%",
    thresholds: { danger: 100, warning: 60 }
  },
  "2YMA": {
    info: "2-Year Moving Average - Long-term trend indicator showing average price over 2 years",
    threshold: ">= 98%",
    thresholds: { danger: 98, warning: 90 }
  },
  Trolololo: {
    info: "Logarithmic support line tracking Bitcoin's long-term price trajectory",
    threshold: ">= 90%",
    thresholds: { danger: 90, warning: 80 }
  },
  "Reserve Risk": {
    info: "Measures the confidence of long-term holders relative to the price of Bitcoin",
    threshold: ">= 90%",
    thresholds: { danger: 90, warning: 80 }
  },
  Woobull: {
    info: "Collection of charts and metrics created by Willy Woo to analyze Bitcoin market cycles",
    threshold: ">= 90%",
    thresholds: { danger: 90, warning: 80 }
  },
  Confidence: {
    info: "Market confidence metric based on various indicators",
    threshold: "< 10%",
    thresholds: { danger: 10, warning: 30 }
  },
  "BTC Dominance": {
    info: "Bitcoin's market capitalization as a percentage of total cryptocurrency market cap",
    threshold: "<= 45%",
    thresholds: { danger: 45, warning: 50 }
  },
  "Fear & Greed": {
    info: "Market sentiment indicator combining multiple data sources over 7 days",
    threshold: ">= 90",
    thresholds: { danger: 90, warning: 75 }
  },
  "BTC RSI monthly": {
    info: "Monthly Relative Strength Index for Bitcoin - Shows overbought/oversold conditions",
    threshold: ">= 70%",
    thresholds: { danger: 70, warning: 50 }
  }
}

// Helper Functions
const formatValue = (value: number, isPercentage: boolean = true) => 
  `${value.toFixed(2)}${isPercentage ? '%' : ''}`

const getMetricConfig = (name: string) => 
  METRIC_INFO[name as keyof typeof METRIC_INFO] || {
    info: "Metric information not available",
    threshold: "N/A",
    thresholds: { danger: 100, warning: 80 }
  }

const determineStatus = (name: string, value: number): "success" | "warning" | "danger" | "unavailable" => {
  const config = getMetricConfig(name)
  if (!config) return "unavailable"
  
  const { thresholds } = config
  if (name === "Confidence" || name === "BTC Dominance") {
    return value <= thresholds.danger ? "danger" : 
           value <= thresholds.warning ? "warning" : "success"
  }
  
  return value >= thresholds.danger ? "danger" : 
         value >= thresholds.warning ? "warning" : "success"
}

const createMetric = (name: string, value: number | string, isPercentage: boolean = true): Metric => {
  const config = getMetricConfig(name)
  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  
  return {
    name,
    value: typeof value === 'string' ? value : formatValue(value, isPercentage),
    info: config.info,
    status: determineStatus(name, numericValue),
    threshold: config.threshold
  }
}

// Main fetch function
export async function fetchMetrics(): Promise<Metric[]> {
  try {
    const [cbbiData, globalData, fearGreedData, monthlyRSI, externalData] = await Promise.all([
      fetchWithTimeout(APIS.CBBI),
      fetchWithTimeout(`${APIS.COINGECKO_PRO}/global`, {
        headers: { 'x-cg-pro-api-key': COINGECKO_API_KEY }
      }),
      fetchWithTimeout(APIS.FEAR_GREED),
      calculateMonthlyRSI(),
      fetchExternalData()
    ])

    const metrics: Metric[] = []

    // Process CBBI metrics
    if (cbbiData) {
      Object.entries(METRIC_INFO)
        .filter(([key]) => cbbiData[key])
        .forEach(([key, config]) => {
          const timestamps = Object.keys(cbbiData[key]).sort((a, b) => parseInt(b) - parseInt(a))
          if (timestamps.length > 0) {
            const value = cbbiData[key][timestamps[0]] * 100
            metrics.push(createMetric(key, value))
          }
        })
    }

    // Process other metrics
    if (globalData) {
      const btcDominance = (globalData as CoinGeckoProResponse).data.market_cap_percentage.btc
      metrics.push(createMetric("BTC Dominance", btcDominance))
    }

    if (fearGreedData) {
      const fearGreedAverage = fearGreedData.data.reduce((acc, item) => acc + parseInt(item.value), 0) / fearGreedData.data.length
      metrics.push(createMetric("Fear & Greed (7-day average)", fearGreedAverage, false))
    }

    if (monthlyRSI !== null) {
      metrics.push(createMetric("BTC RSI monthly", monthlyRSI))
    }

    // Add external metrics
    metrics.push(...externalData.appRankings, ...externalData.googleTrends)

    // Add halving metric
    const lastHalvingDate = new Date('2024-04-18')
    const daysSinceHalving = Math.floor((new Date().getTime() - lastHalvingDate.getTime()) / (1000 * 3600 * 24))
    metrics.push({
      name: "Days since halving",
      value: daysSinceHalving.toString(),
      info: "Days elapsed since the last Bitcoin halving event - historically correlated with market cycles",
      status: daysSinceHalving > 547 ? "danger" : daysSinceHalving > 338 ? "warning" : "success",
      threshold: "338 (first top 2021)\n547 (second top 2021)\n526 (top 2017)"
    })

    return metrics
  } catch (error) {
    console.error("Failed to fetch metrics data:", error)
    throw error
  }
}

// Fetch helpers
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<any> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), APIS.FETCH_TIMEOUT)

  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(timeoutId)
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}, url: ${url}`)
    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    console.error(`Error fetching ${url}:`, error)
    throw error
  }
}

async function fetchExternalData(): Promise<{ appRankings: Metric[], googleTrends: Metric[] }> {
  const response = await fetch('/api/external-data')
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  
  const data = await response.json()
  if (!data?.appRankings || !data?.googleTrends) {
    throw new Error('Invalid data structure received from external API')
  }

  return {
    appRankings: data.appRankings.map((ranking: AppRankingResponse) => ({
      name: ranking.name,
      value: ranking.rank,
      info: `App store ranking of ${ranking.name.split(' ')[0]} - Indicates retail interest and adoption`,
      status: getAppRankingStatus(ranking.rank, ranking.threshold),
      threshold: ranking.threshold
    })),
    googleTrends: data.googleTrends.map((trend: GoogleTrendResponse) => ({
      name: trend.name,
      value: `${trend.value}`,
      info: `Search interest for ${trend.name.replace('Google trend "', '').replace('"', '')} - Shows public awareness and interest`,
      status: determineStatus("Google Trend", trend.value),
      threshold: `>= ${trend.threshold}`
    }))
  }
}

function getAppRankingStatus(value: string, threshold: string): "success" | "warning" | "danger" {
  if (value === '>200') return "success"
  const numericValue = parseInt(value)
  const numericThreshold = parseInt(threshold)
  
  return numericValue <= numericThreshold ? "danger" :
         numericValue <= numericThreshold * 2 ? "warning" : "success"
}