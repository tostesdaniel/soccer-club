import Team from '../database/models/TeamModel';

export default class TeamService {
  constructor(private _teamModel: typeof Team) {}

  async getAll(): Promise<Team[]> {
    const teams = await this._teamModel.findAll();

    return teams;
  }

  async getOne(id: number): Promise<Team> {
    const team = await this._teamModel.findByPk(id);

    if (!team) throw new Error('404|Team not found');

    return team;
  }
}
