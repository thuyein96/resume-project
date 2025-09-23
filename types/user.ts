import type { Types } from 'mongoose';
import mongoose from 'mongoose';

export type User = {
  _id?: Types.ObjectId | string;
  name?: string;
  email?: string;
  country?: string;
  interestedIn?: string;
  hashedPassword?: string;
};