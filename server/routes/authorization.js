import Router from 'express';
import { login, createUser } from '../controllers/auth';
import { userValidate, validateAuth } from '../middleware/validatedata';

const router = Router();
const entry = '/auth';
// create authentication route

router.post(`${entry}/signup`, userValidate, createUser);
router.post(`${entry}/login`, validateAuth, login);
export default router;
