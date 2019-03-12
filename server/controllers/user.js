import { validateUser } from '../helpers/validator';
import { users } from '../models';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
const createUser = async (req, res) => {
  try {
    await validateUser(req.body);
    let user = await users.find(u => u.email === req.body.email);
    if (user)
      return res.status(400).json({ status: 400, message: 'user already exist' });
    user = { id: users.length + 1, ...req.body };
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
    if (error.details) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // handle every error thrown by the promise rejections
    return res.status(500).json({ message: 'Unexpected error happened.' });
  }

  // });
};
export { createUser };
