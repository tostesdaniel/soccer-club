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
        password: 'secret_admin',
      } as User);
    });

    after(async () => sinon.restore());

    it('Verifica se é retornado token ao fazer login com sucesso', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(mocks.userMocks.admin);

      expect(response).to.have.status(200);
    });
  });

  describe('Em caso de erro', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
    });

    after(async () => sinon.restore());

    it('Deve retornar erro caso não exista usuário com o email enviado', async () => {
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
});
