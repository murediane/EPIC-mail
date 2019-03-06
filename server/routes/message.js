import Router from 'express';
import {
  createMessage,
  getAllMessages,
  getUnreadMessages,
  getSentMessages,
  getMessage,
  deleteMessage
} from '../controllers/messages';

const route = Router();
const entryPoint = '/messages';
//  message routes

route.post(`${entryPoint}`, createMessage);
route.get(`${entryPoint}`, getAllMessages);
route.get(`${entryPoint}/unread`, getUnreadMessages);
route.get(`${entryPoint}/sent`, getSentMessages);
route.get(`${entryPoint}/:id`, getMessage);
route.delete(`${entryPoint}/:id`, deleteMessage);
export default route;
