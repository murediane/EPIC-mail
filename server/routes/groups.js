import Router from 'express';
import checkToken from '../middleware/checkToken';
import { validateNewGroup } from '../middleware/validateData';
import { createGroups, getAllGroups, updateGroup ,deleteGroup} from '../controllers/groups';

const router = Router();
const groupEntry = '/groups';
// create group route

router.post(`${groupEntry}`, checkToken, validateNewGroup, createGroups);
router.get(`${groupEntry}`, checkToken, getAllGroups);
router.patch(`${groupEntry}/:id/name`, checkToken, validateNewGroup, updateGroup);
router.delete(`${groupEntry}/:id`, checkToken, deleteGroup);
export default router;
