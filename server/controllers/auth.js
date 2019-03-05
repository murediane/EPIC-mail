import { validateAuth } from '../helpers/validator';
import { users } from '../models';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import _ from 'lodash';
const login = async (req, res) => {
  const { error } = validateAuth(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  let user = await users.find(u => u.email === req.body.email);
  if (!user) return res.send({ status: 400, message: 'invalid email or password' });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.send({ status: 400, message: 'invalid email or password' });
  const token = Jwt.sign({ _email: user._email }, 'jwtPrivateKey');
  res.send({ status: 201, token });
};
export { login };
