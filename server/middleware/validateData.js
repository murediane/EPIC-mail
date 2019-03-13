import bcrypt from 'bcrypt';
import { validateUser, validateMessage } from '../helpers/validator';
import { users } from '../models';

const userValidate = async (req, res, next) => {
  try {
    await validateUser(req.body);
    let user = await users.find(u => u.email === req.body.email);
    if (!user);
    next();
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    return res.status(422).json({ status: 422, message: 'user already exist' });
  }
};
const validateAuth = async (req, res, next) => {
  try {
    const user = await users.find(u => u.email === req.body.email);
    if (user);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: 'invalid email or password' });
  }
};
const validateNewMessage = async (req, res, next) => {
  try {
    await validateMessage(req.body);
    next();
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }
  }
};
export { userValidate, validateAuth, validateNewMessage };
