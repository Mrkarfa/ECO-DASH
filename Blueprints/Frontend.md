# Frontend Development Specification
# Energy Monitoring Dashboard

**Version:** 1.0  
**Date:** January 30, 2026  
**Document Type:** Frontend Implementation Guide  
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#1-overview)
2. [Design System](#2-design-system)
3. [Layout Architecture](#3-layout-architecture)
4. [Component Specifications](#4-component-specifications)
5. [Responsive Design](#5-responsive-design)
6. [Animations and Interactions](#6-animations-and-interactions)
7. [Data Visualization](#7-data-visualization)
8. [State Management](#8-state-management)
9. [Performance Optimization](#9-performance-optimization)
10. [Accessibility](#10-accessibility)
11. [Implementation Guidelines](#11-implementation-guidelines)
12. [Code Structure](#12-code-structure)

---

## 1. Overview

### 1.1 Technology Stack

**Core Framework:**
- React 18.2+ with TypeScript
- Vite or Next.js 14+ for build tooling

**Styling:**
- CSS Modules or Styled Components
- Tailwind CSS (optional, for utility classes)
- CSS Variables for theming

**3D Visualization:**
- Three.js (r160+)
- React Three Fiber (optional wrapper)

**State Management:**
- React Query for server state
- Zustand or Redux Toolkit for client state
- Context API for theme and user preferences

**Data Visualization:**
- Recharts or D3.js for charts
- Custom SVG for timeline visualizations

**Additional Libraries:**
- date-fns or dayjs for date handling
- Framer Motion for animations
- React Router for navigation

### 1.2 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Android 90+

### 1.3 Performance Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- 60 FPS animations
- < 200ms interaction response time

---

## 2. Design System

### 2.1 Color Palette

```css
/* CSS Variables - Define in :root */

/* Background Colors */
--bg-primary: #0A0F0D;           /* Main dark background */
--bg-secondary: #1A1F1D;         /* Secondary dark background */
--bg-tertiary: #151A18;          /* Card backgrounds */
--bg-widget-dark: #0D1411;       /* Dark widget background */
--bg-widget-light: #E8E5D8;      /* Light/cream widget background */
--bg-hover: rgba(255, 255, 255, 0.05); /* Hover state */

/* Green Energy Theme Colors */
--green-primary: #2D4A3E;        /* Primary green */
--green-secondary: #3D5F4E;      /* Secondary green */
--green-accent: #4A7A5F;         /* Accent green */
--green-light: rgba(77, 122, 95, 0.2); /* Light green overlay */
--green-glow: rgba(77, 122, 95, 0.4);  /* Glow effect */

/* Text Colors */
--text-primary: #FFFFFF;         /* Primary white text */
--text-secondary: #A8B0AC;       /* Secondary gray text */
--text-tertiary: #6B7470;        /* Tertiary gray text */
--text-label: #505854;           /* Label text */
--text-dark: #0A0F0D;            /* Dark text for light backgrounds */

/* Accent Colors */
--accent-blue: #3B82F6;          /* Info/links */
--accent-success: #10B981;       /* Success states */
--accent-warning: #F59E0B;       /* Warning states */
--accent-error: #EF4444;         /* Error states */

/* Chart Colors */
--chart-bar-fill: #FFFFFF;       /* White bars */
--chart-bar-empty: #2A2F2D;      /* Empty bar state */
--chart-grid: rgba(255, 255, 255, 0.05); /* Grid lines */
--chart-highlight: #4A7A5F;      /* Highlighted elements */

/* Border and Divider Colors */
--border-primary: rgba(255, 255, 255, 0.1);
--border-secondary: rgba(255, 255, 255, 0.05);
--divider: rgba(255, 255, 255, 0.08);

/* Elevation/Shadow */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-widget: 0 2px 8px rgba(0, 0, 0, 0.2);
```

### 2.2 Typography

```css
/* Font Families */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Inter', sans-serif;
--font-mono: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;

/* Font Sizes */
--font-size-xs: 0.75rem;        /* 12px */
--font-size-sm: 0.875rem;       /* 14px */
--font-size-base: 1rem;         /* 16px */
--font-size-lg: 1.125rem;       /* 18px */
--font-size-xl: 1.25rem;        /* 20px */
--font-size-2xl: 1.5rem;        /* 24px */
--font-size-3xl: 1.875rem;      /* 30px */
--font-size-4xl: 2.25rem;       /* 36px */
--font-size-5xl: 3rem;          /* 48px */
--font-size-6xl: 3.75rem;       /* 60px */

/* Font Weights */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;

/* Letter Spacing */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.02em;
```

### 2.3 Typography Scale

```typescript
// Typography Styles

interface TypographyStyle {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing?: string;
}

const typography = {
  // Display
  display1: {
    fontSize: 'var(--font-size-6xl)',
    fontWeight: 'var(--font-weight-bold)',
    lineHeight: 'var(--line-height-tight)',
    letterSpacing: 'var(--letter-spacing-tight)',
  },
  
  // Headings
  h1: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--line-height-tight)',
  },
  h2: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--line-height-tight)',
  },
  h3: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--line-height-normal)',
  },
  h4: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-normal)',
  },
  
  // Body
  bodyLarge: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-relaxed)',
  },
  body: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-normal)',
  },
  bodySmall: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-normal)',
  },
  
  // Labels and Captions
  label: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-normal)',
    letterSpacing: 'var(--letter-spacing-wide)',
  },
  caption: {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-normal)',
  },
  
  // Specialized
  stat: {
    fontSize: 'var(--font-size-5xl)',
    fontWeight: 'var(--font-weight-bold)',
    lineHeight: 'var(--line-height-tight)',
    letterSpacing: 'var(--letter-spacing-tight)',
  },
  statUnit: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-tight)',
  },
};
```

### 2.4 Spacing System

```css
/* Spacing Scale (4px base) */
--spacing-0: 0;
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-3: 0.75rem;    /* 12px */
--spacing-4: 1rem;       /* 16px */
--spacing-5: 1.25rem;    /* 20px */
--spacing-6: 1.5rem;     /* 24px */
--spacing-8: 2rem;       /* 32px */
--spacing-10: 2.5rem;    /* 40px */
--spacing-12: 3rem;      /* 48px */
--spacing-16: 4rem;      /* 64px */
--spacing-20: 5rem;      /* 80px */
--spacing-24: 6rem;      /* 96px */

/* Component Spacing */
--widget-padding: var(--spacing-6);
--widget-gap: var(--spacing-4);
--section-gap: var(--spacing-8);
--page-padding: var(--spacing-6);
--mobile-page-padding: var(--spacing-4);
```

### 2.5 Border Radius

```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Fully rounded */

/* Component Specific */
--widget-radius: var(--radius-xl);
--button-radius: var(--radius-md);
--card-radius: var(--radius-lg);
```

### 2.6 Transitions

```css
/* Timing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Duration */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;

/* Standard Transitions */
--transition-base: all var(--duration-normal) var(--ease-in-out);
--transition-colors: color var(--duration-fast) var(--ease-in-out),
                     background-color var(--duration-fast) var(--ease-in-out),
                     border-color var(--duration-fast) var(--ease-in-out);
--transition-transform: transform var(--duration-normal) var(--ease-out);
--transition-opacity: opacity var(--duration-fast) var(--ease-in-out);
```

---

## 3. Layout Architecture

### 3.1 Grid System

**Desktop Layout (1440px+ viewport):**
```css
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-6);
  padding: var(--page-padding);
  max-width: 1920px;
  margin: 0 auto;
}

/* Widget Spans */
.widget-full {
  grid-column: span 12;
}

.widget-half {
  grid-column: span 6;
}

.widget-third {
  grid-column: span 4;
}

.widget-two-thirds {
  grid-column: span 8;
}
```

**Desktop Dashboard Layout Specification:**
```
Row 1: Header (Full width, 12 columns)
├── Logo + Navigation (8 columns)
└── User Account (4 columns)

Row 2: Main Content
├── Total Energy Consumption (6 columns)
├── Green Connections (3 columns)
└── Recommendations (3 columns)

Row 3: Secondary Content
├── Tracking (3 columns)
├── Detailed Report (6 columns)
└── Green Energy Usage (3 columns)
```

**Tablet Layout (768px - 1439px):**
```css
.dashboard-container {
  grid-template-columns: repeat(8, 1fr);
  gap: var(--spacing-4);
}

/* Adjust widget spans */
.widget-full {
  grid-column: span 8;
}

.widget-half {
  grid-column: span 4;
}
```

**Mobile Layout (< 768px):**
```css
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--mobile-page-padding);
}

/* All widgets full width */
.widget {
  width: 100%;
}
```

### 3.2 Header Layout

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) var(--spacing-6);
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-primary);
  height: 64px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.logo {
  width: 32px;
  height: 32px;
  /* Logo SVG or image */
}

.nav {
  display: flex;
  gap: var(--spacing-6);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}
```

### 3.3 Widget Container Structure

```typescript
interface WidgetProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  menu?: boolean;
  className?: string;
  backgroundColor?: 'dark' | 'light';
  children: React.ReactNode;
}

// Widget Base Structure
<div className="widget">
  <div className="widget-header">
    <div className="widget-title-section">
      <h3 className="widget-title">{title}</h3>
      {subtitle && <p className="widget-subtitle">{subtitle}</p>}
    </div>
    <div className="widget-actions">
      {action}
      {menu && <MenuButton />}
    </div>
  </div>
  <div className="widget-content">
    {children}
  </div>
</div>
```

```css
.widget {
  background: var(--bg-tertiary);
  border-radius: var(--widget-radius);
  padding: var(--widget-padding);
  box-shadow: var(--shadow-widget);
  transition: var(--transition-base);
}

.widget.light {
  background: var(--bg-widget-light);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-4);
}

.widget-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.widget.light .widget-title {
  color: var(--text-dark);
}

.widget-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: var(--spacing-1) 0 0 0;
}

.widget-content {
  position: relative;
}
```

---

## 4. Component Specifications

### 4.1 Navigation Component

```typescript
// Navigation.tsx
interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface NavigationProps {
  items: NavItem[];
  activePath: string;
}

const navigationItems: NavItem[] = [
  { label: 'Dashboard', path: '/' },
  { label: 'My apartments', path: '/apartments' },
  { label: 'Reporting', path: '/reporting' },
  { label: 'Settings', path: '/settings' },
];
```

```css
.nav-item {
  position: relative;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-colors);
  cursor: pointer;
}

.nav-item:hover {
  color: var(--text-primary);
}

.nav-item.active {
  color: var(--text-primary);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -var(--spacing-2);
  left: 0;
  right: 0;
  height: 2px;
  background: var(--text-primary);
  border-radius: var(--radius-full);
}
```

### 4.2 Total Energy Consumption Widget

**Component Structure:**
```typescript
interface EnergyData {
  category: string;
  minValue: number;
  maxValue: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  chartData: number[];
}

interface TotalEnergyConsumptionProps {
  data: EnergyData[];
  onChangeModule: () => void;
}
```

**Layout:**
```css
.energy-consumption-widget {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

.energy-category {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.energy-category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.energy-category-title {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.trend-icon {
  width: 16px;
  height: 16px;
}

.energy-value {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}

.energy-unit {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-1);
}

.energy-chart-container {
  height: 80px;
  margin-top: var(--spacing-2);
}
```

**Energy Bar Chart:**
```typescript
interface EnergyBarChartProps {
  data: number[];
  maxValue: number;
  barColor?: string;
}

// Chart renders vertical bars with varying heights
// Bars should be white (#FFFFFF)
// Background bars (when no data) should be dark (#2A2F2D)
// Each bar has a small gap (2-3px)
// Total width should be responsive
```

```css
.energy-bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 100%;
  width: 100%;
}

.energy-bar {
  flex: 1;
  background: var(--chart-bar-fill);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  transition: height var(--duration-normal) var(--ease-out);
  min-height: 2px;
}

.energy-bar.empty {
  background: var(--chart-bar-empty);
  opacity: 0.3;
}
```

**Change Module Button:**
```css
.change-module-btn {
  padding: var(--spacing-2) var(--spacing-4);
  background: transparent;
  border: 1px solid var(--border-primary);
  border-radius: var(--button-radius);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-colors);
}

.change-module-btn:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
  background: var(--bg-hover);
}
```

### 4.3 Green Connections Widget

**Component Structure:**
```typescript
interface GreenConnection {
  id: string;
  name: string;
  connected: boolean;
  availableEnergy: number; // percentage
  totalEnergy: string; // e.g., "327-519 kWh per month"
}

interface GreenConnectionsProps {
  connection: GreenConnection;
  onToggle: (id: string) => void;
}
```

**3D Visualization Specifications:**
```typescript
// Three.js Setup
import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = null; // Transparent

// Camera - Isometric view
const camera = new THREE.OrthographicCamera(
  -5, 5, 5, -5, 0.1, 1000
);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// Lighting
const ambientLight = new THREE.AmbientLight(0x3D5F4E, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x4A7A5F, 0.8);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Building Geometry
const buildingGeometry = new THREE.BoxGeometry(4, 2, 3);
const buildingMaterial = new THREE.MeshBasicMaterial({
  color: 0x2D4A3E,
  wireframe: true,
  transparent: true,
  opacity: 0.6,
});

// Grid pattern on surfaces
const gridMaterial = new THREE.MeshBasicMaterial({
  color: 0x3D5F4E,
  transparent: true,
  opacity: 0.3,
  side: THREE.DoubleSide,
});

// Dashed border outline
const edges = new THREE.EdgesGeometry(buildingGeometry);
const lineMaterial = new THREE.LineDashedMaterial({
  color: 0x4A7A5F,
  dashSize: 0.1,
  gapSize: 0.05,
  linewidth: 1,
});
const borderLine = new THREE.LineSegments(edges, lineMaterial);
borderLine.computeLineDistances();

// Glow effect
const glowGeometry = new THREE.BoxGeometry(4.1, 2.1, 3.1);
const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0x4A7A5F,
  transparent: true,
  opacity: 0.1,
  side: THREE.BackSide,
});
```

**CSS Styling:**
```css
.green-connections-widget {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.connection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.connection-toggle {
  /* Custom toggle switch */
  width: 44px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--bg-secondary);
  position: relative;
  cursor: pointer;
  transition: background var(--duration-normal);
}

.connection-toggle.active {
  background: var(--green-accent);
}

.connection-toggle-knob {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: white;
  top: 2px;
  left: 2px;
  transition: transform var(--duration-normal) var(--ease-out);
}

.connection-toggle.active .connection-toggle-knob {
  transform: translateX(20px);
}

.visualization-container {
  width: 100%;
  height: 280px;
  position: relative;
  border: 1px dashed var(--green-accent);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: rgba(45, 74, 62, 0.1);
}

.available-energy-section {
  margin-top: var(--spacing-4);
}

.available-energy-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2);
}

.energy-progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.energy-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green-primary), var(--green-accent));
  border-radius: var(--radius-full);
  transition: width var(--duration-slow) var(--ease-out);
}

.energy-percentage {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-top: var(--spacing-2);
}
```

### 4.4 Recommendations Widget

```typescript
interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'analysis' | 'alert';
  timeEstimate?: string;
  icon?: string;
}

interface RecommendationsProps {
  recommendations: Recommendation[];
}
```

```css
.recommendations-widget {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.recommendation-card {
  padding: var(--spacing-4);
  background: var(--bg-widget-light);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  transition: var(--transition-base);
  cursor: pointer;
}

.recommendation-card:hover {
  border-color: var(--green-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.recommendation-header {
  font-size: var(--font-size-sm);
  color: var(--text-dark);
  opacity: 0.7;
  margin-bottom: var(--spacing-2);
}

.recommendation-content {
  font-size: var(--font-size-base);
  color: var(--text-dark);
  line-height: var(--line-height-normal);
}

.recommendation-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-3);
}

.recommendation-type {
  display: inline-flex;
  padding: var(--spacing-1) var(--spacing-2);
  background: rgba(45, 74, 62, 0.1);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: var(--green-primary);
  font-weight: var(--font-weight-medium);
}

.recommendation-time {
  font-size: var(--font-size-xs);
  color: var(--text-dark);
  opacity: 0.6;
}
```

### 4.5 Tracking Widget (Solar Energy)

```css
.tracking-widget {
  background: var(--bg-widget-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.tracking-label {
  font-size: var(--font-size-sm);
  color: var(--text-dark);
  opacity: 0.7;
  margin-bottom: var(--spacing-3);
}

.tracking-value {
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-dark);
  line-height: 1;
}

.tracking-unit {
  font-size: var(--font-size-xl);
  color: var(--text-dark);
  opacity: 0.7;
  margin-top: var(--spacing-2);
}
```

### 4.6 Detailed Report Widget

```typescript
interface DailyEnergyData {
  day: string;
  value: number;
  label: string; // "Mon", "Tue", etc.
}

interface DetailedReportProps {
  data: DailyEnergyData[];
  period: 'week' | 'month';
  onPeriodChange: (period: 'week' | 'month') => void;
}
```

```css
.detailed-report-chart {
  height: 200px;
  margin-top: var(--spacing-4);
}

.chart-bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.chart-bar-wrapper {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 var(--spacing-1);
}

.chart-bar {
  width: 100%;
  max-width: 40px;
  background: white;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
}

.chart-bar.highlighted {
  background: var(--text-primary);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

.chart-bar-value {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-1);
  white-space: nowrap;
}

.chart-bar-label {
  margin-top: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  text-align: center;
}

.period-selector {
  display: inline-flex;
  padding: var(--spacing-1);
  background: var(--bg-secondary);
  border-radius: var(--button-radius);
}

.period-option {
  padding: var(--spacing-1) var(--spacing-3);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  border-radius: var(--button-radius);
  transition: var(--transition-colors);
}

.period-option.active {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
```

### 4.7 Green Energy Usage Widget

```typescript
interface HourlyUsage {
  hour: number;
  active: boolean;
  percentage?: number;
}

interface GreenEnergyUsageProps {
  percentage: number;
  timeRange: {
    start: number; // hour
    end: number; // hour
  };
  hourlyData: HourlyUsage[];
  onChangeRange: () => void;
}
```

```css
.green-energy-usage-widget {
  background: var(--bg-widget-light);
}

.usage-percentage {
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-dark);
  line-height: 1;
  margin: var(--spacing-4) 0;
}

.usage-time-range {
  font-size: var(--font-size-sm);
  color: var(--text-dark);
  opacity: 0.6;
  margin-bottom: var(--spacing-6);
}

.hourly-timeline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-6);
  position: relative;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(45, 74, 62, 0.2);
  transform: translateY(-50%);
  z-index: 0;
}

.timeline-hour {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
  position: relative;
  z-index: 1;
}

.timeline-circle {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  border: 2px solid var(--text-dark);
  background: transparent;
  transition: var(--transition-base);
}

.timeline-circle.active {
  background: var(--text-dark);
}

.timeline-circle.current {
  width: 20px;
  height: 20px;
  background: var(--text-dark);
  box-shadow: 0 0 12px rgba(10, 15, 13, 0.5);
}

.timeline-label {
  font-size: var(--font-size-xs);
  color: var(--text-dark);
  opacity: 0.6;
  font-weight: var(--font-weight-medium);
}
```

### 4.8 Menu Button (Three Dots)

```css
.menu-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-colors);
}

.menu-button:hover {
  background: var(--bg-hover);
}

.menu-dots {
  display: flex;
  gap: 3px;
}

.menu-dot {
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--text-secondary);
}

.widget.light .menu-dot {
  background: var(--text-dark);
}

/* Dropdown Menu */
.menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-2);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  min-width: 180px;
  padding: var(--spacing-2);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
}

.menu-item {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: var(--transition-colors);
}

.menu-item:hover {
  background: var(--bg-hover);
}
```

### 4.9 Mobile Navigation

```css
.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background: var(--bg-tertiary);
}

.menu-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.hamburger-icon {
  width: 20px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: var(--radius-full);
  transition: var(--transition-transform);
}

/* Mobile Menu Drawer */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100vh;
  background: var(--bg-secondary);
  transition: right var(--duration-normal) var(--ease-out);
  z-index: 2000;
  padding: var(--spacing-6);
  overflow-y: auto;
}

.mobile-menu.open {
  right: 0;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-normal);
  z-index: 1999;
}

.mobile-menu-overlay.visible {
  opacity: 1;
  pointer-events: all;
}
```

---

## 5. Responsive Design

### 5.1 Breakpoints

```css
/* Mobile First Approach */

/* Extra Small devices (phones, 0-575px) */
@media (max-width: 575px) {
  /* Base styles */
}

/* Small devices (large phones, 576px-767px) */
@media (min-width: 576px) {
  .dashboard-container {
    padding: var(--spacing-5);
  }
}

/* Medium devices (tablets, 768px-991px) */
@media (min-width: 768px) {
  .dashboard-container {
    grid-template-columns: repeat(8, 1fr);
  }
  
  .energy-consumption-widget {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large devices (desktops, 992px-1199px) */
@media (min-width: 992px) {
  .dashboard-container {
    grid-template-columns: repeat(12, 1fr);
  }
  
  .energy-consumption-widget {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Extra large devices (large desktops, 1200px+) */
@media (min-width: 1200px) {
  .dashboard-container {
    max-width: 1440px;
  }
}

/* Ultra wide screens (1920px+) */
@media (min-width: 1920px) {
  .dashboard-container {
    max-width: 1920px;
  }
}
```

### 5.2 Mobile-Specific Adjustments

```css
@media (max-width: 767px) {
  /* Typography scaling */
  :root {
    --font-size-6xl: 2.5rem;
    --font-size-5xl: 2rem;
    --font-size-4xl: 1.75rem;
  }
  
  /* Widget adjustments */
  .widget {
    padding: var(--spacing-4);
  }
  
  .widget-title {
    font-size: var(--font-size-lg);
  }
  
  /* Energy consumption - stack categories */
  .energy-consumption-widget {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  
  /* Green connections - adjust visualization height */
  .visualization-container {
    height: 200px;
  }
  
  /* Recommendations - full width cards */
  .recommendation-card {
    padding: var(--spacing-3);
  }
  
  /* Timeline - show fewer hours */
  .timeline-hour:nth-child(2n) {
    display: none;
  }
}
```

### 5.3 Touch Interactions

```css
/* Increase tap targets for mobile */
@media (max-width: 767px) {
  .menu-button,
  .connection-toggle,
  .nav-item {
    min-width: 44px;
    min-height: 44px;
  }
  
  /* Prevent hover effects on touch devices */
  @media (hover: none) {
    .widget:hover,
    .recommendation-card:hover,
    .menu-button:hover {
      transform: none;
      box-shadow: var(--shadow-widget);
    }
  }
}
```

---

## 6. Animations and Interactions

### 6.1 Page Transitions

```typescript
// Using Framer Motion
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Apply to page wrapper
<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
>
  {children}
</motion.div>
```

### 6.2 Widget Entrance Animations

```typescript
const widgetVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// Apply to widgets
<motion.div
  custom={index}
  variants={widgetVariants}
  initial="hidden"
  animate="visible"
  className="widget"
>
  {content}
</motion.div>
```

### 6.3 Data Visualization Animations

```typescript
// Bar chart animation
const barVariants = {
  hidden: {
    height: 0,
  },
  visible: (height: number) => ({
    height: `${height}%`,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// Number counter animation
const useCountAnimation = (end: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const steps = 60;
    const stepValue = end / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return count;
};
```

### 6.4 Loading States

```css
/* Skeleton loader */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 0%,
    var(--bg-tertiary) 50%,
    var(--bg-secondary) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: var(--radius-md);
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-text {
  height: 1em;
  margin: var(--spacing-2) 0;
}

.skeleton-title {
  height: 1.5em;
  width: 60%;
  margin-bottom: var(--spacing-4);
}

.skeleton-chart {
  height: 200px;
}
```

### 6.5 Micro-interactions

```css
/* Button press effect */
.button:active {
  transform: scale(0.98);
}

/* Toggle switch animation */
.connection-toggle:active .connection-toggle-knob {
  width: 24px;
}

/* Pulse animation for notifications */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.notification-dot {
  animation: pulse 2s ease-in-out infinite;
}

/* Shimmer effect for new data */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.data-update {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(74, 122, 95, 0.2) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1s ease-in-out;
}
```

---

## 7. Data Visualization

### 7.1 Chart Configuration

**Using Recharts:**

```typescript
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  day: string;
  value: number;
  label: string;
}

const CustomBarChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
        />
        <YAxis hide />
        <Tooltip
          cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          contentStyle={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--spacing-2)',
          }}
          labelStyle={{ color: 'var(--text-primary)' }}
        />
        <Bar
          dataKey="value"
          fill="var(--chart-bar-fill)"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
```

**Custom SVG Chart:**

```typescript
interface BarData {
  value: number;
  label: string;
}

const CustomBarChart: React.FC<{ data: BarData[], height: number }> = ({
  data,
  height,
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = 100 / data.length;
  
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${height}`}>
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * (height - 20);
        const x = index * barWidth + barWidth * 0.2;
        const y = height - barHeight - 20;
        
        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width={barWidth * 0.6}
              height={barHeight}
              fill="white"
              rx="2"
              opacity={0}
            >
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="0.4s"
                begin={`${index * 0.05}s`}
                fill="freeze"
              />
              <animate
                attributeName="height"
                from="0"
                to={barHeight}
                dur="0.6s"
                begin={`${index * 0.05}s`}
                fill="freeze"
              />
            </rect>
            <text
              x={x + (barWidth * 0.6) / 2}
              y={height - 5}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="10"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
```

### 7.2 Progress Indicators

```typescript
const CircularProgress: React.FC<{
  percentage: number;
  size?: number;
  strokeWidth?: number;
}> = ({ percentage, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--bg-secondary)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--green-accent)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: 'stroke-dashoffset 0.6s ease-out',
        }}
      />
    </svg>
  );
};
```

---

## 8. State Management

### 8.1 Global State Structure

```typescript
// Using Zustand
interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  
  // Dashboard Data
  energyData: EnergyData[];
  greenConnections: GreenConnection[];
  recommendations: Recommendation[];
  
  // UI State
  activeView: 'desktop' | 'mobile';
  isMobileMenuOpen: boolean;
  selectedTimePeriod: 'week' | 'month';
  
  // Loading States
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User) => void;
  updateEnergyData: (data: EnergyData[]) => void;
  toggleMobileMenu: () => void;
  setTimePeriod: (period: 'week' | 'month') => void;
}

const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  energyData: [],
  greenConnections: [],
  recommendations: [],
  activeView: 'desktop',
  isMobileMenuOpen: false,
  selectedTimePeriod: 'week',
  isLoading: false,
  error: null,
  
  setUser: (user) => set({ user, isAuthenticated: true }),
  updateEnergyData: (data) => set({ energyData: data }),
  toggleMobileMenu: () => set((state) => ({
    isMobileMenuOpen: !state.isMobileMenuOpen
  })),
  setTimePeriod: (period) => set({ selectedTimePeriod: period }),
}));
```

### 8.2 Server State Management

```typescript
// Using React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch energy data
export const useEnergyData = () => {
  return useQuery({
    queryKey: ['energyData'],
    queryFn: fetchEnergyData,
    refetchInterval: 5000, // Real-time updates every 5s
    staleTime: 3000,
  });
};

// Fetch green connections
export const useGreenConnections = () => {
  return useQuery({
    queryKey: ['greenConnections'],
    queryFn: fetchGreenConnections,
    staleTime: 10000,
  });
};

// Toggle connection mutation
export const useToggleConnection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['greenConnections'] });
    },
  });
};
```

### 8.3 Real-time Data Updates

```typescript
// WebSocket connection for real-time updates
import { useEffect } from 'react';

export const useRealtimeEnergyData = () => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/realtime');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'ENERGY_UPDATE') {
        queryClient.setQueryData(['energyData'], data.payload);
      }
    };
    
    return () => ws.close();
  }, [queryClient]);
};
```

---

## 9. Performance Optimization

### 9.1 Code Splitting

```typescript
// Lazy load components
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Apartments = lazy(() => import('./pages/Apartments'));
const Reporting = lazy(() => import('./pages/Reporting'));
const Settings = lazy(() => import('./pages/Settings'));

// Route configuration with code splitting
<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/apartments" element={<Apartments />} />
    <Route path="/reporting" element={<Reporting />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

### 9.2 Image Optimization

```typescript
// Use next/image for Next.js or implement custom lazy loading
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
}> = ({ src, alt, width, height }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
};
```

### 9.3 Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
export const EnergyBarChart = memo(({ data }: { data: number[] }) => {
  const chartData = useMemo(() => {
    return data.map((value, index) => ({
      value,
      index,
      height: (value / Math.max(...data)) * 100,
    }));
  }, [data]);
  
  return (
    <div className="energy-bar-chart">
      {chartData.map((bar) => (
        <div
          key={bar.index}
          className="energy-bar"
          style={{ height: `${bar.height}%` }}
        />
      ))}
    </div>
  );
});

// Memoize callbacks
const useOptimizedCallbacks = () => {
  const handleChartClick = useCallback((index: number) => {
    console.log('Clicked bar:', index);
  }, []);
  
  return { handleChartClick };
};
```

### 9.4 Virtual Scrolling

```typescript
// For long lists (e.g., in reporting section)
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualList: React.FC<{ items: any[] }> = ({ items }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 9.5 Three.js Optimization

```typescript
// Optimize 3D rendering
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Optimized3DBuilding = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use useFrame sparingly
  useFrame(() => {
    if (meshRef.current) {
      // Rotate slowly for subtle animation
      meshRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[4, 2, 3]} />
      <meshBasicMaterial
        color={0x2D4A3E}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Use LOD (Level of Detail)
import { Lod } from '@react-three/drei';

const BuildingWithLOD = () => {
  return (
    <Lod distances={[0, 10, 20]}>
      <HighDetailBuilding />
      <MediumDetailBuilding />
      <LowDetailBuilding />
    </Lod>
  );
};
```

---

## 10. Accessibility

### 10.1 ARIA Labels and Roles

```tsx
// Widget with proper ARIA
<div
  className="widget"
  role="region"
  aria-labelledby="energy-widget-title"
>
  <h3 id="energy-widget-title" className="widget-title">
    Total Energy Consumption
  </h3>
  {/* Widget content */}
</div>

// Toggle switch
<button
  role="switch"
  aria-checked={isConnected}
  aria-label="Toggle green energy connection"
  onClick={handleToggle}
  className="connection-toggle"
>
  <span className="connection-toggle-knob" />
</button>

// Chart with description
<div role="img" aria-label="Energy consumption bar chart showing usage from Monday to Sunday">
  <BarChart data={weeklyData} />
</div>
```

### 10.2 Keyboard Navigation

```typescript
// Focus management
const FocusableWidget: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close modal or menu
      }
      if (e.key === 'Tab') {
        // Trap focus within widget if needed
      }
    };
    
    widgetRef.current?.addEventListener('keydown', handleKeyDown);
    
    return () => {
      widgetRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return <div ref={widgetRef} tabIndex={0} />;
};

// Skip to content link
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

<main id="main-content">
  {/* Dashboard content */}
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-2) var(--spacing-4);
  z-index: 10000;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
```

### 10.3 Color Contrast

```css
/* Ensure WCAG AA compliance (4.5:1 for normal text) */

/* Primary text on dark background */
.text-primary {
  color: #FFFFFF; /* Contrast ratio: 21:1 on #0A0F0D */
}

/* Secondary text on dark background */
.text-secondary {
  color: #A8B0AC; /* Contrast ratio: 7.2:1 on #0A0F0D */
}

/* Dark text on light background */
.widget.light .text-dark {
  color: #0A0F0D; /* Contrast ratio: 17.5:1 on #E8E5D8 */
}

/* Focus indicators */
*:focus-visible {
  outline: 2px solid var(--green-accent);
  outline-offset: 2px;
}
```

### 10.4 Screen Reader Support

```tsx
// Announce dynamic changes
import { useEffect } from 'react';

const LiveRegion: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

// Usage
const EnergyWidget = () => {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (energyData) {
      setMessage(`Energy consumption updated to ${energyData.value} kWh`);
    }
  }, [energyData]);
  
  return (
    <>
      <EnergyChart data={energyData} />
      <LiveRegion message={message} />
    </>
  );
};
```

```css
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 11. Implementation Guidelines

### 11.1 Development Workflow

**1. Setup Phase:**
```bash
# Initialize project
npm create vite@latest energy-dashboard -- --template react-ts

# Install dependencies
npm install react-router-dom @tanstack/react-query zustand
npm install framer-motion recharts three @react-three/fiber
npm install date-fns
npm install -D @types/three

# Setup linting and formatting
npm install -D eslint prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**2. Project Structure:**
```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── MenuButton/
│   │   ├── Toggle/
│   │   └── Loader/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Navigation/
│   │   └── MobileMenu/
│   └── widgets/
│       ├── EnergyConsumption/
│       ├── GreenConnections/
│       ├── Recommendations/
│       ├── Tracking/
│       ├── DetailedReport/
│       └── GreenEnergyUsage/
├── pages/
│   ├── Dashboard/
│   ├── Apartments/
│   ├── Reporting/
│   └── Settings/
├── hooks/
│   ├── useEnergyData.ts
│   ├── useGreenConnections.ts
│   └── useRealtimeUpdates.ts
├── store/
│   └── appStore.ts
├── utils/
│   ├── formatters.ts
│   ├── animations.ts
│   └── constants.ts
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── theme.css
├── types/
│   └── index.ts
└── App.tsx
```

### 11.2 Component Development Pattern

```typescript
// Example: EnergyConsumptionWidget.tsx

import { memo } from 'react';
import { motion } from 'framer-motion';
import { useEnergyData } from '@/hooks/useEnergyData';
import { EnergyBarChart } from './EnergyBarChart';
import { MenuButton } from '@/components/common/MenuButton';
import styles from './EnergyConsumptionWidget.module.css';

interface EnergyConsumptionWidgetProps {
  className?: string;
}

export const EnergyConsumptionWidget = memo<EnergyConsumptionWidgetProps>(
  ({ className }) => {
    const { data, isLoading, error } = useEnergyData();
    
    if (isLoading) return <WidgetSkeleton />;
    if (error) return <ErrorState error={error} />;
    
    return (
      <motion.div
        className={`${styles.widget} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>Total energy consumption</h3>
          </div>
          <div className={styles.actions}>
            <button className={styles.changeBtn}>Change module</button>
            <MenuButton />
          </div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.categories}>
            {data.categories.map((category, index) => (
              <EnergyCategory
                key={category.id}
                data={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
);

EnergyConsumptionWidget.displayName = 'EnergyConsumptionWidget';
```

### 11.3 CSS Modules Pattern

```css
/* EnergyConsumptionWidget.module.css */

.widget {
  background: var(--bg-tertiary);
  border-radius: var(--widget-radius);
  padding: var(--widget-padding);
  box-shadow: var(--shadow-widget);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-4);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.content {
  position: relative;
}

.categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 768px) {
  .categories {
    grid-template-columns: 1fr;
  }
}
```

### 11.4 TypeScript Interfaces

```typescript
// types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface EnergyCategory {
  id: string;
  name: string;
  minValue: number;
  maxValue: number;
  unit: 'kWh' | 'Wh';
  trend: 'up' | 'down' | 'neutral';
  chartData: number[];
}

export interface EnergyData {
  timestamp: string;
  categories: EnergyCategory[];
}

export interface GreenConnection {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'hydro';
  connected: boolean;
  availableEnergy: number;
  totalEnergy: {
    min: number;
    max: number;
    unit: string;
  };
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'analysis' | 'alert';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  estimatedSavings?: {
    value: number;
    unit: string;
  };
}

export interface DailyEnergyReport {
  date: string;
  value: number;
  day: string;
}

export interface WeeklyReport {
  weekNumber: number;
  data: DailyEnergyReport[];
}
```

### 11.5 Testing Strategy

```typescript
// __tests__/EnergyConsumptionWidget.test.tsx

import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EnergyConsumptionWidget } from '../EnergyConsumptionWidget';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('EnergyConsumptionWidget', () => {
  it('renders widget title', () => {
    render(<EnergyConsumptionWidget />, { wrapper });
    expect(screen.getByText('Total energy consumption')).toBeInTheDocument();
  });
  
  it('displays loading state', () => {
    render(<EnergyConsumptionWidget />, { wrapper });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  
  it('renders energy categories', async () => {
    render(<EnergyConsumptionWidget />, { wrapper });
    const categories = await screen.findAllByRole('article');
    expect(categories).toHaveLength(3);
  });
});
```

### 11.6 Error Handling

```typescript
// Error boundary
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-state">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

---

## 12. Code Structure

### 12.1 File Naming Conventions

```
Components: PascalCase
- EnergyConsumptionWidget.tsx
- GreenConnectionsWidget.tsx

Hooks: camelCase with 'use' prefix
- useEnergyData.ts
- useRealtimeUpdates.ts

Utils: camelCase
- formatters.ts
- dateHelpers.ts

Types: index.ts or specific.types.ts
- index.ts
- energy.types.ts

Styles: ComponentName.module.css
- EnergyConsumptionWidget.module.css
```

### 12.2 Import Order

```typescript
// 1. React and core libraries
import { useState, useEffect, memo } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3. Internal components
import { Button } from '@/components/common/Button';
import { MenuButton } from '@/components/common/MenuButton';

// 4. Hooks
import { useEnergyData } from '@/hooks/useEnergyData';

// 5. Utils and helpers
import { formatEnergy } from '@/utils/formatters';

// 6. Types
import type { EnergyData } from '@/types';

// 7. Styles
import styles from './Component.module.css';
```

### 12.3 Environment Variables

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_WS_URL=wss://api.example.com/realtime
VITE_ENABLE_ANALYTICS=true
VITE_3D_QUALITY=high
```

```typescript
// config/env.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  renderQuality: import.meta.env.VITE_3D_QUALITY || 'medium',
} as const;
```

### 12.4 Constants

```typescript
// utils/constants.ts

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1920,
} as const;

export const WIDGET_SIZES = {
  full: 12,
  half: 6,
  third: 4,
  twoThirds: 8,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;

export const REALTIME_UPDATE_INTERVAL = 5000; // 5 seconds

export const CHART_COLORS = {
  primary: '#FFFFFF',
  secondary: '#2A2F2D',
  accent: '#4A7A5F',
} as const;

export const ENERGY_UNITS = {
  kWh: 'kWh',
  Wh: 'Wh',
  MWh: 'MWh',
} as const;
```

### 12.5 Utility Functions

```typescript
// utils/formatters.ts

export const formatEnergy = (
  value: number,
  unit: string = 'kWh',
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)} ${unit}`;
};

export const formatEnergyRange = (
  min: number,
  max: number,
  unit: string = 'kWh'
): string => {
  return `${min}–${max} ${unit}`;
};

export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatDate = (date: Date | string, format: string = 'PPP'): string => {
  return format(new Date(date), format);
};

export const formatTime = (date: Date | string): string => {
  return format(new Date(date), 'h:mm a');
};

// utils/animations.ts

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

---

## Final Notes

### Best Practices Summary:

1. **Performance First:** Always optimize for 60 FPS animations and sub-2s page loads
2. **Accessibility:** Ensure WCAG AA compliance minimum
3. **Responsive Design:** Mobile-first approach with progressive enhancement
4. **Type Safety:** Use TypeScript strictly, avoid 'any' types
5. **Component Isolation:** Keep components pure and reusable
6. **State Management:** Separate server state (React Query) from client state (Zustand)
7. **Testing:** Maintain 80%+ test coverage
8. **Documentation:** Comment complex logic, use JSDoc for public APIs
9. **Error Handling:** Always handle errors gracefully with user-friendly messages
10. **Code Quality:** Use ESLint, Prettier, and pre-commit hooks

### Next Steps:

1. Set up the development environment
2. Implement the design system (CSS variables, typography)
3. Create base layout components (Header, Navigation, Widget container)
4. Build individual widgets following the specifications
5. Integrate API and real-time data
6. Add animations and micro-interactions
7. Optimize performance
8. Conduct accessibility audit
9. Test thoroughly across devices
10. Deploy to production

---

**Document Version:** 1.0  
**Last Updated:** January 30, 2026  
**Maintained By:** Frontend Development Team

*This is a living document. Update as the design system evolves.*
