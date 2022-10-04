import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import mocks from './mocks';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota de matches', () => {
  const {
    allMatches,
    matchesInProgress,
    finishedMatches,
    newMatch,
    newMatchInvalidTeam,
    newMatchSameTeam,
    updatedMatch,
  } = mocks.matchesMock;

  describe('GET /matches', () => {
    describe('Ao buscar por todas as partidas', () => {
      describe('Em caso de sucesso', () => {
        before(async () => {
          sinon.stub(Match, 'findAll').resolves(allMatches as Match[]);
        });

        after(() => sinon.restore());

        it('Verifica se são retornados os dados corretamente', async () => {
          const response = await chai.request(app).get('/matches');

          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal(allMatches);
        });
      });
    });

    describe('Ao buscar por partidas em andamento', () => {
      describe('Em caso de sucesso', () => {
        before(async () => {
          sinon.stub(Match, 'findAll').resolves(matchesInProgress as Match[]);
        });

        after(() => sinon.restore());

        it('Verifica se são retornados os dados corretamente', async () => {
          const response = await chai
            .request(app)
            .get('/matches')
            .query({ inProgress: true });

          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal(matchesInProgress);
        });
      });
    });

    describe('Ao buscar por partidas finalizadas', () => {
      describe('Em caso de sucesso', () => {
        before(async () => {
          sinon.stub(Match, 'findAll').resolves(finishedMatches as Match[]);
        });

        after(() => sinon.restore());

        it('Verifica se são retornados os dados corretamente', async () => {
          const response = await chai
            .request(app)
            .get('/matches')
            .query({ inProgress: false });

          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal(finishedMatches);
        });
      });
    });
  });

  describe('POST /matches', () => {
    describe('Ao cadastrar partida em andamento', () => {
      describe('Em caso de sucesso', () => {
        const insertion = { id: 11, ...newMatch } as Match;

        before(async () => {
          sinon.stub(Match, 'create').resolves(insertion);
        });

        after(() => sinon.restore());

        it('Verifica se é retornada a partida inserida no banco de dados', async () => {
          const response = await chai
            .request(app)
            .post('/matches')
            .send(newMatch)
            .set({ Authorization: mocks.tokenMock.adminToken });

          expect(response).to.have.status(201);
          expect(response.body).to.deep.equal(insertion);
        });
      });
    });

    describe('Ao tentar inserir uma partida com times iguais', () => {
      it('Verifica se é retornado um erro', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(newMatchSameTeam)
          .set({ Authorization: mocks.tokenMock.adminToken });

        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'It is not possible to create a match with two equal teams',
        });
      });
    });

    describe('Ao tentar inserir uma partida com um time que não existe', () => {
      before(async () => {
        sinon
          .stub(Team, 'findAll')
          .resolves([mocks.teamMock.allTeams[0]] as Team[]);
      });

      after(() => sinon.restore());

      it('Verifica se é retornado um erro', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(newMatchInvalidTeam)
          .set({ Authorization: mocks.tokenMock.adminToken });

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
          .send(newMatch)
          .set({ Authorization: mocks.tokenMock.invalidToken });

        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'Token must be a valid token',
        });
      });
    });

    describe('Caso não haja token na requisição', () => {
      it('Verifica que retorna um erro', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(newMatch);

        expect(response).to.have.status(400);
        expect(response.body).to.deep.equal({
          message: 'Token must be provided',
        });
      });
    });
  });

  describe('PATCH /matches/:id/finished', () => {
    describe('Ao atualizar o status "inProgress" para "false"', () => {
      describe('Em caso de sucesso', () => {
        before(async () => {
          sinon.stub(Match, 'update').resolves();
        });

        after(() => sinon.restore());

        it('Verifica se a operação foi concluída', async () => {
          const response = await chai.request(app).patch('/matches/1/finish');

          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal({ message: 'Finished' });
        });
      });
    });
  });

  describe('PATCH /matches/:id', () => {
    describe('Ao atualizar informações de partidas em andamento', () => {
      before(async () => {
        sinon.stub(Match, 'update').resolves();
      });

      after(() => sinon.restore());

      it('Verifica se é retornado o status correto', async () => {
        const response = await chai
          .request(app)
          .patch('/matches/1')
          .send(updatedMatch);

        expect(response).to.have.status(200);
      });
    });
  });
});
