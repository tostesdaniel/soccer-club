import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  constructor(private _teamService: TeamService) {}

  async getAll(_req: Request, res: Response): Promise<Response> {
    const team = await this._teamService.getAll();

    return res.status(200).json(team);
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this._teamService.getOne(Number(id));

    return res.status(200).json(team);
  }
}
