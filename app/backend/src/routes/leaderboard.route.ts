import * as express from 'express';
import Match from '../database/models/MatchModel';
import LeaderboardService from '../services/Leaderboard.service';
import LeaderboardController from '../controllers/Leaderboard.controller';
import Team from '../database/models/TeamModel';

require('express-async-errors');

const leaderboard = new LeaderboardController(
  new LeaderboardService(Match, Team),
);
const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', (req, res) =>
  leaderboard.getHomeTeamLeaderboard(req, res));

leaderboardRouter.get('/away', (req, res) =>
  leaderboard.getAwayTeamLeaderboard(req, res));

leaderboardRouter.get('/', (req, res) =>
  leaderboard.getGeneralLeaderboard(req, res));

export default leaderboardRouter;
