import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore-start
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import { app } from '../app';
import User from '../database/models/UserModel';
import mocks from './mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota de login', () => {
  describe('Em caso de sucesso', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password:
          '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as User);
    });

    after(async () => sinon.restore());

    it('Verifica se é retornado token ao fazer login com sucesso', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(mocks.userMocks.admin);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
    });
  });

  describe('Em caso de erro', () => {
    describe('Caso não exista usuário com o email enviado', () => {
      before(async () => {
        sinon.stub(User, 'findOne').resolves(null);
      });

      after(async () => sinon.restore());

      it('Deve retornar erro', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(mocks.userMocks.invalidUser);

        expect(response).to.have.status(401);
        expect(response.body).to.deep.equal({
          message: 'Incorrect email or password',
        });
      });
    });

    describe('Caso não seja enviado email na requisição', () => {
      it('Deve retornar erro', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(mocks.userMocks.noEmailLogin);

        expect(response).to.have.status(400);
        expect(response.body).to.deep.equal({
          message: 'All fields must be filled',
        });
      });
    });

    describe('Caso não seja enviado email na requisição', () => {
      it('Deve retornar erro', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(mocks.userMocks.noPasswordLogin);

        expect(response).to.have.status(400);
        expect(response.body).to.deep.equal({
          message: 'All fields must be filled',
        });
      });
    });
  });
});
