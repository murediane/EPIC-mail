import Router from 'express';
import { createUser } from '../controllers/user';
import { login } from '../controllers/auth';
const router = Router();
const entry = '/auth';
// create Meetups route

router.post(`${entry}/signup`, createUser);
router.post(`${entry}/login`, login);
export default router;
