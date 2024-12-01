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
  if (payload.hight && typeof payload.hight !== 'string') {
    throw new Error('Hight must be a string.');
  }
  console.log(payload.hight);
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  updateUserIntoDB,
};
