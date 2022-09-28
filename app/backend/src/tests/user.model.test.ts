import { expect } from 'chai';

import UserModel from '../database/models/UserModel';

const checkPropertyExists = (instance: object) => (propName: string) => {
  it(`has property ${propName}`, () => {
    expect(instance).to.have.property(propName);
  });
};

describe('Verifica se o Model de User', () => {
  const user = new UserModel();

  describe('contém as propriedades "id", "username", "role", "email", "password"', () => {
    ['id', 'username', 'role', 'email', 'password'].forEach(
      checkPropertyExists(user)
    );
  });
});
