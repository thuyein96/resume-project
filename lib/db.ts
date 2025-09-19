import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string | undefined;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not set');
}

let isConnected = 0; // 0 = disconnected, 1 = connecting, 2 = connected

export async function connectDB() {
  if (isConnected === 2) return;
  if (isConnected === 1) return;
  isConnected = 1;
  await mongoose.connect(MONGODB_URI as string, {
    autoIndex: true
  });
  isConnected = 2;
  console.log('DB connected');
}

export { mongoose };