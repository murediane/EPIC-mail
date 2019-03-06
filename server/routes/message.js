import Router from 'express';
import { createMessage, getAllMessages } from '../controllers/messages';

const route = Router();
const entryPoint = '/messages';
//  message routes

route.post(`${entryPoint}`, createMessage);
route.get(`${entryPoint}`, getAllMessages);
export default route;
