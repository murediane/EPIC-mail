import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  const token = req.headers['access-token'] || req.body['access-token'] || null;

  if (!token) {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        error: 'failed to authenticate token'
      });
    }
    req.userId = decoded.userId || null;
    req.role = decoded.role || null;
    next();
    return true;
  });
  return true;
};

export default checkToken;
