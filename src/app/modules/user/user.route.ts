import express from 'express';
import { UserControllers } from './user.controller';

const route = express.Router();

route.post('/create-user', UserControllers.createUser);
route.get('/', UserControllers.getAllUser);

export const UserRouters = route;
