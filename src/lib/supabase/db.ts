import { drizzle } from 'drizzle-orm/postgres-js';
import  postgres  from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
dotenv.config({ path: '.env' });

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.log('🔴 ERROR: Cannot find Database with provided URL')
}
// Connect to Database
const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
// Create Database Instance
const db = drizzle(client, schema);
// Migrate Database
const migrateDB = async () => {
    try {
        // In Progress
        console.log('🟠 Migrating Database...');
        await migrate(db, { migrationsFolder: 'migrations' });
        // Done
        console.log('🟢 Database Migrated Successfully!');
    }   catch (error) {
        // Error
        console.log('🔴 ERROR: Database Migration Failed');
    }
};
migrateDB();
export default db;


