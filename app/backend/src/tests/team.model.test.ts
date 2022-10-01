import checkPropertyExists from './helpers/checkPropertyExists';
import TeamModel from '../database/models/TeamModel';

describe('Verifica se o Model de Team', () => {
  const user = new TeamModel();

  describe('contém as propriedades "id" e "teamName"', () => {
    ['id', 'teamName'].forEach(checkPropertyExists(user));
  });
});
