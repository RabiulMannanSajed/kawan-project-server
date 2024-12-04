import { RequestHandler } from 'express';
import { HealthServices } from './healthAndNutrition.service';

const createHealth: RequestHandler = async (req, res, next) => {
  try {
    const result = await HealthServices.createHealthIntoDB(req.body);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'user is created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllHealth: RequestHandler = async (req, res, next) => {
  try {
    const result = await HealthServices.getAllHealthFromDB();
    res.status(200).json({
      success: true,
      message: 'user is created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const HealthController = {
  createHealth,
  getAllHealth,
};
