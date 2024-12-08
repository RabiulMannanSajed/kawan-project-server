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

//*  this will convert the hight into m
// Pre-findOneAndUpdate middleware for updates
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update && typeof update.hight === 'string') {
    const hightValue = update.hight.trim(); // Clean up whitespace
    let feet = 0;
    let inches = 0;

    if (hightValue.includes('.')) {
      [feet, inches = 0] = hightValue
        .split('.')
        .map((val) => parseFloat(val.trim()) || 0);
    } else {
      feet = parseFloat(hightValue) || 0;
    }

    const m = feet * 0.3048 + inches * 0.0254; // Conversion logic in m
    update.hight = `${m.toFixed(2)} `; // Update the height in m

    this.setUpdate(update); // Apply the updated value
  }

  next();
});
export const User = model<TUser>('user', UserSchema);
