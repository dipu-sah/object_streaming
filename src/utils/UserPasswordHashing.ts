import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

export function hash(plainText: string) {
  return bcrypt.hashSync(plainText, saltOrRounds);
}
export function compare(plainText: string, encrypted: string) {
  return bcrypt.compareSync(plainText, encrypted);
}
