import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    weight: {
      type: String,
    },
    hight: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    contactNo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

//  this will convert the hight into cm
// Pre-findOneAndUpdate middleware for updates
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update && typeof update.hight === 'string') {
    const hightValue = update.hight.trim(); // Clean up whitespace
    let feet = 0;
    let inches = 0;

    if (hightValue.includes('.')) {
      // Split into feet and inches if a dot is present
      [feet, inches = 0] = hightValue
        .split('.')
        .map((val) => parseFloat(val.trim()) || 0);
    } else {
      // Treat the value as feet only if no dot is present
      feet = parseFloat(hightValue) || 0;
    }

    const cm = feet * 30.48 + inches * 2.54; // Conversion logic
    update.hight = `${cm.toFixed(2)} cm`; // Update the height in cm

    this.setUpdate(update); // Apply the updated value
  }

  next();
});
export const User = model<TUser>('user', UserSchema);
