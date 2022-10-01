import * as express from 'express';
import Team from '../database/models/TeamModel';
import TeamService from '../services/Team.service';
import TeamController from '../controllers/Team.controller';

require('express-async-errors');

const team = new TeamController(new TeamService(Team));
const teamRouter = express.Router();

teamRouter.get('/:id', (req, res) => team.getOne(req, res));
teamRouter.get('/', (req, res) => team.getAll(req, res));

export default teamRouter;
