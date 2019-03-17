import Router from 'express';
import { login, createUser } from '../controllers/auth';

const router = Router();
const entry = '/auth';
// create authentication route

router.post(`${entry}/signup`, createUser);
router.post(`${entry}/login`, login);
export default router;
