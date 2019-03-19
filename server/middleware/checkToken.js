import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const token = req.headers['access-token'];
  if (!token) {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }
  try {
    const payload = await jwt.verify(token, 'jwtPrivateKey');
    req.user = payload;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
