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
const getSentMessages = (req, res) => {
  const sent = messages.filter(m => m.status === 'sent');
  return res.send(sent);
};
const getMessage = (req, res) => {
  const { id } = req.params;
  const message = messages.find(m => m.id === parseInt(id));
  if (!message)
    return res
      .status(404)
      .send({ message: 'the message with a given id does not exist' });
  return res.send(message);
};
const deleteMessage = (req, res) => {
  const { id } = req.params;
  const message = messages.find(m => m.id === parseInt(id));
  if (!message) return res.status(404).send({ msg: 'invalid id' });
  const index = messages.indexOf(message);
  messages.splice(index, 1);
  return res.send({ status: 200, msg: 'message deleted' });
};
export {
  createMessage,
  getAllMessages,
  getUnreadMessages,
  getSentMessages,
  getMessage,
  deleteMessage
};
