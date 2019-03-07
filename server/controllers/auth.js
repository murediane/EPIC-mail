import { validateAuth } from '../helpers/validator';
import { users } from '../models';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import _ from 'lodash';
const login = async (req, res) => {
  try {
    await validateAuth(req.body);
    let user = await users.find(u => u.email === req.body.email);
    if (!user)
      return res.json({ status: 400, message: 'invalid email or password' });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ status: 400, message: 'invalid email or password' });
    const token = Jwt.sign({ _email: user._email }, 'jwtPrivateKey');
    return res.status(201).json({ status: 201, token });
  } catch (error) {
    if (error.details) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    return res.status(500).json({ message: 'Unexpected error happened.' });
  }
};
export { login };
