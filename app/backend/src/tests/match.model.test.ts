import checkPropertyExists from './helpers/checkPropertyExists';
import MatchModel from '../database/models/MatchModel';

describe('Verifica se o Model de Match', () => {
  const match = new MatchModel();

  describe('contém as propriedades "id", "homeTeam", "homeTeamGoals", "awayTeam", "awayTeamGoals", "inProgress"', () => {
    [
      'id',
      'homeTeam',
      'homeTeamGoals',
      'awayTeam',
      'awayTeamGoals',
      'inProgress',
    ].forEach(checkPropertyExists(match));
  });
});
