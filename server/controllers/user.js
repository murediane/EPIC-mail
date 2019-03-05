import { validateUser } from '../helpers/validator';
import { users } from '../models';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import config from 'config';
const createUser = async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  let user = await users.find(u => u.email === req.body.email);
  if (user) return res.send({ status: 400, message: 'user already exist' });
  user = { id: users.length + 1, ...req.body };
  const salt = await bcrypt.genSalt(15);
  user.password = await bcrypt.hash(user.password, salt);
  const token = Jwt.sign(
    { _email: user._email, _firstName: user._firstName, _lastName: user._lastName },
    'jwtPrivateKey'
  );
  await users.push(user);
  return res.send({ status: 201, token });
  // });
};
export { createUser };
