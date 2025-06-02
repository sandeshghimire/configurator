# SOC Product Configurator

A comprehensive Next.js application for configuring System on Chip (SOC) embedded systems with intelligent recommendations, database persistence, and administrative features.

## 🚀 Features

### Core Functionality
- **Multi-step Configuration Wizard**: Guided process for SOC system configuration
- **Real-time Form Validation**: Zod-based validation with instant feedback
- **Auto-save & Persistence**: Local storage with database backup
- **Configuration Import/Export**: JSON-based configuration management
- **PDF Report Generation**: Professional configuration reports with company branding

### Database & Backend
- **SQLite Database**: Lightweight, file-based database for submissions and analytics
- **REST API Endpoints**: Full CRUD operations for configurations
- **Analytics Tracking**: Popular choices and usage statistics
- **Email Notifications**: Automated notifications for submissions

### User Experience
- **Responsive Design**: Mobile-first design with Shadcn UI components
- **Progress Tracking**: Visual completion indicators and step validation
- **Error Handling**: Comprehensive error boundaries and loading states
- **Admin Dashboard**: Management interface for submissions and analytics

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 with TypeScript
- **UI Components**: Shadcn UI + Radix UI primitives
- **Styling**: Tailwind CSS
- **Database**: SQLite with better-sqlite3
- **Validation**: Zod schemas
- **PDF Generation**: jsPDF + PDF-lib
- **Email**: Nodemailer
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the example environment file and configure your settings:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin settings
ADMIN_EMAIL=admin@your-company.com

# Application settings
NEXT_PUBLIC_APP_NAME=SOC Configurator
NEXT_PUBLIC_COMPANY_NAME=Your Company Name
NEXT_PUBLIC_SUPPORT_EMAIL=support@your-company.com
NEXT_PUBLIC_SUPPORT_PHONE=+1 (555) 123-4567
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` to:

- View all configuration submissions
- Track analytics and popular choices
- Monitor completion rates and trends
- Export submission data

## 🔧 Configuration Steps

The configurator guides users through:

1. Industry Focus
2. Core Platform Selection
3. Operating System Choice
4. Key Application Features
5. Hardware & Peripheral Requirements
6. Middleware & Frameworks
7. Driver Development Needs
8. Cloud & Connectivity Strategy
9. Contact Information
10. Review & Submit

## 📧 Email Notifications

Configure SMTP settings in `.env.local` for automated email notifications when configurations are submitted.

## Build
To build the project:
```bash
npm run build
npm start
```

## License
This project is licensed under the MIT License.
