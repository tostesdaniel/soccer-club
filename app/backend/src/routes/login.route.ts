import * as express from 'express';
import User from '../database/models/UserModel';
import UserService from '../services/User.service';
import UserController from '../controllers/User.controller';

require('express-async-errors');

const user = new UserController(new UserService(User));
const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => user.login(req, res, next));

loginRouter.get('/validate', (req, res) =>
  UserController.validateLogin(req, res));

export default loginRouter;
