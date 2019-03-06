import { validateMessage } from '../helpers/validator';
import { messages } from '../models';

const createMessage = (req, res) => {
  const { error } = validateMessage(req.body);

  if (error) return res.status(404).send(error.details[0].message);
  const message = { id: messages.length + 1, createdOn: new Date(), ...req.body };
  messages.push(message);
  return res.send({ status: 201, message });
};
export { createMessage };
