import { CoinGeckoProResponse } from "@/src/app/types/metrics"

const COINGECKO_PRO_API = "https://pro-api.coingecko.com/api/v3"
const COINGECKO_API_KEY = "CG-VJWALA4BxJPyofKW2fJPmuy8"

export async function calculateMonthlyRSI(): Promise<number | null> {
  try {
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 days ago

    const response = await fetch(
      `${COINGECKO_PRO_API}/coins/bitcoin/market_chart/range?vs_currency=usd&from=${Math.floor(startDate.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}`,
      {
        headers: {
          'x-cg-pro-api-key': COINGECKO_API_KEY
        }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: CoinGeckoProResponse = await response.json()
    const dailyPrices = aggregateDailyPrices(data.prices!)

    return calculateRSI(dailyPrices)
  } catch (error) {
    console.error("Failed to fetch BTC price data or calculate RSI:", error)
    return null
  }
}

function aggregateDailyPrices(prices: [number, number][]): number[] {
  const dailyPrices: number[] = []
  let currentDay = new Date(prices[0][0]).setHours(0, 0, 0, 0)
  let currentDayPrices: number[] = []

  for (const [timestamp, price] of prices) {
    const priceDay = new Date(timestamp).setHours(0, 0, 0, 0)
    if (priceDay !== currentDay) {
      if (currentDayPrices.length > 0) {
        dailyPrices.push(currentDayPrices[currentDayPrices.length - 1])
      }
      currentDay = priceDay
      currentDayPrices = []
    }
    currentDayPrices.push(price)
  }

  if (currentDayPrices.length > 0) {
    dailyPrices.push(currentDayPrices[currentDayPrices.length - 1])
  }

  return dailyPrices
}

function calculateRSI(prices: number[], period: number = 14): number {
  if (prices.length < period + 1) {
    throw new Error("Not enough price data to calculate RSI")
  }

  let gains = 0
  let losses = 0

  for (let i = 1; i <= period; i++) {
    const difference = prices[i] - prices[i - 1]
    if (difference >= 0) {
      gains += difference
    } else {
      losses -= difference
    }
  }

  let avgGain = gains / period
  let avgLoss = losses / period

  for (let i = period + 1; i < prices.length; i++) {
    const difference = prices[i] - prices[i - 1]
    if (difference >= 0) {
      avgGain = (avgGain * (period - 1) + difference) / period
      avgLoss = (avgLoss * (period - 1)) / period
    } else {
      avgGain = (avgGain * (period - 1)) / period
      avgLoss = (avgLoss * (period - 1) - difference) / period
    }
  }

  const rs = avgGain / avgLoss
  return 100 - (100 / (1 + rs))
}

