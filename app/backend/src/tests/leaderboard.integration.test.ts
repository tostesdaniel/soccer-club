import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import mocks from './mocks';
// import Leaderboard from '../database/models/LeaderboardModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota de leaderboard', () => {
  const { homeTeam, awayTeam, generalLeaderboard } = mocks.leaderboardMock;

  describe('GET /leaderboard/home', () => {
    describe('Ao buscar por classificação de times da casa', () => {
      it('Verifica se são retornados os dados corretamente', async () => {
        const response = await chai.request(app).get('/leaderboard/home');

        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(homeTeam);
      });
    });

    describe('Ao buscar por classificação de times visitantes', () => {
      it('Verifica se são retornados os dados corretamente', async () => {
        const response = await chai.request(app).get('/leaderboard/away');

        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(awayTeam);
      });
    });

    describe('Ao buscar por classificação de times visitantes', () => {
      it('Verifica se são retornados os dados corretamente', async () => {
        const response = await chai.request(app).get('/leaderboard');

        expect(response).to.have.status(200);
        expect(response.body).to.deep.equal(generalLeaderboard);
      });
    });
  });
});
