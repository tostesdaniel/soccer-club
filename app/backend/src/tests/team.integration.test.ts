import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import mocks from './mocks';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota de times', () => {
  describe('Ao buscar por todos os times', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(Team, 'findAll').resolves(mocks.teamMock.allTeams as Team[]);
      });

      after(() => sinon.restore());

      it('Verifica se são retornados todos os times corretamente', async () => {
        const response = await chai.request(app).get('/teams');

        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(mocks.teamMock.allTeams);
      });
    });
  });

  describe('Ao buscar um time por id', () => {
    describe('Em caso de sucesso', () => {
      before(async () => {
        sinon.stub(Team, 'findOne').resolves(mocks.teamMock.singleTeam as Team);
      });

      after(() => sinon.restore());

      it('Verifica se é retornado o time corretamente', async () => {
        const response = await chai.request(app).get('/teams/7');

        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(mocks.teamMock.singleTeam);
      });
    });
  });
});
