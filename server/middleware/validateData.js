import { validateMessage } from '../helpers/validator';
// import db from '../database/db';

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
export { validateNewMessage };
