import * as bcrypt from 'bcryptjs';

export default (s: string, hash: string) => bcrypt.compareSync(s, hash);
