# Technology Stack & Implementation Guide
# Energy Monitoring Dashboard

**Version:** 1.0  
**Date:** January 30, 2026  
**Document Type:** Technology Implementation Guide  
**Status:** Production Ready

---

## Table of Contents

1. [Technology Stack Overview](#1-technology-stack-overview)
2. [Frontend Technologies](#2-frontend-technologies)
3. [Backend Technologies](#3-backend-technologies)
4. [Database Technologies](#4-database-technologies)
5. [DevOps & Infrastructure](#5-devops--infrastructure)
6. [Real-time & IoT Technologies](#6-real-time--iot-technologies)
7. [Third-Party Services](#7-third-party-services)
8. [Development Tools](#8-development-tools)
9. [Security Technologies](#9-security-technologies)
10. [Monitoring & Analytics](#10-monitoring--analytics)
11. [Testing Technologies](#11-testing-technologies)
12. [Installation & Setup Guide](#12-installation--setup-guide)
13. [Technology Decision Matrix](#13-technology-decision-matrix)
14. [Best Practices & Guidelines](#14-best-practices--guidelines)

---

## 1. Technology Stack Overview

### 1.1 Architecture Pattern
**Microservices Architecture with Event-Driven Design**
- **Frontend:** Single Page Application (SPA)
- **Backend:** RESTful API + WebSocket Services
- **Data Layer:** PostgreSQL + TimescaleDB + Redis
- **Message Queue:** RabbitMQ / Apache Kafka
- **Communication:** HTTP/HTTPS + WebSocket + MQTT

### 1.2 Technology Selection Criteria
✅ **Scalability:** Must support 100,000+ concurrent users  
✅ **Performance:** API response < 200ms, Page load < 2s  
✅ **Real-time:** WebSocket latency < 100ms  
✅ **Reliability:** 99.9% uptime guarantee  
✅ **Developer Experience:** Type-safe, well-documented  
✅ **Community Support:** Active community, regular updates  
✅ **Cost-Effectiveness:** Open-source preferred  

### 1.3 Tech Stack at a Glance

```
┌─────────────────────────────────────────────────┐
│              CLIENT LAYER                        │
│  React 18 + TypeScript + Vite + Tailwind CSS   │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              API GATEWAY                         │
│        NGINX / AWS ALB / Kong Gateway           │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          APPLICATION LAYER                       │
│    Node.js 20 + Express.js + TypeScript         │
│    WebSocket Server (ws / Socket.io)            │
│    MQTT Broker (Mosquitto / HiveMQ)             │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              DATA LAYER                          │
│  PostgreSQL 15 + TimescaleDB 2.13 + Redis 7     │
│  RabbitMQ 3.12 / Apache Kafka 3.5               │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          INFRASTRUCTURE LAYER                    │
│    Docker + Kubernetes + AWS/GCP/Azure          │
│    Prometheus + Grafana + ELK Stack             │
└─────────────────────────────────────────────────┘
```

---

## 2. Frontend Technologies

### 2.1 Core Framework - React 18.2+

**Why React?**
- ✅ Component-based architecture for reusable UI
- ✅ Virtual DOM for high performance
- ✅ Large ecosystem and community support
- ✅ Excellent TypeScript support
- ✅ React 18 features: Concurrent rendering, Suspense, Server Components

**Installation:**
```bash
npm create vite@latest energy-dashboard -- --template react-ts
cd energy-dashboard
npm install
```

**Key Features Used:**
- React Hooks (useState, useEffect, useCallback, useMemo, useContext)
- Custom Hooks for reusable logic
- React.memo for component optimization
- Error Boundaries for error handling
- Suspense for lazy loading

**Configuration (vite.config.ts):**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts', 'd3'],
          three: ['three', '@react-three/fiber'],
        },
      },
    },
  },
})
```

### 2.2 TypeScript 5.0+

**Why TypeScript?**
- ✅ Type safety prevents runtime errors
- ✅ Better IDE support and autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring
- ✅ Improved team collaboration

**Installation:**
```bash
npm install -D typescript @types/react @types/react-dom
```

**Configuration (tsconfig.json):**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2.3 State Management - Zustand 4.0+

**Why Zustand?**
- ✅ Simpler API than Redux
- ✅ No boilerplate code
- ✅ Excellent TypeScript support
- ✅ Small bundle size (1KB)
- ✅ No context providers needed

**Installation:**
```bash
npm install zustand
```

**Usage Example:**
```typescript
import { create } from 'zustand'

interface AppState {
  user: User | null
  isAuthenticated: boolean
  energyData: EnergyData[]
  setUser: (user: User) => void
  logout: () => void
  updateEnergyData: (data: EnergyData[]) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  energyData: [],
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateEnergyData: (data) => set({ energyData: data }),
}))
```

### 2.4 React Router 6.0+

**Why React Router?**
- ✅ Standard routing library for React
- ✅ Declarative routing
- ✅ Code splitting support
- ✅ Nested routes
- ✅ Route guards

**Installation:**
```bash
npm install react-router-dom
```

**Configuration:**
```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="apartments" element={<Apartments />} />
          <Route path="reporting" element={<Reporting />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### 2.5 React Query (TanStack Query) 5.0+

**Why React Query?**
- ✅ Powerful data synchronization
- ✅ Automatic caching and refetching
- ✅ Background updates
- ✅ Optimistic updates
- ✅ Built-in loading and error states

**Installation:**
```bash
npm install @tanstack/react-query
```

**Setup:**
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      cacheTime: 300000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}
```

**Usage:**
```typescript
import { useQuery, useMutation } from '@tanstack/react-query'

export const useEnergyData = (locationId: string) => {
  return useQuery({
    queryKey: ['energy', locationId],
    queryFn: () => fetchEnergyData(locationId),
    refetchInterval: 5000, // Real-time updates every 5 seconds
  })
}
```

### 2.6 Styling - Tailwind CSS 3.0+

**Why Tailwind CSS?**
- ✅ Utility-first approach
- ✅ No CSS file maintenance
- ✅ Consistent design system
- ✅ JIT (Just-In-Time) compilation
- ✅ Excellent performance

**Installation:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configuration (tailwind.config.js):**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0A0F0D',
          secondary: '#1A1F1D',
          tertiary: '#151A18',
        },
        green: {
          primary: '#2D4A3E',
          secondary: '#3D5F4E',
          accent: '#4A7A5F',
        },
        cream: '#E8E5D8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 2.7 Data Visualization - Recharts 2.0+

**Why Recharts?**
- ✅ Built for React
- ✅ Composable components
- ✅ Responsive by default
- ✅ Easy customization
- ✅ Good documentation

**Installation:**
```bash
npm install recharts
```

**Usage:**
```typescript
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const EnergyChart = ({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="consumption" fill="#FFFFFF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

### 2.8 3D Visualization - Three.js + React Three Fiber

**Why Three.js?**
- ✅ Industry standard for 3D on web
- ✅ Powerful rendering capabilities
- ✅ Large ecosystem
- ✅ WebGL support

**Why React Three Fiber?**
- ✅ React renderer for Three.js
- ✅ Declarative approach
- ✅ Better performance
- ✅ React ecosystem integration

**Installation:**
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

**Usage:**
```typescript
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const Building3D = () => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial color="#2D4A3E" wireframe transparent opacity={0.6} />
      </mesh>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
```

### 2.9 Form Handling - React Hook Form 7.0+

**Why React Hook Form?**
- ✅ Minimal re-renders
- ✅ Better performance
- ✅ Easy validation integration
- ✅ Small bundle size
- ✅ TypeScript support

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

**Usage:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Login</button>
    </form>
  )
}
```

### 2.10 Animation - Framer Motion 11.0+

**Why Framer Motion?**
- ✅ Production-ready animations
- ✅ Declarative API
- ✅ Spring physics
- ✅ Gesture support
- ✅ SVG animations

**Installation:**
```bash
npm install framer-motion
```

**Usage:**
```typescript
import { motion } from 'framer-motion'

const Widget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="widget"
    >
      Content
    </motion.div>
  )
}
```

---

## 3. Backend Technologies

### 3.1 Runtime - Node.js 20 LTS

**Why Node.js?**
- ✅ JavaScript everywhere (full-stack)
- ✅ Non-blocking I/O
- ✅ Large package ecosystem (npm)
- ✅ Excellent for real-time applications
- ✅ Strong community support

**Installation:**
```bash
# Using nvm (recommended)
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
node --version  # v20.x.x
npm --version   # 10.x.x
```

**Package.json Setup:**
```json
{
  "name": "energy-monitor-api",
  "version": "1.0.0",
  "type": "module",
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  },
  "scripts": {
    "dev": "nodemon --exec tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  }
}
```

### 3.2 Web Framework - Express.js 4.18+

**Why Express.js?**
- ✅ Most popular Node.js framework
- ✅ Minimalist and flexible
- ✅ Large middleware ecosystem
- ✅ Well-documented
- ✅ Battle-tested in production

**Installation:**
```bash
npm install express
npm install -D @types/express
```

**Basic Setup:**
```typescript
import express, { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'

const app: Express = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true,
}))

// Compression
app.use(compression())

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/locations', locationRoutes)
app.use('/api/v1/devices', deviceRoutes)

// Error handling
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

**Alternative: Fastify (High Performance)**
```bash
npm install fastify
```

### 3.3 Database ORM - Prisma 5.0+

**Why Prisma?**
- ✅ Type-safe database access
- ✅ Auto-generated types
- ✅ Excellent migration system
- ✅ Great developer experience
- ✅ Supports PostgreSQL, MySQL, etc.

**Installation:**
```bash
npm install -D prisma
npm install @prisma/client
npx prisma init
```

**Schema (schema.prisma):**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String     @id @default(uuid())
  email         String     @unique
  passwordHash  String
  firstName     String?
  lastName      String?
  emailVerified Boolean    @default(false)
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  locations     Location[]
  
  @@map("users")
}

model Location {
  id        String   @id @default(uuid())
  userId    String
  name      String
  type      String
  address   Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  devices   Device[]
  
  @@map("locations")
}

model Device {
  id         String   @id @default(uuid())
  locationId String
  category   String
  status     String   @default("offline")
  createdAt  DateTime @default(now())
  location   Location @relation(fields: [locationId], references: [id], onDelete: Cascade)
  
  @@map("devices")
}
```

**Usage:**
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    passwordHash: hashedPassword,
    firstName: 'John',
    lastName: 'Doe',
  },
})

// Query with relations
const locations = await prisma.location.findMany({
  where: { userId: user.id },
  include: {
    devices: true,
  },
})
```

### 3.4 Authentication - JWT + Passport.js

**Installation:**
```bash
npm install jsonwebtoken passport passport-jwt bcryptjs
npm install -D @types/jsonwebtoken @types/passport @types/passport-jwt @types/bcryptjs
```

**JWT Token Generation:**
```typescript
import jwt from 'jsonwebtoken'

interface JWTPayload {
  sub: string
  email: string
  role: string
}

export const generateAccessToken = (user: User): string => {
  const payload: JWTPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '15m',
    algorithm: 'HS256',
  })
}

export const generateRefreshToken = (user: User): string => {
  return jwt.sign(
    { sub: user.id, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  )
}
```

**Passport JWT Strategy:**
```typescript
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
}

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
      })
      
      if (!user) {
        return done(null, false)
      }
      
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  })
)
```

### 3.5 Validation - Zod 3.0+

**Why Zod?**
- ✅ TypeScript-first
- ✅ Zero dependencies
- ✅ Composable schemas
- ✅ Excellent error messages
- ✅ Runtime type checking

**Installation:**
```bash
npm install zod
```

**Usage:**
```typescript
import { z } from 'zod'

const createLocationSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(['apartment', 'house', 'office', 'commercial']),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
  }),
  squareFootage: z.number().positive().optional(),
})

type CreateLocationInput = z.infer<typeof createLocationSchema>

// Middleware
const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            details: error.errors,
          },
        })
      }
      next(error)
    }
  }
}

// Usage in route
router.post('/locations', validate(createLocationSchema), createLocation)
```

---

## 4. Database Technologies

### 4.1 Primary Database - PostgreSQL 15+

**Why PostgreSQL?**
- ✅ Most advanced open-source RDBMS
- ✅ ACID compliant
- ✅ JSON support (JSONB)
- ✅ Full-text search
- ✅ Excellent performance
- ✅ Rich extension ecosystem

**Installation:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql-15 postgresql-contrib

# macOS (using Homebrew)
brew install postgresql@15

# Start service
sudo systemctl start postgresql
```

**Docker Setup:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: energy_monitor
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

**Connection (Node.js):**
```typescript
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export default pool
```

### 4.2 Time-Series Database - TimescaleDB 2.13+

**Why TimescaleDB?**
- ✅ PostgreSQL extension (SQL compatibility)
- ✅ Optimized for time-series data
- ✅ Automatic partitioning
- ✅ Continuous aggregates
- ✅ Data retention policies
- ✅ Compression

**Installation:**
```bash
# Add repository
sudo sh -c "echo 'deb https://packagecloud.io/timescale/timescaledb/ubuntu/ $(lsb_release -c -s) main' > /etc/apt/sources.list.d/timescaledb.list"

# Install
sudo apt update
sudo apt install timescaledb-2-postgresql-15

# Configure
sudo timescaledb-tune

# Restart PostgreSQL
sudo systemctl restart postgresql
```

**Enable Extension:**
```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;
```

**Create Hypertable:**
```sql
-- Create table
CREATE TABLE energy_readings (
    time TIMESTAMPTZ NOT NULL,
    device_id UUID NOT NULL,
    location_id UUID NOT NULL,
    energy_kwh DECIMAL(10, 4) NOT NULL,
    power_w DECIMAL(10, 2)
);

-- Convert to hypertable
SELECT create_hypertable('energy_readings', 'time');

-- Create index
CREATE INDEX idx_energy_device_time ON energy_readings (device_id, time DESC);
```

**Continuous Aggregates:**
```sql
CREATE MATERIALIZED VIEW energy_hourly
WITH (timescaledb.continuous) AS
SELECT 
    time_bucket('1 hour', time) AS hour,
    device_id,
    AVG(energy_kwh) as avg_energy,
    MAX(energy_kwh) as max_energy,
    COUNT(*) as reading_count
FROM energy_readings
GROUP BY hour, device_id;

-- Refresh policy
SELECT add_continuous_aggregate_policy('energy_hourly',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour');
```

**Data Retention:**
```sql
SELECT add_retention_policy('energy_readings', INTERVAL '90 days');
```

### 4.3 Caching - Redis 7.2+

**Why Redis?**
- ✅ In-memory data store
- ✅ Sub-millisecond latency
- ✅ Rich data structures
- ✅ Pub/Sub support
- ✅ Persistence options
- ✅ Clustering support

**Installation:**
```bash
# Ubuntu/Debian
sudo apt install redis-server

# macOS
brew install redis

# Start service
redis-server
```

**Docker Setup:**
```yaml
redis:
  image: redis:7-alpine
  command: redis-server --requirepass ${REDIS_PASSWORD}
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data
```

**Node.js Integration:**
```bash
npm install ioredis
```

```typescript
import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: 0,
  retryStrategy: (times) => Math.min(times * 50, 2000),
})

// Caching example
export const cacheMiddleware = async (req, res, next) => {
  const key = `cache:${req.originalUrl}`
  
  try {
    const cached = await redis.get(key)
    
    if (cached) {
      return res.json(JSON.parse(cached))
    }
    
    // Store original send
    const originalSend = res.json.bind(res)
    
    // Override send
    res.json = (data) => {
      redis.setex(key, 60, JSON.stringify(data)) // 60 seconds TTL
      return originalSend(data)
    }
    
    next()
  } catch (error) {
    next()
  }
}
```

---

## 5. DevOps & Infrastructure

### 5.1 Containerization - Docker

**Why Docker?**
- ✅ Consistent environments
- ✅ Easy deployment
- ✅ Isolation
- ✅ Scalability
- ✅ CI/CD integration

**Installation:**
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin
```

**Dockerfile (Backend):**
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN addgroup -g 1001 -S nodejs &&     adduser -S nodejs -u 1001

USER nodejs

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s   CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

**Dockerfile (Frontend):**
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - energy-monitor

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@postgres:5432/energy_monitor
      - REDIS_HOST=redis
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - energy-monitor

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: energy_monitor
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
    networks:
      - energy-monitor

  timescaledb:
    image: timescale/timescaledb:latest-pg15
    environment:
      POSTGRES_DB: energy_timeseries
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - timescale_data:/var/lib/postgresql/data
    networks:
      - energy-monitor

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - energy-monitor

  rabbitmq:
    image: rabbitmq:3-management-alpine
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD}
    ports:
      - "15672:15672"
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - energy-monitor

networks:
  energy-monitor:
    driver: bridge

volumes:
  postgres_data:
  timescale_data:
  redis_data:
  rabbitmq_data:
```

### 5.2 Orchestration - Kubernetes

**Why Kubernetes?**
- ✅ Container orchestration
- ✅ Auto-scaling
- ✅ Self-healing
- ✅ Load balancing
- ✅ Rolling updates

**Deployment Example:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: energy-monitor-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: energy-monitor-api
  template:
    metadata:
      labels:
        app: energy-monitor-api
    spec:
      containers:
      - name: api
        image: energymonitor/api:latest
        ports:
        - containerPort: 4000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 4000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 4000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: energy-monitor-api-service
spec:
  selector:
    app: energy-monitor-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 4000
  type: LoadBalancer
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: energy-monitor-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: energy-monitor-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 5.3 CI/CD - GitHub Actions

**Workflow File (.github/workflows/deploy.yml):**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_PASSWORD: test_pass
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:test_pass@localhost:5432/test_db
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            energymonitor/api:latest
            energymonitor/api:${{ github.sha }}
          cache-from: type=registry,ref=energymonitor/api:latest
          cache-to: type=inline

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USER }}
          key: ${{ secrets.PRODUCTION_SSH_KEY }}
          script: |
            cd /app/energy-monitor
            docker-compose pull
            docker-compose up -d --no-deps --build api
            docker system prune -af
```

---

## 6. Real-time & IoT Technologies

### 6.1 WebSocket - Socket.io / ws

**Why WebSocket?**
- ✅ Real-time bidirectional communication
- ✅ Low latency
- ✅ Event-based
- ✅ Automatic reconnection

**Installation:**
```bash
npm install socket.io
npm install -D @types/socket.io
```

**Server Setup (Socket.io):**
```typescript
import { Server } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})

// Authentication middleware
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token
  
  try {
    const decoded = verifyToken(token)
    socket.data.userId = decoded.sub
    next()
  } catch (error) {
    next(new Error('Authentication error'))
  }
})

// Connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  // Join location room
  socket.on('subscribe:location', (locationId) => {
    socket.join(`location:${locationId}`)
  })
  
  // Broadcast energy update
  socket.on('energy:update', (data) => {
    io.to(`location:${data.locationId}`).emit('energy:realtime', data)
  })
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

httpServer.listen(4000)
```

**Client Setup (React):**
```bash
npm install socket.io-client
```

```typescript
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export const useSocket = (token: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  
  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      auth: { token },
    })
    
    newSocket.on('connect', () => {
      setConnected(true)
    })
    
    newSocket.on('disconnect', () => {
      setConnected(false)
    })
    
    setSocket(newSocket)
    
    return () => {
      newSocket.close()
    }
  }, [token])
  
  return { socket, connected }
}

// Usage
const Dashboard = () => {
  const { socket, connected } = useSocket(authToken)
  const [energyData, setEnergyData] = useState(null)
  
  useEffect(() => {
    if (!socket) return
    
    socket.emit('subscribe:location', locationId)
    
    socket.on('energy:realtime', (data) => {
      setEnergyData(data)
    })
    
    return () => {
      socket.off('energy:realtime')
    }
  }, [socket, locationId])
  
  return <div>Connected: {connected ? 'Yes' : 'No'}</div>
}
```

### 6.2 MQTT Broker - Mosquitto

**Why MQTT?**
- ✅ Lightweight protocol for IoT
- ✅ Publish/Subscribe pattern
- ✅ QoS levels
- ✅ Low bandwidth
- ✅ Persistent sessions

**Installation:**
```bash
# Ubuntu/Debian
sudo apt install mosquitto mosquitto-clients

# Start service
sudo systemctl start mosquitto
```

**Configuration (/etc/mosquitto/mosquitto.conf):**
```
listener 1883
protocol mqtt

listener 8883
protocol mqtt
certfile /etc/mosquitto/certs/server.crt
keyfile /etc/mosquitto/certs/server.key

allow_anonymous false
password_file /etc/mosquitto/passwd

log_dest file /var/log/mosquitto/mosquitto.log
log_type all
```

**Node.js Integration:**
```bash
npm install mqtt
```

```typescript
import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://localhost:1883', {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clientId: `energy-monitor-${Date.now()}`,
  clean: true,
  reconnectPeriod: 1000,
})

client.on('connect', () => {
  console.log('Connected to MQTT broker')
  
  // Subscribe to device readings
  client.subscribe('devices/+/readings', { qos: 1 })
  client.subscribe('devices/+/status', { qos: 0 })
})

client.on('message', async (topic, message) => {
  const parts = topic.split('/')
  const deviceId = parts[1]
  const messageType = parts[2]
  
  const data = JSON.parse(message.toString())
  
  if (messageType === 'readings') {
    // Store in database
    await storeEnergyReading(deviceId, data)
    
    // Broadcast via WebSocket
    io.to(`location:${data.locationId}`).emit('energy:update', {
      deviceId,
      ...data,
    })
  }
})

client.on('error', (error) => {
  console.error('MQTT error:', error)
})
```

### 6.3 Message Queue - RabbitMQ

**Why RabbitMQ?**
- ✅ Reliable message delivery
- ✅ Multiple exchange types
- ✅ Dead letter queues
- ✅ Plugin ecosystem
- ✅ Management UI

**Installation:**
```bash
# Ubuntu/Debian
sudo apt install rabbitmq-server

# Enable management plugin
sudo rabbitmq-plugins enable rabbitmq_management

# Access UI: http://localhost:15672
# Default credentials: guest/guest
```

**Node.js Integration:**
```bash
npm install amqplib
npm install -D @types/amqplib
```

```typescript
import amqp from 'amqplib'

class MessageQueue {
  private connection: amqp.Connection
  private channel: amqp.Channel
  
  async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL!)
    this.channel = await this.connection.createChannel()
    
    // Declare exchanges
    await this.channel.assertExchange('energy_events', 'topic', {
      durable: true,
    })
    
    // Declare queues
    await this.channel.assertQueue('energy_processing', {
      durable: true,
    })
    
    await this.channel.assertQueue('notifications', {
      durable: true,
    })
    
    // Bind queues
    await this.channel.bindQueue(
      'energy_processing',
      'energy_events',
      'device.*.reading'
    )
  }
  
  async publishEnergyReading(deviceId: string, data: any) {
    this.channel.publish(
      'energy_events',
      `device.${deviceId}.reading`,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    )
  }
  
  async consumeEnergyReadings() {
    await this.channel.consume('energy_processing', async (msg) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString())
        await processEnergyReading(data)
        this.channel.ack(msg)
      }
    })
  }
}
```

---

## 7. Third-Party Services

### 7.1 Email - SendGrid

**Installation:**
```bash
npm install @sendgrid/mail
```

**Configuration:**
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject,
    html,
  }
  
  try {
    await sgMail.send(msg)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}
```

### 7.2 SMS - Twilio

**Installation:**
```bash
npm install twilio
```

**Configuration:**
```typescript
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export const sendSMS = async (to: string, message: string) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    return result
  } catch (error) {
    console.error('SMS error:', error)
    throw error
  }
}
```

### 7.3 Push Notifications - Firebase Cloud Messaging

**Installation:**
```bash
npm install firebase-admin
```

**Configuration:**
```typescript
import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '
'),
  }),
})

export const sendPushNotification = async (
  deviceToken: string,
  notification: {
    title: string
    body: string
    data?: Record<string, string>
  }
) => {
  const message = {
    token: deviceToken,
    notification: {
      title: notification.title,
      body: notification.body,
    },
    data: notification.data,
    android: {
      priority: 'high' as const,
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
        },
      },
    },
  }
  
  try {
    const response = await admin.messaging().send(message)
    return response
  } catch (error) {
    console.error('Push notification error:', error)
    throw error
  }
}
```

### 7.4 File Storage - AWS S3

**Installation:**
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

**Configuration:**
```typescript
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const uploadFile = async (key: string, buffer: Buffer, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  })
  
  await s3Client.send(command)
  
  return {
    url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  }
}

export const getPresignedUrl = async (key: string, expiresIn = 3600) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  })
  
  return getSignedUrl(s3Client, command, { expiresIn })
}
```

---

## 8. Development Tools

### 8.1 Code Quality - ESLint & Prettier

**Installation:**
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

**.eslintrc.json:**
```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "react", "react-hooks"],
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/react-in-jsx-scope": "off"
  }
}
```

**.prettierrc:**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

### 8.2 Git Hooks - Husky

**Installation:**
```bash
npm install -D husky lint-staged
npx husky init
```

**.husky/pre-commit:**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**package.json:**
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### 8.3 Environment Variables - dotenv

**Installation:**
```bash
npm install dotenv
npm install -D @types/node
```

**.env.example:**
```env
# Application
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/energy_monitor
TIMESCALE_URL=postgresql://postgres:password@localhost:5432/energy_timeseries

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=

# Email
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# SMS
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Firebase
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# MQTT
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=
MQTT_PASSWORD=

# RabbitMQ
RABBITMQ_URL=amqp://localhost:5672
```

**Usage:**
```typescript
import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  // ... other config
}
```

---

## 9. Security Technologies

### 9.1 Security Headers - Helmet.js

**Installation:**
```bash
npm install helmet
```

**Configuration:**
```typescript
import helmet from 'helmet'

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", process.env.API_URL!],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}))
```

### 9.2 Rate Limiting - rate-limiter-flexible

**Installation:**
```bash
npm install rate-limiter-flexible
```

**Configuration:**
```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible'
import Redis from 'ioredis'

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
})

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate_limit',
  points: 100, // 100 requests
  duration: 60, // per 60 seconds
})

export const rateLimitMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip)
    next()
  } catch (error) {
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests',
      },
    })
  }
}
```

### 9.3 CORS - cors

**Installation:**
```bash
npm install cors
npm install -D @types/cors
```

**Configuration:**
```typescript
import cors from 'cors'

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
```

---

## 10. Monitoring & Analytics

### 10.1 Metrics - Prometheus

**Installation:**
```bash
npm install prom-client
```

**Configuration:**
```typescript
import promClient from 'prom-client'

const register = new promClient.Registry()

promClient.collectDefaultMetrics({ register })

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5],
})

register.registerMetric(httpRequestDuration)

// Middleware
app.use((req, res, next) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration)
  })
  
  next()
})

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})
```

### 10.2 Logging - Winston

**Installation:**
```bash
npm install winston
```

**Configuration:**
```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 10485760,
      maxFiles: 10,
    }),
  ],
})

export default logger
```

### 10.3 Error Tracking - Sentry

**Installation:**
```bash
npm install @sentry/node @sentry/profiling-node
```

**Configuration:**
```typescript
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})

// Error handling middleware
app.use(Sentry.Handlers.errorHandler())
```

---

## 11. Testing Technologies

### 11.1 Unit Testing - Jest / Vitest

**Installation (Vitest):**
```bash
npm install -D vitest @vitest/ui
```

**Configuration (vitest.config.ts):**
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/'],
    },
  },
})
```

**Example Test:**
```typescript
import { describe, it, expect } from 'vitest'

describe('Energy Analytics Service', () => {
  it('should calculate total consumption', () => {
    const data = [
      { consumption: 100 },
      { consumption: 150 },
      { consumption: 200 },
    ]
    
    const total = data.reduce((sum, item) => sum + item.consumption, 0)
    
    expect(total).toBe(450)
  })
})
```

### 11.2 Integration Testing - Supertest

**Installation:**
```bash
npm install -D supertest @types/supertest
```

**Example:**
```typescript
import request from 'supertest'
import app from '../app'

describe('POST /api/v1/auth/login', () => {
  it('should login successfully', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Test@123',
      })
    
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toHaveProperty('accessToken')
  })
})
```

### 11.3 E2E Testing - Playwright

**Installation:**
```bash
npm install -D @playwright/test
npx playwright install
```

**Example (tests/e2e/dashboard.spec.ts):**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test('should display energy consumption', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Login
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'Test@123')
    await page.click('button[type="submit"]')
    
    // Wait for dashboard
    await page.waitForSelector('.dashboard')
    
    // Check energy widget
    const energyWidget = page.locator('.energy-consumption-widget')
    await expect(energyWidget).toBeVisible()
    
    // Check values
    const consumption = await energyWidget.locator('.energy-value').textContent()
    expect(consumption).toMatch(/\d+–\d+/)
  })
})
```

### 11.4 Load Testing - k6

**Installation:**
```bash
# macOS
brew install k6

# Ubuntu/Debian
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Example (loadtest.js):**
```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
}

export default function () {
  const response = http.get('https://api.energymonitor.com/v1/dashboard')
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  })
  
  sleep(1)
}
```

---

## 12. Installation & Setup Guide

### 12.1 Prerequisites

**Required Software:**
```bash
# Node.js 20 LTS
node --version  # v20.x.x

# npm or pnpm
npm --version   # 10.x.x

# Docker & Docker Compose
docker --version
docker-compose --version

# PostgreSQL 15
psql --version

# Redis
redis-cli --version

# Git
git --version
```

### 12.2 Project Setup

**1. Clone Repository:**
```bash
git clone https://github.com/your-org/energy-monitor.git
cd energy-monitor
```

**2. Install Dependencies:**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

**3. Environment Configuration:**
```bash
# Copy example files
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**4. Database Setup:**
```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Run migrations
npm run migrate

# Seed database (optional)
npm run seed
```

**5. Start Development Servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Docker Services
docker-compose up redis rabbitmq
```

**6. Access Application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Docs: http://localhost:4000/api-docs
- RabbitMQ Management: http://localhost:15672

### 12.3 Production Deployment

**1. Build Application:**
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

**2. Docker Deployment:**
```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose logs -f
```

**3. Kubernetes Deployment:**
```bash
# Apply configurations
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services

# Scale deployment
kubectl scale deployment energy-monitor-api --replicas=5
```

---

## 13. Technology Decision Matrix

### 13.1 Frontend Framework Selection

| Criteria | React | Vue.js | Angular | Svelte | Decision |
|----------|-------|--------|---------|--------|----------|
| Learning Curve | Medium | Easy | Hard | Easy | ✅ React |
| Performance | Excellent | Excellent | Good | Excellent | ✅ React |
| TypeScript Support | Excellent | Good | Excellent | Good | ✅ React |
| Ecosystem | Largest | Large | Large | Growing | ✅ React |
| Community | Huge | Large | Large | Growing | ✅ React |
| Job Market | Highest | High | Medium | Low | ✅ React |
| 3D Libraries | Best | Limited | Limited | Limited | ✅ React |

**Winner: React 18** - Best overall for complex dashboards with 3D visualization

### 13.2 Backend Framework Selection

| Criteria | Node.js/Express | NestJS | FastAPI (Python) | Django | Decision |
|----------|-----------------|--------|------------------|--------|----------|
| Performance | Excellent | Excellent | Excellent | Good | ✅ Node.js |
| TypeScript | Yes | Native | No | No | ✅ Node.js |
| Real-time | Excellent | Excellent | Good | Fair | ✅ Node.js |
| Learning Curve | Easy | Medium | Easy | Medium | ✅ Node.js |
| Ecosystem | Largest | Growing | Large | Large | ✅ Node.js |
| Async I/O | Native | Native | Yes | Yes | ✅ Node.js |

**Winner: Node.js with Express** - Best for real-time applications with TypeScript

### 13.3 Database Selection

| Criteria | PostgreSQL | MySQL | MongoDB | Cassandra | Decision |
|----------|------------|-------|---------|-----------|----------|
| Time-Series Support | ✅ (TimescaleDB) | Limited | No | Yes | ✅ PostgreSQL |
| ACID Compliance | Yes | Yes | No | No | ✅ PostgreSQL |
| JSON Support | Excellent (JSONB) | Good | Native | No | ✅ PostgreSQL |
| Scalability | Excellent | Excellent | Excellent | Excellent | ✅ PostgreSQL |
| Community | Huge | Huge | Large | Medium | ✅ PostgreSQL |
| Performance | Excellent | Excellent | Excellent | Excellent | ✅ PostgreSQL |

**Winner: PostgreSQL + TimescaleDB** - Best for structured data with time-series

---

## 14. Best Practices & Guidelines

### 14.1 Code Organization

```
project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── widgets/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   └── server.ts
│   └── package.json
│
├── docker-compose.yml
├── .env.example
└── README.md
```

### 14.2 Naming Conventions

**Files:**
- Components: PascalCase (`EnergyWidget.tsx`)
- Hooks: camelCase with 'use' prefix (`useEnergyData.ts`)
- Utils: camelCase (`formatEnergy.ts`)
- Constants: UPPER_SNAKE_CASE (`API_URL.ts`)

**Variables:**
- camelCase for variables and functions
- PascalCase for types and interfaces
- UPPER_SNAKE_CASE for constants

**Database:**
- snake_case for tables and columns
- Plural table names (`users`, `devices`)

### 14.3 Performance Best Practices

**Frontend:**
- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize images (WebP format)
- Use virtual scrolling for large lists
- Implement proper caching strategies
- Minimize bundle size
- Use CDN for static assets

**Backend:**
- Use database connection pooling
- Implement proper indexing
- Use caching (Redis)
- Batch database operations
- Use compression
- Implement rate limiting
- Optimize database queries

### 14.4 Security Best Practices

**Frontend:**
- Sanitize user input
- Use HTTPS only
- Implement CSP headers
- No sensitive data in localStorage
- Use environment variables
- Implement proper error handling

**Backend:**
- Use parameterized queries
- Implement rate limiting
- Use strong password hashing
- Implement JWT properly
- Use security headers (Helmet)
- Regular dependency updates
- Implement CORS properly
- Use HTTPS/TLS
- Regular security audits

---

## Conclusion

This comprehensive technology guide provides all the necessary information to build the Energy Monitoring Dashboard from scratch. Each technology has been carefully selected based on:

✅ **Performance Requirements**  
✅ **Scalability Needs**  
✅ **Developer Experience**  
✅ **Community Support**  
✅ **Production Readiness**  
✅ **Cost Effectiveness**

**Next Steps:**
1. Set up development environment
2. Install all dependencies
3. Configure databases
4. Implement authentication
5. Build core features
6. Add real-time functionality
7. Implement testing
8. Deploy to staging
9. Production deployment

---

**Document Version:** 1.0  
**Created:** January 30, 2026  
**Last Updated:** January 30, 2026  
**Maintained By:** Technology Team  
**Status:** Production Ready

---

*For implementation details, refer to Frontend.md and Backend.md documentation.*
