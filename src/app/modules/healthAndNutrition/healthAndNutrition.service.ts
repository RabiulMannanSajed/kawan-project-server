import { User } from '../user/user.model';
import { THealth } from './healthAndNutrition.interface';
import { Health } from './healthAndNutrition.model';

const createHealthIntoDB = async (payload: THealth) => {
  const result = await Health.create(payload);
  return result;
};

const getAllHealthFromDB = async () => {
  const result = await Health.find().populate('user');
  return result;
};

const getSingleHealthFormDB = async (id: string) => {
  const result = await Health.findById(id);
  return result;
};

const updateHealthIntoDB = async (id: string, payload: Partial<THealth>) => {
  //  first find the heath id & the id of the user
  const isUserExists = User.findById(payload.user);
  if (isUserExists) {
    console.log('this is here', isUserExists);
  }
  return null;
};

export const HealthServices = {
  createHealthIntoDB,
  getAllHealthFromDB,
  getSingleHealthFormDB,
  updateHealthIntoDB,
};
