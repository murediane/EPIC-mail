import { validateMessage } from '../helpers/validator';
import { messages } from '../models';

const createMessage = (req, res) => {
  const { error } = validateMessage(req.body);

  if (error) return res.status(404).send(error.details[0].message);
  const message = { id: messages.length + 1, createdOn: new Date(), ...req.body };
  messages.push(message);
  return res.send({ status: 201, message });
};
const getAllMessages = (req, res) => {
  res.send({ status: 200, messages });
};
const getUnreadMessages = (req, res) => {
  const unread = messages.filter(m => m.status === 'unread');
  return res.send(unread);
};
export { createMessage, getAllMessages, getUnreadMessages };
