import jsPDF from 'jspdf';
import { format } from 'date-fns';

interface FormData {
    title?: string;
    description?: string;
    industryFocus?: string;
    otherIndustry?: string;
    corePlatforms?: string[];
    operatingSystem?: string;
    keyFeatures?: string[];
    hardwareRequirements?: string[];
    middlewareFrameworks?: string[];
    driverNeeds?: string[];
    cloudPlatforms?: string[];
    iotIntegration?: string;
    dataProcessing?: string[];
    cloudStrategy?: string;
    contactInfo?: {
        fullName?: string;
        email?: string;
        companyName?: string;
        phoneNumber?: string;
        projectDescription?: string;
    };
}

export function generateConfigurationPDF(formData: FormData): void {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let currentY = margin;

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, y: number, fontSize: number = 12, isBold: boolean = false): number => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');

        const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
        pdf.text(lines, margin, y);

        return y + (lines.length * fontSize * 0.5) + 5;
    };

    // Header
    pdf.setFillColor(59, 130, 246); // Blue color
    pdf.rect(0, 0, pageWidth, 30, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SOC Configurator - System Requirements', margin, 20);

    currentY = 40;
    pdf.setTextColor(0, 0, 0);

    // Document info
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated: ${format(new Date(), 'PPP')}`, margin, currentY);
    currentY += 15;

    // Configuration Details
    if (formData.title || formData.description) {
        currentY = addWrappedText('CONFIGURATION DETAILS', currentY, 14, true);
        currentY += 5;

        if (formData.title) {
            currentY = addWrappedText(`Title: ${formData.title}`, currentY, 12, true);
        }
        if (formData.description) {
            currentY = addWrappedText(`Description: ${formData.description}`, currentY);
        }
        currentY += 10;
    }

    // Contact Information
    if (formData.contactInfo) {
        currentY = addWrappedText('CONTACT INFORMATION', currentY, 14, true);
        currentY += 5;

        if (formData.contactInfo.fullName) {
            currentY = addWrappedText(`Name: ${formData.contactInfo.fullName}`, currentY);
        }
        if (formData.contactInfo.email) {
            currentY = addWrappedText(`Email: ${formData.contactInfo.email}`, currentY);
        }
        if (formData.contactInfo.companyName) {
            currentY = addWrappedText(`Company: ${formData.contactInfo.companyName}`, currentY);
        }
        if (formData.contactInfo.phoneNumber) {
            currentY = addWrappedText(`Phone: ${formData.contactInfo.phoneNumber}`, currentY);
        }
        if (formData.contactInfo.projectDescription) {
            currentY = addWrappedText(`Project Description: ${formData.contactInfo.projectDescription}`, currentY);
        }
        currentY += 10;
    }

    // Industry Focus
    if (formData.industryFocus) {
        currentY = addWrappedText('INDUSTRY FOCUS', currentY, 14, true);
        currentY += 5;
        currentY = addWrappedText(`Industry: ${formData.industryFocus}`, currentY);
        if (formData.otherIndustry) {
            currentY = addWrappedText(`Specific Industry: ${formData.otherIndustry}`, currentY);
        }
        currentY += 10;
    }

    // Core Platforms
    if (formData.corePlatforms && formData.corePlatforms.length > 0) {
        currentY = addWrappedText('CORE PLATFORMS', currentY, 14, true);
        currentY += 5;
        formData.corePlatforms.forEach(platform => {
            currentY = addWrappedText(`• ${platform}`, currentY);
        });
        currentY += 10;
    }

    // Operating System
    if (formData.operatingSystem) {
        currentY = addWrappedText('OPERATING SYSTEM', currentY, 14, true);
        currentY += 5;
        currentY = addWrappedText(`Selected OS: ${formData.operatingSystem}`, currentY);
        currentY += 10;
    }

    // Key Features
    if (formData.keyFeatures && formData.keyFeatures.length > 0) {
        // Check if we need a new page
        if (currentY > 250) {
            pdf.addPage();
            currentY = margin;
        }

        currentY = addWrappedText('KEY APPLICATION FEATURES', currentY, 14, true);
        currentY += 5;
        formData.keyFeatures.forEach(feature => {
            currentY = addWrappedText(`• ${feature}`, currentY);
        });
        currentY += 10;
    }

    // Hardware Requirements
    if (formData.hardwareRequirements && formData.hardwareRequirements.length > 0) {
        if (currentY > 220) {
            pdf.addPage();
            currentY = margin;
        }

        currentY = addWrappedText('HARDWARE & PERIPHERAL REQUIREMENTS', currentY, 14, true);
        currentY += 5;
        formData.hardwareRequirements.forEach(requirement => {
            currentY = addWrappedText(`• ${requirement}`, currentY);
        });
        currentY += 10;
    }

    // Middleware Frameworks
    if (formData.middlewareFrameworks && formData.middlewareFrameworks.length > 0) {
        if (currentY > 220) {
            pdf.addPage();
            currentY = margin;
        }

        currentY = addWrappedText('MIDDLEWARE & FRAMEWORKS', currentY, 14, true);
        currentY += 5;
        formData.middlewareFrameworks.forEach(framework => {
            currentY = addWrappedText(`• ${framework}`, currentY);
        });
        currentY += 10;
    }

    // Driver Development Needs
    if (formData.driverNeeds && formData.driverNeeds.length > 0) {
        if (currentY > 220) {
            pdf.addPage();
            currentY = margin;
        }

        currentY = addWrappedText('DRIVER DEVELOPMENT NEEDS', currentY, 14, true);
        currentY += 5;
        formData.driverNeeds.forEach(need => {
            currentY = addWrappedText(`• ${need}`, currentY);
        });
        currentY += 10;
    }

    // Cloud & Connectivity
    if (formData.cloudPlatforms && formData.cloudPlatforms.length > 0) {
        if (currentY > 180) {
            pdf.addPage();
            currentY = margin;
        }

        currentY = addWrappedText('CLOUD & CONNECTIVITY STRATEGY', currentY, 14, true);
        currentY += 5;

        if (formData.cloudPlatforms.length > 0) {
            currentY = addWrappedText('Cloud Platforms:', currentY, 12, true);
            formData.cloudPlatforms.forEach(platform => {
                currentY = addWrappedText(`• ${platform}`, currentY);
            });
        }

        if (formData.iotIntegration) {
            currentY = addWrappedText(`IoT Integration: ${formData.iotIntegration}`, currentY);
        }

        if (formData.dataProcessing && formData.dataProcessing.length > 0) {
            currentY = addWrappedText('Data Processing Requirements:', currentY, 12, true);
            formData.dataProcessing.forEach(processing => {
                currentY = addWrappedText(`• ${processing}`, currentY);
            });
        }
    }

    // Footer
    const pageCount = (pdf as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(
            `Page ${i} of ${pageCount} | SOC Configurator Report | Generated on ${format(new Date(), 'PPP')}`,
            margin,
            pdf.internal.pageSize.getHeight() - 10
        );
    }

    // Save the PDF
    const fileName = `SOC_Configuration_${formData.contactInfo?.companyName || 'Report'}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    pdf.save(fileName);
}
