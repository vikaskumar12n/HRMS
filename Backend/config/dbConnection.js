import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const db_url = process.env.DB || "mongodb://localhost:27017/HRmanagement";

const dbConnection = async () => {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`DB Connected Successfully: ${db_url}`);
    } catch (err) {
        console.error(`DB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

export default dbConnection;
