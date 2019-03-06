import Router from 'express';
import {
  createMessage,
  getAllMessages,
  getUnreadMessages
} from '../controllers/messages';

const route = Router();
const entryPoint = '/messages';
//  message routes

route.post(`${entryPoint}`, createMessage);
route.get(`${entryPoint}`, getAllMessages);
route.get(`${entryPoint}/unread`, getUnreadMessages);
export default route;
