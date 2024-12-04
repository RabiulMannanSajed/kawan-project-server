import { model, Schema } from 'mongoose';
import { THealth } from './healthAndNutrition.interface';
import { User } from '../user/user.model';
import { string } from 'zod';

const healthySchema = new Schema<THealth>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'user',
    },
    BMI: {
      type: String,
    },

    fitnessLevel: {
      type: String,
      enum: ['stay-healthy', 'gain-weight', 'lose-wight'],
      default: 'stay-healthy',
    },
  },
  {
    timestamps: true,
  },
);

// Pre save hook to calculate BMI
healthySchema.pre('save', async function (next) {
  if (!this.user) {
    return next(new Error('User is required'));
  }

  try {
    // Get user data (height and weight)
    const user = await User.findById(this.user);

    if (!user || !user.hight || !user.weight) {
      return next(new Error('User height or weight is missing'));
    }
    const bmi = user.weight / (user.hight * 2);
    const BMICalculation = bmi.toFixed(2);
    const BMI = BMICalculation.toString();

    // const healthData = await Health.
    this.BMI = BMI;
    // Proceed with the save operation
    next();
  } catch (error: any) {
    return next(error);
  }
});

export const Health = model<THealth>('healths', healthySchema);
