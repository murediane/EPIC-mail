import Router from 'express';
import { login, createUser } from '../controllers/auth';
import { validateSignup } from '../middleware/validateData';
const router = Router();
const entry = '/auth';
// create authentication route

router.post(`${entry}/signup`, validateSignup, createUser);
router.post(`${entry}/login`, login);
export default router;
