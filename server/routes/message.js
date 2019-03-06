import Router from 'express';
import { createMessage } from '../controllers/messages';

const route = Router();
const entrypoint = '/messages';
// create message route

route.post(`${entrypoint}`, createMessage);
// route.post(`${entrypoint}/login`, login);
export default route;
