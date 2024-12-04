import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { HealthRouters } from '../modules/healthAndNutrition/healthAndNutrition.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouters,
  },
  {
    path: '/health',
    route: HealthRouters,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
