import { Types } from 'mongoose';

export type THealth = {
  user: Types.ObjectId;
  fitnessLevel?: 'stay-healthy' | 'gain-weight' | 'lose-wight';
  BMI?: string;
};
