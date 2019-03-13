import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { users } from '../models';
const createUser = async (req, res) => {
  try {
    const user = { id: users.length + 1, ...req.body };
    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(user.password, salt);
    const token = Jwt.sign(
      {
        _email: user._email,
        _firstName: user._firstName,
        _lastName: user._lastName
      },
      'jwtPrivateKey'
    );
    await users.push(user);
    // const data ={}
    return res.status(201).json({
      status: 201,
      data: [{ token }]
    });
  } catch (error) {
    // handle every error thrown by the promise rejections
    return res.status(500).json({ message: 'Unexpected error happened.' });
  }
};
const login = async (req, res) => {
  try {
    const user = await users.find(u => u.email === req.body.email);
    const token = await Jwt.sign({ email: user.email }, 'jwtPrivateKey');
    return res.status(200).json({ status: 200, data: [{ token }] });
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected error happened.' });
  }
};
export { login, createUser };
