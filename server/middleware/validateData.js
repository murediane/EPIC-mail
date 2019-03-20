import { validateMessage, validateUser, validateGroup } from '../helpers/validator';

const validateSignup = async (req, res, next) => {
  try {
    await validateUser(req.body);
    next();
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }
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
const validateNewGroup = async (req, res, next) => {
  try {
    await validateGroup(req.body);
    next();
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }
  }
};
export { validateNewMessage, validateSignup, validateNewGroup };
