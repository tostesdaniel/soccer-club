import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import mocks from './mocks';
import Match from '../database/models/MatchModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota de matches', () => {
  describe('GET /matches', () => {
    describe('Ao buscar por todas as partidas', () => {
      describe('Em caso de sucesso', () => {
        it('Verifica se são retornados os dados corretamente', async () => {
          const response = await chai.request(app).get('/matches');

          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal(mocks.matchesMock.allMatches);
        });
      });
    });

    describe('Ao buscar por partidas em andamento', () => {
      describe('Em caso de sucesso', () => {
        it('Verifica se são retornados os dados corretamente', async () => {
          const response = await chai
            .request(app)
            .get('/matches')
            .query({ inProgress: true });

          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal(
            mocks.matchesMock.matchesInProgress
          );
        });
      });
    });

    describe('Ao buscar por partidas finalizadas', () => {
      describe('Em caso de sucesso', () => {
        it('Verifica se são retornados os dados corretamente', async () => {
          const response = await chai
            .request(app)
            .get('/matches')
            .query({ inProgress: false });

          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal(
            mocks.matchesMock.finishedMatches
          );
        });
      });
    });
  });

  describe('POST /matches', () => {
    describe('Ao cadastrar partida em andamento', () => {
      describe('Em caso de sucesso', () => {
        const insertion = { id: 11, ...mocks.matchesMock.newMatch } as Match;

        before(async () => {
          sinon.stub(Match, 'create').resolves(insertion);
        });

        after(() => sinon.restore());

        it('Verifica se é retornada a partida inserida no banco de dados', async () => {
          const response = await chai
            .request(app)
            .post('/matches')
            .send(mocks.matchesMock.newMatch)
            .set({ Authorization: mocks.tokenMock.adminToken })
            .query({ inProgress: true });

          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal(insertion);
        });
      });
    });

    describe('Ao tentar inserir uma partida com times iguais', () => {
      it('Verifica se é retornado um erro', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(mocks.matchesMock.newMatchSameTeam)
          .set({ Authorization: mocks.tokenMock.adminToken })
          .query({ inProgress: true });

        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'It is not possible to create a match with two equal teams',
        });
      });
    });

    describe('Ao tentar inserir uma partida com um time que não existe', () => {
      before(async () => {
        sinon
          .stub(Match, 'findAll')
          .resolves([null, mocks.matchesMock.allMatches[0][0]]);
      });

      after(() => sinon.restore());

      it('Verifica se é retornado um erro', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(mocks.matchesMock.newMatchInvalidTeam)
          .set({ Authorization: mocks.tokenMock.adminToken })
          .query({ inProgress: true });

        expect(response).to.have.status(404);
        expect(response.body).to.deep.equal({
          message: 'There is no team with such id!',
        });
      });
    });

    describe('Caso não seja provido um token válido', () => {
      it('Verifica que não é possível inserir uma partida ', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(mocks.matchesMock.newMatchInvalidTeam)
          .set({ Authorization: mocks.tokenMock.invalidToken })
          .query({ inProgress: true });

        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'There is no team with such id!',
        });
      });
    });
  });

  describe('PATCH /matches/:id/finished', () => {
    describe('Ao atualizar o status "inProgress" para "false"', () => {
      describe('Em caso de sucesso', () => {
        it('Verifica se a operação foi concluída', async () => {});
      });
    });
  });

  describe('PATCH /matches/:id', () => {
    describe('Ao atualizar informações de partidas em andamento', () => {
      it('Verifica se é retornado o status correto', async () => {});
    });
  });
});
