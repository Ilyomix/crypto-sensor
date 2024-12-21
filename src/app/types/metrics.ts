export interface Metric {
  name: string
  value: string
  threshold: string
  status: 'success' | 'warning' | 'danger'
  error?: string
}

export interface CoinGeckoProResponse {
  data: {
    active_cryptocurrencies: number
    upcoming_icos: number
    ongoing_icos: number
    ended_icos: number
    markets: number
    total_market_cap: { [key: string]: number }
    total_volume: { [key: string]: number }
    market_cap_percentage: {
      btc: number
      eth: number
      [key: string]: number
    }
    updated_at: number
  }
  prices?: [number, number][]
  market_data?: {
    current_price: {
      usd: number
    }
    market_cap: {
      usd: number
    }
  }
}

export interface FearGreedResponse {
  data: Array<{
    value: string
    value_classification: string
    timestamp: string
    time_until_update: string
  }>
}

export interface AppRankingResponse {
  name: string
  rank: string
  threshold: string
}

export interface MetricsResponse {
  metrics: Metric[]
  timestamp: number
}
