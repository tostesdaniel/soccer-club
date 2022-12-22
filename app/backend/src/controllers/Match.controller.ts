import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

export default class MatchController {
  constructor(private _matchService: MatchService) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    let matches;
    if (inProgress) {
      matches = await this._matchService.getMatchesByProgress(
        inProgress === 'true',
      );
    } else {
      matches = await this._matchService.getAll();
    }

    return res.status(200).json(matches);
  }

  async create(req: Request, res: Response) {
    const match = req.body;

    const instance = await this._matchService.create(match);

    return res.status(201).json(instance);
  }

  async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;

    await this._matchService.updateMatchProgress(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async updateScoreboard(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const score = req.body;

    await this._matchService.updateScoreboard(Number(id), score);

    return res.status(200).json({ message: 'Scoreboard updated' });
  }
}
