import mongoose, { Model, Schema } from 'mongoose';

export interface IResume {
  user: mongoose.Types.ObjectId;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  education: Array<{
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    education: [
      {
        school: String,
        degree: String,
        startDate: String,
        endDate: String,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    skills: [String],
    projects: [
      {
        name: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Resume: Model<IResume> = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);

export default Resume;