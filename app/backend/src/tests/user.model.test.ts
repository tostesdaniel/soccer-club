import UserModel from '../database/models/UserModel';
import checkPropertyExists from './helpers/checkPropertyExists';

describe('Verifica se o Model de User', () => {
  const user = new UserModel();

  describe('contém as propriedades "id", "username", "role", "email", "password"', () => {
    ['id', 'username', 'role', 'email', 'password'].forEach(
      checkPropertyExists(user)
    );
  });
});
