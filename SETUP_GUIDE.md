# O-YES EMIS - Setup Guide

## Project Initialization Complete

The foundational architecture for the O-YES Enterprise Management Information System has been successfully set up with the following components:

### ✅ Completed Setup

1. **Monorepo Structure**
   - Turborepo with Next.js frontend (`apps/web`)
   - NestJS backend API (`apps/api`)
   - Shared packages (`packages/shared`, `packages/types`, `packages/utils`)

2. **Database Schema**
   - PostgreSQL with PostGIS extension
   - Core entities: Countries, Offices, Users, Programmes, Projects, Beneficiaries, Volunteers, SystemAuditLogs
   - ProcessedSyncTransactions for offline-first sync tracking
   - DDL schema available in `database/schema.sql`

3. **Backend Configuration**
   - NestJS with TypeORM
   - JWT authentication with Passport
   - Role-Based Access Control (RBAC) guards
   - Redis caching layer
   - BullMQ for background job processing

4. **Frontend Setup**
   - Next.js 14 with App Router
   - Tailwind CSS for styling
   - Shadcn UI components (Button, Card)
   - React Query for data fetching
   - Axios API client with interceptors

5. **Offline-First Sync Architecture**
   - BullMQ queue system
   - Sync transaction processor
   - Idempotency checking
   - Sync status tracking

6. **Integration & Control Hub**
   - Event-driven messaging with EventEmitter2
   - Pre-defined event types for all 10 modules
   - Cross-module event handlers
   - Event history tracking

7. **Multi-Tenant Architecture**
   - Tenant context decorators (`@Tenant`)
   - Tenant guard for request validation
   - Currency conversion service
   - Multi-currency monetary value handling
   - Tenant-aware repository base class

8. **Internationalization (i18n)**
   - Support for English (en), Amharic (am), Afaan Oromo (om)
   - Translation files in `public/locales/`
   - React context for locale management
   - Language switcher in header

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL 15+ with PostGIS extension
- Redis server
- npm >= 9.0.0

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set Up PostgreSQL Database**
   ```bash
   # Create database
   createdb oyes_emis

   # Enable extensions (run in psql)
   psql oyes_emis
   \i database/schema.sql
   ```

4. **Start Redis Server**
   ```bash
   redis-server
   ```

5. **Run Development Servers**
   ```bash
   # Run all packages
   npm run dev

   # Or run individually
   cd apps/api && npm run dev  # Backend on port 3001
   cd apps/web && npm run dev  # Frontend on port 3000
   ```

## Project Structure

```
oyes-emis/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/      # App Router pages
│   │   │   ├── components/
│   │   │   ├── lib/      # Utilities, API client, i18n
│   │   │   └── styles/
│   │   └── public/
│   │       └── locales/  # Translation files
│   └── api/              # NestJS backend
│       └── src/
│           ├── modules/
│           │   ├── auth/              # Authentication
│           │   ├── core/              # Entities
│           │   ├── sync/              # Offline sync
│           │   └── integration-hub/   # Event system
│           ├── common/
│           │   ├── guards/            # RBAC, Tenant guards
│           │   ├── decorators/        # Custom decorators
│           │   └── services/          # Currency, Multi-currency
│           └── main.ts
├── packages/
│   ├── shared/           # Shared constants
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── database/
│   └── schema.sql        # PostgreSQL DDL
├── .env.example
├── package.json
├── turbo.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/profile` - Get current user profile

### Sync
- `POST /api/v1/sync/push` - Push offline transactions
- `GET /api/v1/sync/status?deviceId=xxx` - Get sync status

### Integration Hub
- `POST /api/v1/integration-hub/emit` - Emit event
- `GET /api/v1/integration-hub/events` - Get event history
- `GET /api/v1/integration-hub/health` - Health check

## Next Steps

The foundational architecture is complete. To continue development:

1. **Module Development**
   - Implement CRUD operations for each entity
   - Create service layers for Projects, Beneficiaries, etc.
   - Add validation DTOs

2. **Frontend Pages**
   - Create dashboard with real-time analytics
   - Build project management interface
   - Implement beneficiary registration forms
   - Add data tables with export functionality

3. **Mobile App**
   - Set up React Native/Flutter project
   - Implement SQLite local storage
   - Build sync controller for offline operations

4. **Security Hardening**
   - Implement AES-256-GCM encryption for sensitive data
   - Add field-level audit logging
   - Set up rate limiting
   - Configure CORS policies

5. **Testing**
   - Write unit tests for services
   - Add integration tests for API endpoints
   - Set up E2E tests with Playwright

6. **Deployment**
   - Configure Docker containers
   - Set up Kubernetes/ECS orchestration
   - Configure CI/CD pipelines
   - Set up monitoring and logging

## Environment Variables

Required variables in `.env`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=oyes_emis

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# CORS
WEB_URL=http://localhost:3000

# Application
NODE_ENV=development
PORT=3001

# Encryption
ENCRYPTION_KEY=your-32-byte-encryption-key
```

## Architecture Notes

### Multi-Tenancy
- All data queries are filtered by `country_id` and `office_id`
- Tenant context is extracted from headers or user session
- Use `@Tenant()` decorator to access tenant context
- Use `@TenantExcept()` to exempt endpoints from tenant filtering

### Currency Handling
- All monetary values stored with base USD equivalent
- Automatic conversion using exchange rates
- Use `CurrencyService` for conversions
- Use `MultiCurrencyService` for complex calculations

### Event System
- All inter-module communication uses events
- Events are emitted via IntegrationHubService
- Subscribe to events using EventEmitter2
- Event types defined in `HubEvent` enum

### Offline Sync
- Mobile apps write to local SQLite when offline
- Sync queue processes transactions when online
- Idempotency ensured via `client_tx_id`
- Conflict resolution: Client wins for operational data

## Support

For issues or questions, refer to the project documentation or contact the development team.
