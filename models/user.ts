import mongoose, { Document, Schema } from 'mongoose';
import { connectDB } from '@/lib/db';
import type { User } from '@/types/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
  name: String,
  email: String,
  country: String,
  interestedIn: String,
  hashedPassword: String,
});

const UserModel = mongoose.models.User || mongoose.model<User & Document>('User', userSchema);

export async function listUsers(): Promise<User[]> {
  await connectDB();
  const docs = await UserModel.find().lean();
  return docs.map(doc => doc.toObject());
}

export async function createUser(userData: Partial<{ name: string; email: string; country: string; interestedIn: string; password: string; }>): Promise<User> {
  await connectDB();
  // hash password here before saving in a real app
  if(!userData.password) {
    throw new Error('Password is required');
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  console.log('Hashed password:', hashedPassword);
  const user = new UserModel({ ...userData, hashedPassword });
  await user.save();
  return user.toObject();
}

export async function login(credentials: { email: string; password: string; }): Promise<{ user: User, token: string } | { error: string, token?: undefined }> {
  await connectDB();
  const user = await UserModel.findOne({ email: credentials.email }).exec();
  if (!user) {
    return { error: 'User not found' };
  }
  const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword || '');
  if (!isPasswordValid) {
    return { error: 'Invalid password' };
  }
  // assign jwt token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1h' }
  );
  return { ...user.toObject(), token };
}

export async function getUserById(id: string) {
  await connectDB();
  const doc = await UserModel.findById(id).lean();
  const userResumes = await mongoose.models.Resume?.find({ userId: id }).lean() || [];
  if (doc) {
    const user = doc;
    return { ...user, resumes: userResumes };
  }
  return null;
}