import Router from 'express';
import { createUser } from '../controllers/user';
import { createAuth } from '../controllers/auth';
const router = Router();
const entry = '/auth';
// create Meetups route

router.post(`${entry}/user`, createUser);
router.post(`${entry}/signup`, createAuth);
export default router;
