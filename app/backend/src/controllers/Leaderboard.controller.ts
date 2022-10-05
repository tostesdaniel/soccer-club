import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class MatchController {
  constructor(private _leaderboardService: LeaderboardService) {}

  async getGeneralLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this._leaderboardService.getGeneralLeaderboard();

    return res.status(200).json(leaderboard);
  }

  async getHomeTeamLeaderboard(
    _req: Request,
    res: Response,
  ): Promise<Response> {
    const leaderboard = await this._leaderboardService.getHomeTeamLeaderboard();

    return res.status(200).json(leaderboard);
  }

  async getAwayTeamLeaderboard(
    _req: Request,
    res: Response,
  ): Promise<Response> {
    const leaderboard = await this._leaderboardService.getAwayTeamLeaderboard();

    return res.status(200).json(leaderboard);
  }
}
