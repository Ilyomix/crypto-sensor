# 🚀 Crypto Sensor

📊 A real-time dashboard that displays various cryptocurrency market indicators and metrics, built with Next.js and TypeScript.

## ✨ Features

- 🔄 Real-time market metrics monitoring
- 🔌 Multiple data sources integration (CoinGecko, Google Trends)
- 📂 Interactive expandable sections
- 🚦 Status indicators (success, warning, danger)
- 📱 Responsive design with dark mode
- 🛠️ Error handling and loading states
- 🔄 Auto-refresh functionality

## 📈 Key Metrics Tracked

- 📊 Market indicators (CBBI, Pi Cycle, MVRV Z-Score, etc.)
- 📱 App store rankings for major crypto applications
- 🔍 Google Trends data for crypto-related searches
- 🧮 Other important metrics (BTC Dominance, Fear & Greed Index)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v8 or higher)

## 🚀 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/crypto-sensor.git
   cd crypto-sensor
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a \`.env.local\` file in the root directory and add your API keys:
   \`\`\`
   NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key_here
   \`\`\`

## 💻 Development

To run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🏗️ Building for Production

To create a production build:

\`\`\`bash
npm run build
\`\`\`

For a static export:

\`\`\`bash
npm run export
\`\`\`

## 📁 Project Structure

- \`/app\` - Next.js 13+ app directory
  - \`/components\` - React components
  - \`/lib\` - Utility functions and API handlers
  - \`/types\` - TypeScript type definitions
  - \`/data\` - Static data and configurations

## 🛠️ Technologies Used

- ⚛️ Next.js 13+
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🔄 SWR for data fetching
- 🎭 Framer Motion for animations
- 🔣 Lucide React for icons

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- 🪙 CoinGecko API for cryptocurrency data
- 🔍 Google Trends API for search trends data
- 📊 Various crypto market indicators and their creators

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

