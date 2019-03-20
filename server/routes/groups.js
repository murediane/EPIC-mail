import Router from 'express';
import checkToken from '../middleware/checkToken';
import { createGroups, getAllGroups } from '../controllers/groups';

const router = Router();
const groupEntry = '/groups';
// create group route

router.post(`${groupEntry}`, checkToken, createGroups);
router.get(`${groupEntry}`, checkToken, getAllGroups);
export default router;
