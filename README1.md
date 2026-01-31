# ECO-DASH 🌱⚡

> A comprehensive, production-ready Energy Monitoring Dashboard for real-time energy consumption tracking, analysis, and optimization.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://github.com/Mrkarfa/ECO-DASH)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)](https://www.typescriptlang.org/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**ECO-DASH** is an intelligent energy monitoring platform designed to help homeowners, apartment dwellers, and commercial facility managers:

- 📊 Monitor real-time energy consumption across multiple appliances
- 🌿 Track green energy sources with stunning 3D visualizations
- 💡 Receive AI-driven personalized recommendations
- 📈 Analyze historical trends and detailed reports
- 📱 Access from any device with fully responsive design

### Business Value

- Reduce energy consumption by **15-20%**
- Lower carbon footprint through actionable insights
- Support green energy adoption and optimization
- Deliver intuitive, production-grade user experience

---

## ✨ Features

### Core Features

#### 🎛️ Real-Time Energy Monitoring

- **Total Energy Widget**: Track consumption across Lighting, Refrigerator, and Air Conditioner
- **Live Data Updates**: Real-time metrics with trend indicators (↑/↓)
- **Visual Bar Charts**: Historical consumption patterns at a glance
- **Energy Ranges**: Min-max kWh tracking per month per device

#### 🏢 3D Green Energy Visualization

- **Isometric Building Model**: Interactive 3D office/building visualization using Three.js
- **Dark Green Aesthetic**: Wireframe design with glowing edges and transparent surfaces
- **Connection Status**: Toggle switches for green energy source management
- **Available Energy**: Real-time percentage indicators (e.g., 83%)

#### 📊 Detailed Reporting

- **Weekly/Monthly Reports**: Energy consumption graphs with day-by-day breakdown
- **Interactive Charts**: Built with Recharts for smooth, responsive visualizations
- **Highlighted Current Day**: Easy identification of today's usage
- **Export Capabilities**: (Coming Soon) Download reports as PDF/CSV

#### 💚 Green Energy Usage Tracking

- **Percentage Display**: Large, clear green energy usage metrics (e.g., 47%)
- **Hourly Timeline**: Visual timeline showing active/inactive hours (11AM - 3PM)
- **Time-Based Analysis**: Track when green energy is being utilized most

#### ☀️ Solar Energy Forecasting

- **Tomorrow's Forecast**: Predictive solar energy generation (e.g., 5.7 kWh)
- **Clean Minimalist Design**: Easy-to-read tracking widget
- **Daily Updates**: Fresh forecasts for better planning

#### 🤖 AI-Driven Recommendations

- **Personalized Tips**: Smart suggestions for optimizing energy consumption
- **Categorized Advice**: Today's recommendations, lighting optimization, cost savings
- **Time Estimates**: Quick wins (5 min) vs. longer tasks (15 min)
- **Priority Levels**: High, medium, low priority indicators

#### 🧭 Navigation & UI

- **Responsive Header**: Dashboard, My Apartments, Reporting, Settings
- **User Account Management**: Profile dropdown with user information
- **Mobile-Optimized**: Hamburger menu for smaller screens
- **Widget-Based Layout**: Modular, rearrangeable design system

---

## 🛠️ Tech Stack

### Frontend

| Technology            | Version | Purpose                     |
| --------------------- | ------- | --------------------------- |
| **React**             | 19.2.0  | UI framework                |
| **TypeScript**        | 5.9.3   | Type safety                 |
| **Vite**              | 7.2.4   | Build tool & dev server     |
| **Tailwind CSS**      | 3.4.19  | Utility-first styling       |
| **React Router**      | 7.13.0  | Client-side routing         |
| **Zustand**           | 5.0.10  | State management            |
| **Recharts**          | 3.7.0   | Data visualization          |
| **Three.js**          | 0.182.0 | 3D graphics                 |
| **React Three Fiber** | 9.5.0   | React renderer for Three.js |
| **Framer Motion**     | 12.29.2 | Animations                  |
| **Lucide React**      | 0.563.0 | Icon library                |
| **date-fns**          | 4.1.0   | Date utilities              |

### Backend

| Technology     | Version | Purpose               |
| -------------- | ------- | --------------------- |
| **Node.js**    | 20 LTS  | Runtime environment   |
| **Express.js** | 5.2.1   | Web framework         |
| **TypeScript** | 5.9.3   | Type safety           |
| **CORS**       | 2.8.6   | Cross-origin requests |
| **dotenv**     | 17.2.3  | Environment variables |

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting (via ESLint)
- **Nodemon**: Auto-restart dev server
- **ts-node**: TypeScript execution

---

## 📁 Project Structure

```
ECO-DASH/
├── frontend/                 # React + TypeScript frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── api/            # API client services
│   │   ├── assets/         # Images, icons
│   │   ├── components/     # React components
│   │   │   ├── layout/    # DashboardLayout, Header
│   │   │   ├── ui/        # Button, Card, ToastProvider
│   │   │   └── widgets/   # Dashboard widgets
│   │   │       ├── Building3D.tsx
│   │   │       ├── DetailedReportWidget.tsx
│   │   │       ├── GreenConnectionsWidget.tsx
│   │   │       ├── GreenEnergyUsageWidget.tsx
│   │   │       ├── RecommendationsWidget.tsx
│   │   │       ├── TotalEnergyWidget.tsx
│   │   │       └── TrackingWidget.tsx
│   │   ├── pages/          # Dashboard page
│   │   ├── store/          # Zustand state management
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                  # Express + TypeScript backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   ├── deviceController.ts
│   │   │   ├── energyController.ts
│   │   │   └── recommendationController.ts
│   │   ├── routes/          # API routes
│   │   │   ├── deviceRoutes.ts
│   │   │   ├── energyRoutes.ts
│   │   │   └── recommendationRoutes.ts
│   │   ├── data/            # Mock data (for development)
│   │   │   └── mockData.ts
│   │   ├── app.ts           # Express app setup
│   │   ├── server.ts        # Server entry point
│   │   └── index.ts         # For Vercel deployment
│   ├── package.json
│   └── tsconfig.json
│
├── Blueprints/               # Project documentation
│   ├── PRD.md               # Product Requirements Document
│   ├── Frontend.md          # Frontend specifications
│   ├── Backend.md           # Backend specifications
│   └── Tech.md              # Technical architecture
│
├── vercel.json              # Vercel deployment config
├── .gitignore
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20 LTS or higher
- **npm**: v10+ or **yarn**: v1.22+
- **Git**: Latest version

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Mrkarfa/ECO-DASH.git
cd ECO-DASH
```

2. **Install frontend dependencies**

```bash
cd frontend
npm install
```

3. **Install backend dependencies**

```bash
cd ../backend
npm install
```

### Development

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend API will start on `http://localhost:5000`

#### Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

Open [http://localhost:5173](http://localhost:5173) in your browser to view the dashboard.

### Building for Production

#### Build Frontend

```bash
cd frontend
npm run build
```

The production build will be created in `frontend/dist/`

#### Build Backend

```bash
cd backend
npm run build
```

The compiled JavaScript will be in `backend/dist/`

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Endpoints

#### Energy Data

**GET** `/api/energy/total`

Get total energy consumption data for all devices.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "name": "Lighting",
      "min": 52,
      "max": 71,
      "current": 62,
      "trend": "up",
      "data": [40, 50, 60, 55, 70, 62, 65]
    },
    {
      "name": "Refrigerator",
      "min": 29,
      "max": 37,
      "current": 33,
      "trend": "down",
      "data": [35, 33, 32, 30, 31, 33, 29]
    },
    {
      "name": "Air Conditioner",
      "min": 49,
      "max": 85,
      "current": 67,
      "trend": "down",
      "data": [80, 75, 70, 65, 68, 67, 60]
    }
  ]
}
```

---

**GET** `/api/energy/weekly-report`

Get weekly energy consumption report.

**Response:**

```json
{
  "success": true,
  "data": [
    { "day": "Mon", "kwh": 276 },
    { "day": "Tue", "kwh": 282 },
    { "day": "Wed", "kwh": 297 },
    { "day": "Thu", "kwh": 269 },
    { "day": "Fri", "kwh": 274, "current": true },
    { "day": "Sat", "kwh": 175 },
    { "day": "Sun", "kwh": 138 }
  ]
}
```

---

**GET** `/api/energy/green-hourly`

Get hourly green energy usage data.

**Response:**

```json
{
  "success": true,
  "data": [
    { "hour": "11:00", "active": true },
    { "hour": "12:00", "active": true },
    { "hour": "13:00", "active": true, "current": true },
    { "hour": "14:00", "active": false },
    { "hour": "15:00", "active": false }
  ]
}
```

---

#### Devices

**GET** `/api/devices/building`

Get building sensor data.

**Response:**

```json
{
  "success": true,
  "data": {
    "internalTemp": 22,
    "externalTemp": 18,
    "humidity": 45,
    "zones": [
      { "id": 1, "name": "Living Room", "active": true },
      { "id": 2, "name": "Kitchen", "active": true },
      { "id": 3, "name": "Bedroom", "active": false }
    ]
  }
}
```

---

**GET** `/api/devices/tracking`

Get solar energy tracking data.

**Response:**

```json
{
  "success": true,
  "data": {
    "solarForecast": 5.7,
    "unit": "kWh"
  }
}
```

---

#### Recommendations

**GET** `/api/recommendations`

Get personalized energy-saving recommendations.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Change the air conditioner mode to energy saving",
      "category": "Today recommendation",
      "time": "5 min",
      "type": "Analysis",
      "priority": "high"
    },
    {
      "id": 2,
      "title": "Switch to LED bulbs in living room",
      "category": "Lighting optimization",
      "time": "15 min",
      "type": "Saving",
      "priority": "medium"
    }
  ]
}
```

---

## 🌐 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment with the included `vercel.json` configuration.

#### Deploy with Vercel CLI

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Production Deployment**

```bash
vercel --prod
```

#### Deploy via GitHub

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect the configuration
4. Click "Deploy"

### Manual Deployment

#### Frontend (Static Hosting)

Deploy the `frontend/dist` folder to:

- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages

#### Backend (Node.js Hosting)

Deploy the backend to:

- Heroku
- Railway
- Render
- AWS EC2/ECS
- Google Cloud Run

### Environment Variables

Create `.env` files for both frontend and backend:

**Backend `.env`:**

```env
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend `.env`:**

```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 📸 Screenshots

### Dashboard Overview

_Main dashboard with all widgets displaying real-time energy data, green connections, and recommendations._

### 3D Green Energy Visualization

_Interactive 3D isometric building model showing green energy connections with dark green wireframe aesthetic._

### Detailed Weekly Report

_Bar chart visualization showing daily energy consumption throughout the week with highlighted current day._

### Recommendations Widget

_AI-driven personalized recommendations with categories, time estimates, and priority levels._

---

## 🎨 Design Philosophy

### Color Palette

```css
/* Dark Theme */
--background-dark: #0a0a0a; /* Main background */
--background-dark-secondary: #1a1a1a; /* Card backgrounds */

/* Light Widgets */
--background-light: #e8e5d9; /* Light widget background */
--background-light-secondary: #f5f3ed;

/* Green Energy Theme */
--green-primary: #2d4a3e; /* 3D visualization */
--green-secondary: #3d5f4e;
--green-accent: #4a6f5f;
```

### Typography

- **Font Family**: System fonts (Apple, Segoe UI, Roboto)
- **Font Sizes**: 12px - 72px responsive scale
- **Font Weights**: 300 (Light) - 700 (Bold)

### Spacing System

- Base: 8px grid system
- Component Padding: 24px
- Widget Gap: 20px

---

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm run test
```

### Backend Tests

```bash
cd backend
npm run test
```

### E2E Tests (Coming Soon)

Integration with Playwright or Cypress for end-to-end testing.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic

---

## 📝 Roadmap

- [x] Real-time energy monitoring dashboard
- [x] 3D green energy visualization
- [x] Responsive design for all devices
- [x] RESTful API with Express
- [ ] User authentication & authorization
- [ ] Multi-property support
- [ ] Database integration (PostgreSQL + TimescaleDB)
- [ ] WebSocket real-time updates
- [ ] Mobile apps (iOS & Android)
- [ ] Machine learning recommendations
- [ ] Smart home device integration
- [ ] Export reports (PDF/CSV)
- [ ] Custom alerts & notifications

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Karfa** - _Initial work_ - [@Mrkarfa](https://github.com/Mrkarfa)

---

## 🙏 Acknowledgments

- Design inspiration from modern energy management platforms
- Three.js community for 3D visualization resources
- React and TypeScript communities
- All contributors and supporters

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Mrkarfa/ECO-DASH/issues)
- **Discussions**: [Join the conversation](https://github.com/Mrkarfa/ECO-DASH/discussions)

---

<p align="center">
  Made with ❤️ and ⚡ for a greener future
</p>

<p align="center">
  <a href="#eco-dash-">Back to Top ↑</a>
</p>
