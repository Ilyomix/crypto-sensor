# 🚀 Crypto Sensor

📊 A real-time cryptocurrency market indicators dashboard built with Next.js and TypeScript.

![image](https://github.com/user-attachments/assets/556a7788-c2ef-4ef2-b957-4d91cbd05f8e)

## ✨ Features

- 🔄 Real-time market metrics monitoring
- 🔌 Multiple data sources integration
- 🚦 Status indicators (success, warning, danger)
- 📱 Responsive design with dark mode
- 🔄 Auto-refresh functionality

## 📈 Metrics

- 📊 Market indicators (CBBI, Pi Cycle, MVRV Z-Score)
- 📱 App store rankings
- 🔍 Google Trends data
- 🧮 BTC Dominance and Fear & Greed Index

## 🛠️ Setup

### Prerequisites
- Node.js (v18+)
- npm (v8+)

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/crypto-sensor.git
cd crypto-sensor

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Add your API keys to .env.local
```

### Development
```bash
npm run dev
# Open http://localhost:3000
```

### Production
```bash
npm run build
npm run start
```

## 📁 Structure

```
/app
  /components     # React components
  /lib           # Utilities and API handlers
  /types         # TypeScript types
  /data          # Configurations
```

## 🛠️ Tech Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- SWR
- Framer Motion
- Lucide React

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Submit pull request

## 📄 License

MIT License

## 🙏 Credits

- CoinGecko API
- Google Trends API
- Crypto market indicators creators
