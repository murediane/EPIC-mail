import { messages } from '../models';

const createMessage = (req, res) => {
  const data = { id: messages.length + 1, createdOn: new Date(), ...req.body };
  messages.push(data);
  return res.send({ status: 201, data });
};
const getAllMessages = (req, res) => {
  res.send({ status: 200, data: messages });
};
const getUnreadMessages = (req, res) => {
  const unread = messages.filter(findMessage => findMessage.status === 'unread');
  return res.send(unread);
};
const getSentMessages = (req, res) => {
  const sent = messages.filter(findMessage => findMessage.status === 'sent');
  return res.send({ status: 200, data: sent });
};
const getMessage = (req, res) => {
  const { id } = req.params;
  const message = messages.find(findMessage => findMessage.id === parseInt(id));
  if (!message)
    return res
      .status(404)
      .send({ message: 'the message with a given id does not exist' });
  return res.send({ status: 200, data: message });
};

const deleteMessage = (req, res) => {
  const { id } = req.params;
  const message = messages.find(findMessage => findMessage.id === parseInt(id));
  if (!message) return res.status(404).send({ msg: 'invalid id' });
  const index = messages.indexOf(message);
  messages.splice(index, 1);
  return res.send({ status: 200, message: 'message deleted' });
};
export {
  createMessage,
  getAllMessages,
  getUnreadMessages,
  getSentMessages,
  getMessage,
  deleteMessage
};
