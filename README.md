# SocialFi Connect - Base MiniApp

A comprehensive SocialFi platform built on Base that enables creators to monetize content and build engaged communities through direct subscriptions, pay-per-view content, and tokenized rewards.

## Features

### 🎯 Core Features
- **Direct Fan Subscriptions**: Tiered subscription system with exclusive content access
- **Pay-per-View Content**: Individual content monetization with one-time purchases
- **Engagement Rewards System**: Token rewards for likes, comments, and shares
- **Creator-Audience Collaboration**: Interactive sessions and community building tools

### 🛠 Technical Stack
- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: OnchainKit + MiniKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

### 🎨 Design System
- **Colors**: Blue to purple gradient theme with accent orange
- **Components**: Glass morphism cards with smooth animations
- **Layout**: Mobile-first responsive design
- **Typography**: Clean, modern font hierarchy

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Base wallet (for testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd socialfi-connect
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Add your OnchainKit API key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main homepage
│   ├── providers.tsx      # MiniKit provider setup
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── AppShell.tsx       # Main app layout
│   ├── CreatorCard.tsx    # Creator profile cards
│   ├── ContentCard.tsx    # Content display cards
│   ├── SubscriptionTier.tsx # Subscription plan cards
│   └── ...
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript interfaces
│   └── constants.ts       # Mock data and constants
└── public/               # Static assets
```

## Key Components

### AppShell
Main application layout with header, navigation, and wallet integration.

### CreatorCard
Displays creator profiles with follower counts, earnings, and subscription options.

### SubscriptionTier
Shows subscription plans with pricing, perks, and popular tier highlighting.

### ContentCard
Handles both free and premium content display with paywall functionality.

### EngagementButton
Interactive buttons for likes, comments, and shares with reward tracking.

## Base Integration

### Wallet Connection
- Uses OnchainKit's `ConnectWallet` component
- Integrates with Base network via MiniKit provider
- Supports wallet-based authentication

### Transactions
- Subscription payments via Base transactions
- Pay-per-view content purchases
- Reward token distribution
- Gas-optimized micro-transactions

### Social Features
- Farcaster frame integration
- Social sharing and engagement
- Community building tools

## Development

### Adding New Features
1. Define types in `lib/types.ts`
2. Create components in `components/`
3. Add mock data to `lib/constants.ts`
4. Implement in main pages

### Styling Guidelines
- Use Tailwind CSS classes
- Follow the design system tokens
- Implement glass morphism effects
- Ensure mobile-first responsive design

### Testing
```bash
npm run build    # Test production build
npm run lint     # Check code quality
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Environment Variables
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions and support:
- Create an issue on GitHub
- Check the Base documentation
- Review OnchainKit guides

---

Built with ❤️ on Base
