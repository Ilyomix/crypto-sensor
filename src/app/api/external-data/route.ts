import { NextResponse } from 'next/server'

// Finance category ID for US App Store is 6015
const APP_STORE_API = "https://itunes.apple.com/us/rss/topfreeapplications/genre=6015/limit=200/json"

// Cache configuration
const cache = new Map<string, { data: any, timestamp: number }>()
const CACHE_TTL = 30 * 1000 // 30 seconds cache

export async function GET() {
  try {
    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const appRankings = await fetchAppRankings().catch(error => {
      console.error("Error fetching app rankings:", error);
      return [];
    });

    if (appRankings.length === 0) {
      throw new Error("App rankings fetching failed");
    }

    const response = { appRankings };
    cacheData(response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch external data:", error);
    // Return cached data if available, even if expired
    const fallbackCache = getCachedData(true);
    if (fallbackCache) {
      console.log("Using fallback cached data");
      return NextResponse.json(fallbackCache);
    }
    return NextResponse.json(
      { error: "Failed to fetch external data", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

function getCachedData(ignoreTTL = false) {
  const cachedItem = cache.get('externalData');
  if (!cachedItem) return null;

  const now = Date.now();
  if (!ignoreTTL && now - cachedItem.timestamp > CACHE_TTL) {
    return null;
  }

  return cachedItem.data;
}

function cacheData(data: any) {
  cache.set('externalData', {
    data,
    timestamp: Date.now()
  });
}

async function fetchAppRankings() {
  const cryptoApps = [
    { 
      name: 'Coinbase',
      id: 'com.coinbase.Coinbase',
      searchTerms: ['Coinbase', 'Coinbase - Buy Bitcoin & Ether', 'Coinbase: Buy Bitcoin & Crypto'],
      threshold: '1st'
    },
    { 
      name: 'Binance',
      id: 'com.binance.dev',
      searchTerms: ['Binance', 'Binance: Buy Bitcoin & Crypto', 'Binance.US'],
      threshold: '<= 10th'
    },
    { 
      name: 'Crypto.com',
      id: 'com.crypto.exchange',
      searchTerms: ['Crypto.com', 'Crypto.com - Buy Bitcoin Now'],
      threshold: '<= 10th'
    },
    { 
      name: 'Kraken',
      id: 'com.kraken.trade',
      searchTerms: ['Kraken', 'Kraken: Buy Bitcoin & Crypto'],
      threshold: '<= 10th'
    }
  ];

  try {
    const response = await fetch(APP_STORE_API);
    if (!response.ok) {
      throw new Error(`Failed to fetch app rankings: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const entries = data?.feed?.entry || [];

    return cryptoApps.map(cryptoApp => {
      // Try to find app by bundle ID first
      let appInfo = entries.find((app: any) => 
        app.id?.attributes?.['im:bundleId'] === cryptoApp.id
      );

      // If not found by bundle ID, try to find by name
      if (!appInfo) {
        appInfo = entries.find((app: any) => 
          cryptoApp.searchTerms.some(term => 
            app['im:name']?.label?.toLowerCase().includes(term.toLowerCase())
          )
        );
      }

      const rank = appInfo ? entries.indexOf(appInfo) + 1 : '>200';
      
      return {
        name: `${cryptoApp.name} App Rank (US)`,
        rank: rank.toString(),
        threshold: cryptoApp.threshold
      };
    });
  } catch (error) {
    console.error("Error in fetchAppRankings:", error);
    throw error;
  }
}
