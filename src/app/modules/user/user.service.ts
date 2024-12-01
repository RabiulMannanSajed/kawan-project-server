import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  console.log('payload', payload);
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  console.log('result', result);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  updateUserIntoDB,
};
