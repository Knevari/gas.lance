<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white" alt="Ethereum" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<h1 align="center">⚡ GasLance</h1>
<p align="center">
  <strong>Gas Price Sniper for Smart Contract Deployments</strong>
</p>
<p align="center">
  Deploy your smart contracts when gas prices drop. GasLance monitors Ethereum gas prices 24/7 and broadcasts your pre-signed transactions automatically.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-documentation">API Docs</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Non-custodial** | We never hold your private keys. You sign transactions locally. |
| ⛽ **Gas Sniping** | Set a target gas price and we'll broadcast when conditions match |
| 📊 **EIP-1559 Compatible** | Full support for modern Ethereum transactions |
| 💳 **Credit System** | Pay-per-deployment with Stripe integration |
| 🌐 **Multi-chain** | Supports Mainnet, Sepolia, and more |
| 📚 **OpenAPI Docs** | Interactive Swagger documentation at `/api/docs` |

## 🏗 Architecture

```mermaid
flowchart TB
    subgraph Frontend["Frontend (Next.js)"]
        UI[Dashboard UI]
        Wallet[Wagmi Wallet]
    end

    subgraph Backend["Backend (NestJS)"]
        API[REST API]
        Watcher[Gas Watcher]
        Payment[Payment Service]
        DB[(PostgreSQL)]
    end

    subgraph External["External Services"]
        RPC[Ethereum RPC]
        Stripe[Stripe]
    end

    UI --> |Sign Tx| Wallet
    Wallet --> |Submit Order| API
    API --> |Store| DB
    Watcher --> |Monitor Gas| RPC
    Watcher --> |Broadcast Tx| RPC
    Watcher --> |Check Orders| DB
    UI --> |Buy Credits| Payment
    Payment --> |Checkout| Stripe
    Stripe --> |Webhook| Payment
```

## 🔄 How It Works

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Ethereum

    User->>Frontend: Connect Wallet
    User->>Frontend: Configure Deployment
    Frontend->>User: Request Signature
    User->>Frontend: Sign Transaction
    Frontend->>Backend: Submit Order
    Backend->>Backend: Validate & Store
    
    loop Every 12 seconds
        Backend->>Ethereum: Check Gas Price
        alt Gas Price ≤ Target
            Backend->>Ethereum: Broadcast Tx
            Backend->>Backend: Update Order Status
        end
    end
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Ethereum RPC (Alchemy, Infura, or Ankr)
- Stripe account (for payments)

### Development Setup

```bash
# 1. Start database
docker compose -f docker-compose.dev.yml up -d

# 2. Setup backend
cd backend
cp .env.example .env  # Edit with your API keys
npm install
npx prisma migrate dev
npm run start:dev

# 3. Setup frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Environment Variables

<details>
<summary><strong>Backend (.env)</strong></summary>

```env
# Database
DATABASE_URL=postgresql://gaslance:gaslance_dev_password@localhost:5439/gaslance

# Server
PORT=3001
FRONTEND_URL=http://localhost:3000

# Ethereum RPC
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

</details>

## 📚 API Documentation

Interactive API docs are available at:

```
http://localhost:3001/api/docs
```

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check with DB status |
| `POST` | `/sniper` | Create deployment order |
| `GET` | `/sniper/user/:userId` | Get user's orders |
| `GET` | `/sniper/credits/:userId` | Check credit balance |
| `GET` | `/payment/packages` | List credit packages |
| `POST` | `/payment/checkout` | Create Stripe session |

## 💰 Credit System

| Package | Credits | Price | Savings |
|---------|:-------:|:-----:|:-------:|
| Starter | 5 | $5 | — |
| Pro | 15 | $12 | 20% |
| Power | 50 | $35 | 30% |

> New users receive **1 free credit** to try the service.

## 🐳 Deployment

### Docker Compose (Production)

```bash
# Set environment variables
export MAINNET_RPC_URL=your_url
export STRIPE_SECRET_KEY=sk_live_xxx

# Build and deploy
docker compose up -d --build

# Run migrations
docker compose exec backend npx prisma migrate deploy
```

### Services

| Service | Port | Description |
|---------|:----:|-------------|
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
│       ├── app/             # Pages (App Router)
│       └── components/      # React components
├── .github/workflows/       # CI/CD pipelines
├── docker-compose.yml       # Production deployment
└── docker-compose.dev.yml   # Development (DB only)
```

## 🔒 Security

- ✅ **Non-custodial**: Users sign transactions locally
- ✅ **Input validation**: class-validator on all DTOs
- ✅ **Webhook verification**: Stripe signature validation
- ✅ **CORS**: Restricted to frontend origin
- ✅ **Address normalization**: All addresses lowercased

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 18, TypeScript, Wagmi, Viem |
| **Backend** | NestJS 11, Prisma, TypeScript |
| **Database** | PostgreSQL 16 |
| **Payments** | Stripe Checkout |
| **DevOps** | Docker, GitHub Actions |

## 📝 License

MIT © 2026

---

<p align="center">
  <sub>Built with ❤️ for the Ethereum community</sub>
</p>
