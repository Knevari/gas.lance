# GasLance - Gas Price Sniper for Smart Contract Deployments

Deploy your smart contracts when gas prices drop. GasLance monitors network gas prices 24/7 and broadcasts your pre-signed transactions automatically.

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- An Ethereum RPC provider (Alchemy, Infura, or Ankr)
- Stripe account for payments

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repo-url>
cd gaslance-api

# Start PostgreSQL database
docker compose -f docker-compose.dev.yml up -d

# Setup backend
cd backend
cp .env.example .env
# Edit .env with your API keys
npm install
npx prisma migrate dev
npm run start:dev

# Setup frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 2. Environment Variables

**Backend (.env)**
```
DATABASE_URL=postgresql://gaslance:gaslance_dev_password@localhost:5432/gaslance
PORT=3001
FRONTEND_URL=http://localhost:3000
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### 3. Stripe Webhook Setup (Development)

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3001/payment/webhook

# Copy the webhook secret (whsec_xxx) to your .env
```

## 🐳 Docker Deployment (Production)

### Full Stack Deployment

```bash
# Set environment variables
export MAINNET_RPC_URL=your_url
export SEPOLIA_RPC_URL=your_url
export STRIPE_SECRET_KEY=sk_live_xxx
export STRIPE_WEBHOOK_SECRET=whsec_xxx

# Build and run all services
docker compose up -d --build

# Run migrations (first time only)
docker compose exec backend npx prisma migrate deploy
```

### Services
| Service | Port | Description |
|---------|------|-------------|
| frontend | 3000 | Next.js web app |
| backend | 3001 | NestJS API |
| postgres | 5432 | PostgreSQL database |

## 📁 Project Structure

```
gaslance-api/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── sniper/          # Order management
│   │   ├── watcher/         # Gas monitoring & broadcasting
│   │   ├── payment/         # Stripe integration
│   │   └── prisma/          # Database service
│   └── prisma/              # Schema & migrations
├── frontend/                # Next.js app
│   └── src/
│       ├── app/             # Pages (Next.js App Router)
│       └── components/      # React components
├── docker-compose.yml       # Production deployment
└── docker-compose.dev.yml   # Development (DB only)
```

## 🔧 API Endpoints

### Sniper (Orders)
- `POST /sniper` - Create new deployment order
- `GET /sniper/user/:userId` - Get user's orders
- `GET /sniper/credits/:userId` - Get user's credit balance

### Payments
- `GET /payment/packages` - List credit packages
- `POST /payment/checkout` - Create Stripe checkout session
- `POST /payment/webhook` - Stripe webhook handler

## 💰 Credit System

| Package | Credits | Price | Discount |
|---------|---------|-------|----------|
| Starter | 5 | $5 | — |
| Pro | 15 | $12 | 20% |
| Power | 50 | $35 | 30% |

New users get **1 free credit** to try the service.

## 🔒 Security Notes

- Transactions are pre-signed by users - we never hold private keys
- All wallet addresses are normalized to lowercase
- Stripe webhooks use signature verification
- CORS is configured for frontend origin only

## 📝 License

MIT
