# Deployment Guide for SOC Configurator

## Production Deployment Checklist

### 1. Environment Configuration
Create a production `.env.local` file with:

```env
# Email Configuration (Required for notifications)
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-production-email@company.com
SMTP_PASS=your-app-password

# Admin Settings
ADMIN_EMAIL=admin@your-company.com

# Application Branding
NEXT_PUBLIC_APP_NAME=SOC Configurator
NEXT_PUBLIC_COMPANY_NAME=Your Company Name
NEXT_PUBLIC_SUPPORT_EMAIL=support@your-company.com
NEXT_PUBLIC_SUPPORT_PHONE=+1 (555) 123-4567

# Security (Add for production)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-long-random-secret-key

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2. Database Setup
The SQLite database will be automatically created in the `data/` directory. Ensure:
- The `data/` directory is writable
- Regular backups are scheduled
- Consider migrating to PostgreSQL for high-traffic deployments

### 3. Build & Deploy

#### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### PM2 Deployment
```bash
# Install PM2
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "soc-configurator" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### 4. Security Considerations

#### HTTPS Configuration
- Ensure SSL/TLS is properly configured
- Redirect HTTP to HTTPS
- Use security headers

#### Environment Variables
- Never commit `.env.local` to version control
- Use secure environment variable management
- Rotate secrets regularly

#### Database Security
- Regular backups to secure location
- File permission restrictions on SQLite file
- Consider encryption at rest for sensitive data

### 5. Performance Optimization

#### Caching
```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300' }
        ]
      }
    ];
  }
};
```

#### Database Indexing
The application includes proper database indexes for:
- Configuration status
- Creation timestamps
- Analytics categories

### 6. Monitoring & Logging

#### Health Checks
The application provides health check endpoints:
- `GET /api/configurations` - Database connectivity
- `GET /api/notifications` - Email service status

#### Error Monitoring
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- New Relic for performance monitoring

### 7. Backup Strategy

#### Database Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp /path/to/data/configurator.db /backup/configurator_$DATE.db

# Keep only last 30 days
find /backup -name "configurator_*.db" -mtime +30 -delete
```

#### Configuration Backups
- Export configurations regularly via admin dashboard
- Store backups in version control or cloud storage

### 8. Load Testing

Test the application under load:
```bash
# Install autocannon
npm install -g autocannon

# Test configuration submission
autocannon -c 10 -d 30s -p POST \
  -H 'Content-Type: application/json' \
  -b '{"industryFocus":"automotive"}' \
  http://localhost:3000/api/configurations
```

### 9. CDN Configuration

For static assets, configure CDN:
- Images: `/public/*`
- JavaScript/CSS: `/_next/static/*`
- Enable gzip/brotli compression

### 10. DNS & Domain Setup

#### DNS Records
```
A     @           your-server-ip
CNAME www         your-domain.com
CNAME admin       your-domain.com
```

#### SSL Certificate
```bash
# Using Certbot for Let's Encrypt
certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 11. Post-Deployment Verification

✅ **Functionality Tests**
- [ ] Complete a full configuration flow
- [ ] Test PDF generation
- [ ] Verify email notifications
- [ ] Check admin dashboard access
- [ ] Test import/export functionality

✅ **Performance Tests**
- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms
- [ ] Database query performance
- [ ] Mobile responsiveness

✅ **Security Tests**
- [ ] HTTPS enforcement
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Input validation

### 12. Maintenance Tasks

#### Weekly
- [ ] Review error logs
- [ ] Check disk space
- [ ] Monitor response times
- [ ] Review security alerts

#### Monthly
- [ ] Update dependencies
- [ ] Database maintenance
- [ ] Performance review
- [ ] Security audit

#### Quarterly
- [ ] Backup restoration test
- [ ] Load testing
- [ ] Security penetration test
- [ ] Business continuity review

## Troubleshooting

### Common Issues

**Database Connection Errors**
```bash
# Check file permissions
ls -la data/configurator.db
# Should be readable/writable by application user
```

**Email Notification Failures**
```bash
# Test SMTP configuration
curl -X GET http://localhost:3000/api/notifications
```

**Build Failures**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Performance Issues**
```bash
# Analyze bundle size
npm run build -- --analyze
```

## Support Contacts

- **Technical Issues**: tech-support@your-company.com
- **Emergency Contact**: +1 (555) 123-4567
- **Documentation**: [Internal Wiki](link-to-docs)

---

Last updated: June 2, 2025
