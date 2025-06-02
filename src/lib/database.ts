import Database from 'better-sqlite3';
import path from 'path';

// Database schema and types
export interface ConfigurationSubmission {
    id: string;
    industryFocus?: string;
    otherIndustry?: string;
    corePlatforms: string;
    operatingSystem?: string;
    keyFeatures: string;
    hardwareRequirements: string;
    middlewareFrameworks: string;
    driverNeeds: string;
    cloudPlatforms: string;
    iotIntegration?: string;
    dataProcessing: string;
    cloudStrategy?: string;
    contactInfo: string;
    createdAt: string;
    updatedAt: string;
    status: 'draft' | 'submitted' | 'reviewed' | 'completed';
}

class DatabaseManager {
    private db: Database.Database;

    constructor() {
        const dbPath = path.join(process.cwd(), 'data', 'configurator.db');
        this.db = new Database(dbPath);
        this.initializeDatabase();
    }

    private initializeDatabase() {
        // Create configurations table
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS configurations (
        id TEXT PRIMARY KEY,
        industry_focus TEXT,
        other_industry TEXT,
        core_platforms TEXT NOT NULL,
        operating_system TEXT,
        key_features TEXT NOT NULL,
        hardware_requirements TEXT NOT NULL,
        middleware_frameworks TEXT NOT NULL,
        driver_needs TEXT NOT NULL,
        cloud_platforms TEXT NOT NULL,
        iot_integration TEXT,
        data_processing TEXT NOT NULL,
        cloud_strategy TEXT,
        contact_info TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'draft'
      )
    `);

        // Create analytics table for tracking popular choices
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        option_value TEXT NOT NULL,
        selection_count INTEGER DEFAULT 1,
        last_selected TEXT NOT NULL
      )
    `);

        // Create indexes for better performance
        this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_configurations_status ON configurations(status);
      CREATE INDEX IF NOT EXISTS idx_configurations_created_at ON configurations(created_at);
      CREATE INDEX IF NOT EXISTS idx_analytics_category ON analytics(category);
    `);
    }

    // Configuration CRUD operations
    async saveConfiguration(config: Omit<ConfigurationSubmission, 'createdAt' | 'updatedAt'>): Promise<void> {
        const now = new Date().toISOString();

        const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO configurations (
        id, industry_focus, other_industry, core_platforms, operating_system,
        key_features, hardware_requirements, middleware_frameworks, driver_needs,
        cloud_platforms, iot_integration, data_processing, cloud_strategy,
        contact_info, created_at, updated_at, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

        stmt.run(
            config.id,
            config.industryFocus,
            config.otherIndustry,
            config.corePlatforms,
            config.operatingSystem,
            config.keyFeatures,
            config.hardwareRequirements,
            config.middlewareFrameworks,
            config.driverNeeds,
            config.cloudPlatforms,
            config.iotIntegration,
            config.dataProcessing,
            config.cloudStrategy,
            config.contactInfo,
            config.createdAt || now,
            now,
            config.status
        );
    }

    async getConfiguration(id: string): Promise<ConfigurationSubmission | null> {
        const stmt = this.db.prepare('SELECT * FROM configurations WHERE id = ?');
        const row = stmt.get(id) as any;

        if (!row) return null;

        return {
            id: row.id,
            industryFocus: row.industry_focus,
            otherIndustry: row.other_industry,
            corePlatforms: row.core_platforms,
            operatingSystem: row.operating_system,
            keyFeatures: row.key_features,
            hardwareRequirements: row.hardware_requirements,
            middlewareFrameworks: row.middleware_frameworks,
            driverNeeds: row.driver_needs,
            cloudPlatforms: row.cloud_platforms,
            iotIntegration: row.iot_integration,
            dataProcessing: row.data_processing,
            cloudStrategy: row.cloud_strategy,
            contactInfo: row.contact_info,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            status: row.status
        };
    }

    async getAllConfigurations(): Promise<ConfigurationSubmission[]> {
        const stmt = this.db.prepare('SELECT * FROM configurations ORDER BY created_at DESC');
        const rows = stmt.all() as any[];

        return rows.map(row => ({
            id: row.id,
            industryFocus: row.industry_focus,
            otherIndustry: row.other_industry,
            corePlatforms: row.core_platforms,
            operatingSystem: row.operating_system,
            keyFeatures: row.key_features,
            hardwareRequirements: row.hardware_requirements,
            middlewareFrameworks: row.middleware_frameworks,
            driverNeeds: row.driver_needs,
            cloudPlatforms: row.cloud_platforms,
            iotIntegration: row.iot_integration,
            dataProcessing: row.data_processing,
            cloudStrategy: row.cloud_strategy,
            contactInfo: row.contact_info,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            status: row.status
        }));
    }

    // Analytics methods
    async trackSelection(category: string, optionValue: string): Promise<void> {
        const stmt = this.db.prepare(`
      INSERT INTO analytics (category, option_value, selection_count, last_selected)
      VALUES (?, ?, 1, ?)
      ON CONFLICT(category, option_value) DO UPDATE SET
        selection_count = selection_count + 1,
        last_selected = excluded.last_selected
    `);

        stmt.run(category, optionValue, new Date().toISOString());
    }

    async getPopularChoices(category: string, limit: number = 5): Promise<Array<{ option: string, count: number }>> {
        const stmt = this.db.prepare(`
      SELECT option_value as option, selection_count as count
      FROM analytics 
      WHERE category = ?
      ORDER BY selection_count DESC
      LIMIT ?
    `);

        return stmt.all(category, limit) as Array<{ option: string, count: number }>;
    }

    close(): void {
        this.db.close();
    }
}

// Singleton instance
let dbInstance: DatabaseManager | null = null;

export function getDatabase(): DatabaseManager {
    if (!dbInstance) {
        dbInstance = new DatabaseManager();
    }
    return dbInstance;
}
