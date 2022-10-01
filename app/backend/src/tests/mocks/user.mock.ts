export default {
  admin: {
    email: 'admin@admin',
    password: 'secret_admin',
  },
  invalidUser: {
    email: 'idonotexist@notfound.com',
    password: 'definitely_not',
  },
  noEmailLogin: {
    email: '',
    password: 'atLeastThereIsAPassword',
  },
  noPasswordLogin: {
    email: 'thereisan@email.com',
    password: '',
  },
};
