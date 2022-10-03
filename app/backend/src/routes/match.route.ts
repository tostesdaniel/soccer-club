import * as express from 'express';
import Match from '../database/models/MatchModel';
import MatchService from '../services/Match.service';
import MatchController from '../controllers/Match.controller';

require('express-async-errors');

const match = new MatchController(new MatchService(Match));
const matchRouter = express.Router();

matchRouter.get('/', (req, res) => match.getAll(req, res));

export default matchRouter;
