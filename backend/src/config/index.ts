// Configuration
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    mongoUri: 'mongodb+srv://bhargavkalambhe3_db_user:BrandTURN%2F123%2F@brandturn-1.zyslydp.mongodb.net/?retryWrites=true&w=majority&appName=BrandTURN-1',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    nodeEnv: process.env.NODE_ENV || 'development',
};

