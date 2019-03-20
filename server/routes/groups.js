import Router from 'express';
import checkToken from '../middleware/checkToken';
import { createGroups } from '../controllers/groups';

const router = Router();
const groupEntry = '/groups';
// create authentication route

router.post(`${groupEntry}`, checkToken, createGroups);
export default router;
