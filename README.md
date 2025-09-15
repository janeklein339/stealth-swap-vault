# Stealth Swap Vault

A privacy-first cross-chain cryptocurrency swap platform that enables confidential transactions with encrypted amounts, preventing MEV exploitation across all major blockchain networks.

## Features

- **Privacy-First Design**: Execute cross-chain swaps with encrypted amounts
- **MEV Protection**: Prevent front-running and sandwich attacks
- **Multi-Chain Support**: Seamless swaps across major blockchain networks
- **FHE Integration**: Fully Homomorphic Encryption for transaction privacy
- **Real Wallet Integration**: Connect with popular wallet providers
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum, Polygon, Arbitrum, Optimism
- **Privacy**: FHE (Fully Homomorphic Encryption)
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/janeklein339/stealth-swap-vault.git
cd stealth-swap-vault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Smart Contracts

The project includes FHE-enabled smart contracts for:
- Cross-chain swap execution
- Encrypted amount handling
- Privacy-preserving transaction validation
- MEV protection mechanisms

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

This project implements advanced privacy features using FHE. Please review the security considerations in the documentation before using in production.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Additional blockchain network support
- [ ] Advanced privacy features
- [ ] Mobile application
- [ ] Governance token integration
- [ ] Cross-chain bridge optimization