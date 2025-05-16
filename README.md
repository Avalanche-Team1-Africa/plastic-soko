# ♻️ PlasticSoko – Blockchain-Powered Waste Reporting DApp

PlasticSoko is a decentralized application (DApp) that empowers communities to report plastic waste across Nairobi in real-time. Built on the Avalanche Fuji testnet, this platform incentivizes users through a transparent, secure reward system while promoting sustainable waste management practices.

## 🌍 Project Overview

Plastic pollution in urban Kenya remains a significant challenge. PlasticSoko leverages blockchain to:
- Enable geo-tagged waste reporting.
- Reward users with points for each valid submission.
- Visualize waste locations on an interactive map.
- Store waste data on-chain to prevent tampering and ensure transparency.

## 🚀 Features

- ✅ Connect Web3 wallet (MetaMask/Core)
- 📝 Submit waste reports with location and description
- 🎁 Earn reward points for each report
- 🗺️ View all reports on a live map
- 👨‍💼 Admin-only view for moderation and review

## 🧱 Built With

- **Frontend**: React, Tailwind CSS, Leaflet.js
- **Blockchain**: Solidity, Hardhat, Avalanche Fuji Testnet
- **Web3 Integration**: Ethers.js
- **Geocoding**: CAGE Geocoder API

## 🖥️ Installation

### Prerequisites

- Node.js and npm
- MetaMask browser extension
- CAGE API Key
- Avalanche Fuji Testnet Wallet

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/plasticsoko.git
cd plasticsoko

# Install dependencies
npm install

# Create environment file
touch .env
