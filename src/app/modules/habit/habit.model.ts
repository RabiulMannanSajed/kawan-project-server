import { Schema } from 'mongoose';

const HabitSchema = new Schema<THabit>({
  HabitName: {
    type: String,
    required: [true, 'Habit name is required'],
  },
  Description: {
    type: String,
    required: [true, 'Description is required'],
  },
  status: {
    type: String,
    enum: ['TODO', 'InPROGRESS', 'COMPLETE'],
    default: 'TODO',
  },
  StartDate: {
    type: String,
  },
});
