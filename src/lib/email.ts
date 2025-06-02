import nodemailer from 'nodemailer';

export interface EmailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

export interface NotificationData {
    id: string;
    contactInfo: {
        fullName?: string;
        email?: string;
        companyName?: string;
        phoneNumber?: string;
        projectDescription?: string;
    };
    submittedAt: string;
    industry: string;
    platforms: string[];
    features: string[];
}

const defaultEmailConfig: EmailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
    },
};

export class EmailNotificationService {
    private transporter: nodemailer.Transporter;

    constructor(config: EmailConfig = defaultEmailConfig) {
        this.transporter = nodemailer.createTransport(config);
    }

    async sendAdminNotification(data: NotificationData): Promise<boolean> {
        try {
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

            const mailOptions = {
                from: process.env.SMTP_USER,
                to: adminEmail,
                subject: `New SOC Configuration Submission - ${data.contactInfo.companyName || 'Unknown Company'}`,
                html: this.generateAdminEmailTemplate(data),
            };

            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Failed to send admin notification:', error);
            return false;
        }
    }

    async sendUserConfirmation(data: NotificationData): Promise<boolean> {
        try {
            if (!data.contactInfo.email) {
                return false;
            }

            const mailOptions = {
                from: process.env.SMTP_USER,
                to: data.contactInfo.email,
                subject: 'SOC Configuration Submission Received',
                html: this.generateUserConfirmationTemplate(data),
            };

            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Failed to send user confirmation:', error);
            return false;
        }
    }

    private generateAdminEmailTemplate(data: NotificationData): string {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; color: #1e40af; }
          .value { margin-left: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New SOC Configuration Submission</h1>
          <p>Submission ID: ${data.id}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Contact Information</h2>
            <table>
              <tr><th>Name</th><td>${data.contactInfo.fullName || 'Not provided'}</td></tr>
              <tr><th>Email</th><td>${data.contactInfo.email || 'Not provided'}</td></tr>
              <tr><th>Company</th><td>${data.contactInfo.companyName || 'Not provided'}</td></tr>
              <tr><th>Phone</th><td>${data.contactInfo.phoneNumber || 'Not provided'}</td></tr>
            </table>
          </div>

          <div class="section">
            <h2>Project Details</h2>
            <p><span class="label">Industry Focus:</span> <span class="value">${data.industry}</span></p>
            <p><span class="label">Submitted:</span> <span class="value">${new Date(data.submittedAt).toLocaleString()}</span></p>
          </div>

          <div class="section">
            <h2>Selected Platforms</h2>
            <ul>
              ${data.platforms.map(platform => `<li>${platform}</li>`).join('')}
            </ul>
          </div>

          <div class="section">
            <h2>Key Features</h2>
            <ul>
              ${data.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>

          ${data.contactInfo.projectDescription ? `
          <div class="section">
            <h2>Project Description</h2>
            <p>${data.contactInfo.projectDescription}</p>
          </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
    }

    private generateUserConfirmationTemplate(data: NotificationData): string {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .section { margin-bottom: 20px; }
          .highlight { background: #f8fafc; padding: 15px; border-left: 4px solid #1e40af; }
          .footer { background: #f1f5f9; padding: 15px; text-align: center; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Your SOC Configuration Submission</h1>
        </div>
        
        <div class="content">
          <p>Dear ${data.contactInfo.fullName || 'Valued Customer'},</p>
          
          <p>Thank you for submitting your SOC configuration requirements. We have successfully received your submission and our team will review it shortly.</p>
          
          <div class="highlight">
            <h3>Submission Details</h3>
            <p><strong>Submission ID:</strong> ${data.id}</p>
            <p><strong>Submitted:</strong> ${new Date(data.submittedAt).toLocaleString()}</p>
            <p><strong>Industry Focus:</strong> ${data.industry}</p>
            <p><strong>Company:</strong> ${data.contactInfo.companyName || 'Not specified'}</p>
          </div>

          <h3>What Happens Next?</h3>
          <ol>
            <li>Our engineering team will review your requirements within 1-2 business days</li>
            <li>We'll prepare a detailed proposal based on your specifications</li>
            <li>A technical consultant will contact you to discuss the next steps</li>
            <li>We'll schedule a consultation call to refine the requirements</li>
          </ol>

          <p>If you have any immediate questions or need to modify your submission, please don't hesitate to contact us at <a href="mailto:support@example.com">support@example.com</a> or call us at +1 (555) 123-4567.</p>

          <p>Best regards,<br>
          The SOC Engineering Team</p>
        </div>

        <div class="footer">
          <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
        </div>
      </body>
      </html>
    `;
    }

    async testConnection(): Promise<boolean> {
        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.error('Email service connection test failed:', error);
            return false;
        }
    }
}

export const emailService = new EmailNotificationService();
