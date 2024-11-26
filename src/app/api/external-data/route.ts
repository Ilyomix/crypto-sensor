import { NextResponse } from 'next/server'
import { getTrendScore } from '@/src/app/lib/googleTrendsService'

const APP_STORE_API = "https://itunes.apple.com/us/rss/topfreeapplications/limit=200/json"

export async function GET() {
  try {
    const [appRankings, googleTrendsData] = await Promise.all([
      fetchAppRankings().catch(error => {
        console.error("Error fetching app rankings:", error)
        return []
      }),
      fetchGoogleTrends().catch(error => {
        console.error("Error fetching Google trends:", error)
        return []
      })
    ])

    if (appRankings.length === 0 && googleTrendsData.length === 0) {
      throw new Error("Both app rankings and Google trends fetching failed")
    }

    return NextResponse.json({ appRankings, googleTrends: googleTrendsData })
  } catch (error) {
    console.error("Failed to fetch external data:", error)
    return NextResponse.json({ error: "Failed to fetch external data", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}

async function fetchAppRankings() {
  const response = await fetch(APP_STORE_API)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  const apps = data.feed.entry

  const cryptoApps = [
    { name: 'Coinbase', id: 'com.coinbase.Coinbase' },
    { name: 'Binance', id: 'com.binance.dev' },
    { name: 'Phantom', id: 'app.phantom' }
  ]

  return cryptoApps.map(cryptoApp => {
    const appInfo = apps.find((app: any) => app.id.attributes['im:bundleId'] === cryptoApp.id)
    const rank = appInfo ? apps.indexOf(appInfo) + 1 : '>200'
    return {
      name: `${cryptoApp.name} App Rank (US)`,
      rank: rank.toString(),
      threshold: cryptoApp.name === 'Coinbase' ? '1st' : '<= 10th'
    }
  })
}

async function fetchGoogleTrends() {
  const keywords = ['bitcoin', 'crypto', 'buy crypto', 'ethereum', 'solana', 'xrp', 'dogecoin', 'nft', 'metaverse', 'web3']
  
  const results = await Promise.all(keywords.map(async (keyword) => {
    try {
      const { score } = await getTrendScore(keyword)
      return {
        name: `Google trend "${keyword}"`,
        value: score,
        threshold: keyword === 'ethereum' ? 50 : 80
      }
    } catch (error) {
      console.error(`Error fetching Google trend for "${keyword}":`, error)
      return {
        name: `Google trend "${keyword}"`,
        value: 0,
        threshold: keyword === 'ethereum' ? 50 : 80,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }))

  return results
}

