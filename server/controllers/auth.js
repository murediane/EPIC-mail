import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from '../database/db';

dotenv.config();

const createUser = async (req, res) => {
  try {
    const query = `INSERT INTO
            users("firstname", "lastname", email,  password, "role")
            VALUES($1, $2, $3, $4, $5)
            returning id, "firstname", "lastname", email, "role"`;

    const user = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      bcrypt.hashSync(req.body.password, 15),
      req.body.role
    ];
    const checkUser = await db.query('SELECT * FROM users WHERE email=$1', [
      req.body.email
    ]);

    if (checkUser.rows.length > 0) {
      return res.status(422).json({
        status: 422,
        error: 'you already have an account try to login'
      });
    }
    // const salt = await bcrypt.genSalt(15);
    // user.password = await bcrypt.hash(user.password, salt);

    const { rows } = await db.query(query, user);
    const token = Jwt.sign(
      {
        userId: rows[0].id,
        firstName: rows[0].firstName,
        lastName: rows[0].lastName,
        role: rows[0].role
      },
      'jwtPrivateKey'
    );
    return res.status(201).json({
      status: 201,
      data: token
    });
  } catch (error) {
    // handle every error thrown by the promise rejections
    // return res.status(500).json({ error });
    console.log({ error });
  }
};
const login = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [
      req.body.email
    ]);
    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i += 1) {
        if (bcrypt.compareSync(req.body.password, rows[i].password)) {
          const token = await Jwt.sign(
            { useId: rows[i].id, role: rows[i].role },
            'jwtPrivateKey'
          );
          return res.status(200).json({ status: 200, data: [{ token }] });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(400).json({
    status: 400,
    error: 'Wrong email or password'
  });
};
export { login, createUser };
