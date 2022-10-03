import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

export default class MatchController {
  constructor(private _matchService: MatchService) {}

  async getAll(_req: Request, res: Response): Promise<Response> {
    const matches = await this._matchService.getAll();

    return res.status(200).json(matches);
  }

  async getMatchesByProgress(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    const matches = await this._matchService.getMatchesByProgress(
      Boolean(inProgress),
    );

    return res.status(200).json(matches);
  }
}
