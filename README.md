# 🚀 Crypto Sensor
[![Netlify Status](https://api.netlify.com/api/v1/badges/83bfe17a-9fec-494b-8c90-288c58e6233f/deploy-status)](https://app.netlify.com/sites/cryptosensor/deploys)
[![License: MIT](https://img.shields.io/badge/License-Apache/2.0-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/react-18.3.1-blue.svg)](https://reactjs.org/)
[![React Version](https://img.shields.io/badge/next-15.0-121212.svg)](https://next.org/)
[![Coverage Status](https://coveralls.io/repos/github/username/repository/badge.svg?branch=main)](https://coveralls.io/github/username/repository?branch=main)

Alpha Preview website : https://cryptosensor.netlify.app

📊 A real-time cryptocurrency market indicators dashboard built with Next.js and TypeScript.

![image](https://github.com/user-attachments/assets/556a7788-c2ef-4ef2-b957-4d91cbd05f8e)

## ✨ Features

- 🔄 Real-time market metrics monitoring
- 🔌 Multiple data sources integration
- 🚦 Status indicators (success, warning, danger)
- 📱 Responsive design
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
git clone https://github.com/ilyomix/crypto-sensor.git
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

- React 18
- Next.js 15
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

- Apache-2.0 license

## 🙏 Credits

- CoinGecko API
- Google Trends API
- Crypto market indicators creators
