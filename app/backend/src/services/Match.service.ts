import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchService {
  constructor(private _matchModel: typeof Match) {}

  async getAll(): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, attributes: { exclude: ['id'] }, as: 'teamHome' },
        { model: Team, attributes: { exclude: ['id'] }, as: 'teamAway' },
      ],
    });

    return matches;
  }

  async getMatchesByProgress(inProgress: boolean): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, attributes: { exclude: ['id'] }, as: 'teamHome' },
        { model: Team, attributes: { exclude: ['id'] }, as: 'teamAway' },
      ],
    });

    return matches;
  }
}
