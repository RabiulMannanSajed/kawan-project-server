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

export const HealthServices = {
  createHealthIntoDB,
  getAllHealthFromDB,
};
