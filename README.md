# O-YES Enterprise Management Information System (EMIS)

A comprehensive greenfield enterprise platform for O-YES Global Foundation, featuring offline-first mobile apps, multi-tenant architecture, and 10 core modules.

## Tech Stack

- **Frontend**: Next.js 14 (React/TypeScript), Tailwind CSS, Shadcn UI, React Query
- **Backend**: NestJS (TypeScript), TypeORM, PostgreSQL 15+
- **Caching & Queue**: Redis, BullMQ
- **Mobile**: React Native (Expo) with WatermelonDB/SQLite (planned)
- **Storage**: S3-compatible (MinIO/AWS S3)

## Project Structure

```
oyes-emis/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # NestJS backend API
├── packages/
│   ├── shared/       # Shared constants and enums
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── turbo.json        # Turborepo configuration
└── package.json      # Root package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL 15+ with PostGIS extension
- Redis server
- npm >= 9.0.0

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up PostgreSQL database:
   ```bash
   # Create database
   createdb oyes_emis
   
   # Enable PostGIS extension (run in psql)
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "postgis";
   ```

5. Start Redis server:
   ```bash
   redis-server
   ```

### Running the Application

- **Development mode (all packages)**:
  ```bash
  npm run dev
  ```

- **Build all packages**:
  ```bash
  npm run build
  ```

- **Run frontend only**:
  ```bash
  cd apps/web
  npm run dev
  ```

- **Run backend only**:
  ```bash
  cd apps/api
  npm run dev
  ```

## Core Modules

1. **Executive Dashboard** - Real-time analytics and KPI monitoring
2. **Strategic Planning** - Organizational strategy and goal tracking
3. **Project Management** - Programmes, activities, and budget tracking
4. **Finance & Grants** - Multi-currency financial management
5. **MEAL System** - Monitoring, Evaluation, Accountability, and Learning
6. **HR Management** - Staff and volunteer coordination
7. **Supply Chain** - Inventory and logistics management
8. **Beneficiary Management** - Secure beneficiary data with GPS tracking
9. **GRC & Compliance** - Risk management and audit trails
10. **VMIS** - Volunteer Management Information System

## Architecture Highlights

- **Multi-Tenant**: Country/Region-based isolation with multi-currency support
- **Offline-First**: Mobile apps use SQLite with sync queue for offline operations
- **Event-Driven**: Integration Control Hub with internal messaging
- **Security**: RBAC/ABAC, field-level auditing, AES-256-GCM encryption
- **Performance**: Redis caching, materialized views, optimized queries

## API Documentation

API documentation will be available via Swagger UI at:
```
http://localhost:3001/api/v1/docs
```

## Database Schema

Core entities include:
- Countries, Offices (tenancy hierarchy)
- Users, Roles, Permissions (RBAC)
- Programmes, Projects, Activities
- Beneficiaries (with PostGIS location data)
- Volunteers, Skills, Qualifications
- System Audit Logs

## Internationalization

Supported languages:
- English (en)
- Amharic (am)
- Afaan Oromo (om)

## License

Proprietary - O-YES Global Foundation
