import db from '../database/db';

const createMessage = async (req, res) => {
  try {
    const text = `INSERT INTO
    messages("subject", "receiver", "message","sender", "status")
    VALUES($1, $2, $3,$4,$5)
    returning *`;

    const values = [
      req.body.subject,
      req.body.receiver,
      req.body.message,
      req.user.id,
      req.body.status
    ];
    const { rows } = await db.query(text, values);
    console.log(rows);
    if (rows.length > 0) {
      return res.status(201).json({
        status: 201,
        data: rows
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getAllMessages = async (req, res) => {
  const data = await db.query('SELECT * FROM messages WHERE receiver=$1', [
    req.user.id
  ]);
  res.send({ status: 200, data });
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
