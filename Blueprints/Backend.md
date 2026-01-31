# Backend Development Specification
# Energy Monitoring Dashboard

**Version:** 1.0  
**Date:** January 30, 2026  
**Document Type:** Backend Implementation Guide  
**Status:** Production Ready

---

## Executive Summary

This Backend Development Specification provides complete implementation guidelines for building a production-ready, scalable backend system for the Energy Monitoring Dashboard. The system supports real-time energy data processing, IoT device integration, user management, analytics, and multi-tenant operations.

### System Capabilities:
- Handle 100,000+ concurrent users
- Process 10,000+ device readings per second
- Real-time data latency < 5 seconds
- 99.9% uptime guarantee
- API response time < 200ms (p95)
- Horizontal scalability
- GDPR & CCPA compliant

---

## 1. Technology Stack Overview

### Backend Framework
- **Primary:** Node.js 20 LTS with TypeScript 5.0+
- **API Framework:** Express.js 4.18+ or Fastify (high-performance endpoints)
- **Alternative:** Python 3.11+ with FastAPI (ML/Analytics services)

### Databases
- **PostgreSQL 15+:** Main application database
- **TimescaleDB 2.11+:** Time-series energy data
- **Redis 7+:** Caching, sessions, rate limiting

### Message Queue
- **RabbitMQ 3.12+:** Event-driven communication
- **Apache Kafka 3.5+:** High-throughput streaming (optional)

### Real-time Communication
- **WebSocket:** ws or Socket.io
- **MQTT:** Mosquitto or HiveMQ for IoT devices

### Storage & Services
- **Object Storage:** AWS S3 or MinIO
- **Email:** SendGrid or AWS SES
- **SMS:** Twilio
- **Push Notifications:** Firebase Cloud Messaging

### Monitoring & Logging
- **Metrics:** Prometheus + Grafana
- **Logging:** Winston + ELK Stack
- **APM:** Sentry or New Relic

---

## 2. Database Architecture

### PostgreSQL Schema (Main Database)

**Core Tables:**
1. users - User accounts and authentication
2. locations - Apartments/buildings/facilities
3. devices - IoT energy monitoring devices
4. green_energy_sources - Solar/wind/hydro installations
5. recommendations - AI-generated energy-saving tips
6. notifications - User notifications
7. api_keys - Third-party API access
8. audit_logs - System activity tracking

### TimescaleDB Schema (Time-Series Data)

**Hypertables:**
1. energy_readings - Device energy consumption data
2. green_energy_generation - Renewable energy production
3. device_status_history - Device online/offline tracking

**Continuous Aggregates:**
- energy_hourly - Hourly aggregated data
- energy_daily - Daily aggregated data
- green_energy_daily - Daily green energy production

### Data Retention Policies
- Raw readings: 90 days
- Hourly aggregates: 1 year
- Daily aggregates: 5 years

---

## 3. API Design Principles

### RESTful API Standards
- **Base URL:** `https://api.energymonitor.com/v1`
- **Versioning:** URL-based (/v1/, /v2/)
- **Authentication:** JWT Bearer tokens
- **Rate Limiting:** 100 requests/minute per user
- **Response Format:** JSON with consistent structure

### Standard Response Format
```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "timestamp": "2026-01-30T10:00:00Z",
    "requestId": "uuid"
  }
}
```

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request / Validation Error
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Rate Limit Exceeded
- 500: Internal Server Error

---

## 4. Core API Endpoints

### Authentication Endpoints
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout
- POST /auth/forgot-password
- POST /auth/reset-password

### User Management
- GET /users/me
- PUT /users/me
- PUT /users/me/password
- GET /users/me/preferences
- PUT /users/me/preferences

### Location Management
- GET /locations
- POST /locations
- GET /locations/:id
- PUT /locations/:id
- DELETE /locations/:id

### Device Management
- GET /locations/:locationId/devices
- POST /locations/:locationId/devices
- GET /devices/:id
- PUT /devices/:id
- DELETE /devices/:id

### Energy Data
- GET /locations/:locationId/energy/consumption
- GET /devices/:deviceId/energy/readings
- POST /devices/:deviceId/energy/readings
- GET /locations/:locationId/energy/comparison

### Green Energy
- GET /locations/:locationId/green-energy/sources
- POST /locations/:locationId/green-energy/sources
- GET /green-energy/sources/:sourceId/generation
- PUT /green-energy/sources/:sourceId/toggle
- GET /locations/:locationId/green-energy/usage

### Analytics & Reports
- GET /analytics/dashboard
- GET /analytics/detailed-report
- GET /analytics/trends
- POST /reports/export

### Recommendations
- GET /recommendations
- GET /recommendations/:id
- PUT /recommendations/:id/status
- POST /recommendations/generate

### Notifications
- GET /notifications
- PUT /notifications/:id/read
- PUT /notifications/read-all
- GET /notifications/preferences
- PUT /notifications/preferences

---

## 5. Authentication & Security

### JWT Token Structure
```typescript
interface JWTPayload {
  sub: string;      // User ID
  email: string;
  role: string;
  iat: number;      // Issued at
  exp: number;      // Expiration
  jti: string;      // JWT ID for revocation
}
```

### Token Configuration
- Access Token: 15 minutes expiry
- Refresh Token: 7 days expiry
- Algorithm: RS256 (asymmetric)
- Token Rotation: On each refresh

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)
- Hashing: bcrypt with 12 salt rounds

### Role-Based Access Control (RBAC)
**Roles:**
- user: Regular users (manage own data)
- facility_manager: Multi-location access
- admin: Full system access

**Permissions:**
- read:own_data
- write:own_data
- manage:locations
- manage:devices
- manage:users (admin only)
- view:all_data (admin/facility_manager)

---

## 6. Real-time Data Processing

### MQTT Integration
**Topics:**
- `devices/{deviceId}/readings` - Energy readings
- `devices/{deviceId}/status` - Device status
- `green-energy/{sourceId}/generation` - Generation data

**QoS Levels:**
- QoS 0: Best effort (status updates)
- QoS 1: At least once (energy readings)
- QoS 2: Exactly once (critical data)

### WebSocket Events
**Client → Server:**
- SUBSCRIBE - Subscribe to location updates
- UNSUBSCRIBE - Unsubscribe from updates
- PING - Keep-alive

**Server → Client:**
- CONNECTION_ACK - Connection established
- ENERGY_UPDATE - Real-time energy data
- DEVICE_STATUS - Device online/offline
- GREEN_ENERGY_UPDATE - Green energy changes
- NEW_RECOMMENDATION - New recommendation available

### Message Queue Architecture
**Queues:**
- energy_processing - Process device readings
- analytics_processing - Run analytics
- notifications - Send notifications
- reports - Generate reports

---

## 7. Business Logic Services

### Energy Analytics Service
**Capabilities:**
- Calculate total consumption by period
- Break down by device category
- Detect consumption anomalies
- Calculate trends and forecasts
- Compare periods (day/week/month/year)

### Recommendation Engine
**Analysis Types:**
- High consumption detection
- Off-peak optimization
- Green energy maximization
- Maintenance recommendations
- Cost-saving opportunities

**Recommendation Categories:**
- energy_saving
- cost_reduction
- maintenance
- optimization

### Cost Calculation Service
**Rate Structure:**
- Peak hours (9 AM - 9 PM): $0.25/kWh
- Off-peak hours: $0.15/kWh
- Weekend rate: $0.12/kWh

**Features:**
- Real-time cost tracking
- Monthly estimates
- Bill projections
- Savings calculations

---

## 8. Integration Services

### Email Service
**Use Cases:**
- Welcome emails
- Password reset
- Energy alerts
- Monthly reports
- Notification digests

**Provider:** SendGrid or AWS SES
**Features:**
- HTML templates
- Attachment support
- Tracking & analytics
- Unsubscribe management

### Push Notification Service
**Provider:** Firebase Cloud Messaging
**Platforms:**
- iOS (APNs)
- Android (FCM)
- Web Push

**Notification Types:**
- Energy alerts
- Device offline warnings
- New recommendations
- Report ready
- System updates

### SMS Service
**Provider:** Twilio
**Use Cases:**
- Verification codes
- Urgent energy alerts
- Critical system notifications

### File Storage Service
**Provider:** AWS S3 or MinIO
**Storage Structure:**
- /reports/{userId}/{timestamp}.pdf
- /avatars/{userId}.jpg
- /exports/{userId}/{reportId}.{format}

**Features:**
- Pre-signed URLs
- Automatic cleanup
- Versioning
- CDN integration

---

## 9. Caching Strategy

### Cache Layers

**L1 - Application Memory:**
- User sessions
- Frequently accessed config
- TTL: 5-10 minutes

**L2 - Redis:**
- API responses
- Database query results
- User data
- Device latest readings
- TTL: 30 seconds - 1 hour

**L3 - CDN:**
- Static assets
- Report files
- Public data

### Cache Keys Structure
```
user:{userId}                    TTL: 1 hour
location:{locationId}            TTL: 30 minutes
device:{deviceId}:latest         TTL: 30 seconds
dashboard:{locationId}           TTL: 1 minute
energy:daily:{locationId}:{date} TTL: 1 hour
recommendations:{locationId}     TTL: 5 minutes
```

### Cache Invalidation
**Events triggering invalidation:**
- User profile update → Invalidate user:{userId}
- Device data update → Invalidate device:{deviceId}:*
- Location change → Invalidate location:{locationId}, dashboard:{locationId}
- New energy reading → Invalidate dashboard:{locationId}, energy:*

---

## 10. Background Jobs

### Scheduled Jobs (Cron)

**Daily Jobs:**
- 6:00 AM - Generate daily recommendations
- 5:00 AM - Generate solar forecasts
- 2:00 AM - Clean up old data
- 11:59 PM - Generate daily reports

**Hourly Jobs:**
- Refresh continuous aggregates
- Update analytics

**Every 5 Minutes:**
- Check device status
- Send pending notifications

**Monthly Jobs:**
- Generate monthly reports
- Archive old data
- Update billing information

### Queue Jobs

**Email Queue:**
- Send welcome emails
- Password reset emails
- Alert notifications
- Monthly reports

**Analytics Queue:**
- Generate recommendations
- Detect anomalies
- Calculate trends
- Update dashboards

**Report Queue:**
- PDF generation
- CSV exports
- Data analysis
- File uploads to S3

---

## 11. Error Handling & Logging

### Error Types
```typescript
AppError              - Base application error
ValidationError       - Input validation failed
UnauthorizedError     - Authentication required
ForbiddenError        - Insufficient permissions
NotFoundError         - Resource not found
ConflictError         - Duplicate resource
RateLimitError        - Too many requests
InternalServerError   - System error
```

### Logging Levels
- **error:** System errors, exceptions
- **warn:** Warnings, deprecated usage
- **info:** General information, requests
- **debug:** Detailed debugging info
- **trace:** Very detailed trace info

### Log Structure
```json
{
  "level": "info",
  "message": "HTTP Request",
  "timestamp": "2026-01-30T10:00:00.000Z",
  "service": "energy-monitor-api",
  "environment": "production",
  "userId": "user-123",
  "method": "GET",
  "url": "/api/v1/dashboard",
  "status": 200,
  "duration": "45ms",
  "ip": "192.168.1.1"
}
```

---

## 12. Performance Optimization

### Database Optimization
- Proper indexing on frequently queried columns
- Composite indexes for multi-column queries
- Partial indexes for filtered data
- Connection pooling (max 20 connections)
- Query result caching
- Batch operations for multiple inserts
- Use EXPLAIN ANALYZE for query optimization

### API Optimization
- Response compression (gzip)
- Pagination for large datasets
- Field filtering (?fields=id,name)
- Rate limiting per endpoint
- CDN for static content
- HTTP/2 support

### Code Optimization
- Async/await for non-blocking operations
- Stream processing for large files
- Lazy loading of modules
- Memory leak prevention
- Connection pooling
- Worker threads for CPU-intensive tasks

### Caching Optimization
- Cache frequently accessed data
- Implement cache warming
- Use Redis pipelining
- Set appropriate TTLs
- Monitor cache hit ratio (target >80%)

---

## 13. Security Measures

### Input Validation
- Joi schema validation
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize inputs)
- CSRF protection
- File upload validation

### Rate Limiting
- Login attempts: 5 per 15 minutes
- API requests: 100 per minute
- Password reset: 3 per hour
- Device registration: 10 per hour

### Security Headers (Helmet.js)
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security
- X-XSS-Protection

### Data Protection
- Encryption at rest (database encryption)
- Encryption in transit (TLS 1.3)
- PII data encryption
- Secure password hashing (bcrypt)
- API key rotation
- Regular security audits

---

## 14. Monitoring & Alerts

### Prometheus Metrics
- http_requests_total
- http_request_duration_seconds
- websocket_active_connections
- energy_readings_processed_total
- db_query_duration_seconds
- cache_hit_ratio
- queue_jobs_pending

### Grafana Dashboards
- **System Overview:** CPU, Memory, Disk usage
- **API Performance:** Request rate, latency, errors
- **Database:** Query performance, connections
- **Real-time:** WebSocket connections, MQTT messages
- **Business:** Active users, devices online, energy processed

### Alerts Configuration
**Critical Alerts:**
- Error rate > 1% for 5 minutes
- Response time p95 > 2s for 10 minutes
- Database down
- Redis down
- Queue backlog > 10,000

**Warning Alerts:**
- CPU > 80% for 15 minutes
- Memory > 85% for 15 minutes
- Disk > 90%
- Cache hit ratio < 70%

---

## 15. Deployment Architecture

### Production Environment

**Load Balancer:**
- NGINX or AWS ALB
- SSL/TLS termination
- Health checks
- Request routing

**Application Servers:**
- 3+ instances (horizontal scaling)
- PM2 or Docker containers
- Auto-scaling based on CPU/Memory
- Blue-green deployment

**Database Cluster:**
- Primary-replica setup
- Automated backups (daily)
- Point-in-time recovery
- Read replicas for analytics

**Caching Layer:**
- Redis cluster (3 nodes)
- Sentinel for high availability
- AOF + RDB persistence

**Message Queue:**
- RabbitMQ cluster
- Mirrored queues
- Persistent messages

---

## 16. CI/CD Pipeline

### GitHub Actions Workflow

**On Pull Request:**
1. Run linters (ESLint, Prettier)
2. Run unit tests
3. Run integration tests
4. Code coverage check (>80%)
5. Security scan

**On Merge to Main:**
1. Run all tests
2. Build Docker image
3. Push to registry
4. Deploy to staging
5. Run smoke tests
6. Manual approval
7. Deploy to production
8. Post-deployment verification

### Deployment Strategy
- **Staging:** Automatic on merge
- **Production:** Manual approval required
- **Rollback:** Automated on health check failure
- **Database Migrations:** Run before deployment
- **Zero Downtime:** Blue-green deployment

---

## 17. Testing Strategy

### Unit Tests
- Service layer logic
- Utility functions
- Data transformations
- Business rule validation
- Target: 80%+ code coverage

### Integration Tests
- API endpoints
- Database operations
- External service integrations
- Authentication flows
- WebSocket connections

### Load Tests
- API endpoints: 1000 req/s
- WebSocket: 10,000 concurrent connections
- Database: 100 concurrent queries
- Queue: 1000 jobs/minute

### Security Tests
- Penetration testing
- Vulnerability scanning
- Dependency audits
- OWASP Top 10 checks

---

## 18. Disaster Recovery

### Backup Strategy
**Database Backups:**
- Full backup: Daily at 2 AM
- Incremental: Every 6 hours
- Retention: 30 days
- Off-site storage: AWS S3

**Application Backups:**
- Configuration files
- Environment variables
- SSL certificates
- Encryption keys

### Recovery Procedures
**RTO (Recovery Time Objective):** 4 hours
**RPO (Recovery Point Objective):** 6 hours

**Recovery Steps:**
1. Identify failure point
2. Switch to backup infrastructure
3. Restore database from backup
4. Verify data integrity
5. Update DNS/load balancer
6. Monitor system health

---

## Documentation Maintenance

This backend specification should be updated:
- After major feature additions
- When technology stack changes
- Following security incidents
- Quarterly reviews
- After performance optimizations

---

**Document Version:** 1.0  
**Created:** January 30, 2026  
**Last Updated:** January 30, 2026  
**Maintained By:** Backend Development Team
**Status:** Production Ready

---

*For detailed code examples, database schemas, API specifications, and implementation guides, refer to the comprehensive technical documentation and PRD.md file.*
