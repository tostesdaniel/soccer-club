import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchService {
  constructor(private _matchModel: typeof Match) {}

  static async verifyCreation({ homeTeam, awayTeam }: Match) {
    const sameTeamOnBothSides = homeTeam === awayTeam;
    if (sameTeamOnBothSides) {
      throw new Error(
        '401|It is not possible to create a match with two equal teams',
      );
    }

    const existingTeams = await Team.findAll({
      where: { id: [homeTeam, awayTeam] },
    });
    if (existingTeams.length !== 2) {
      throw new Error('404|There is no team with such id!');
    }
  }

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

  async create(match: Match): Promise<Match> {
    await MatchService.verifyCreation(match);

    const instance = await this._matchModel.create(match);

    return instance;
  }

  async updateMatchProgress(matchId: number) {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id: matchId } },
    );
  }
}
