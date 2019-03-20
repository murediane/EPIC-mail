import db from '../database/db';

const createMessage = async (req, res) => {
  try {
    const receiver = await db.query('SELECT * FROM users WHERE id = $1', [
      req.body.receiver
    ]);
    if (receiver) {
      console.log(receiver);
      const text = `INSERT INTO
    messages("subject", "receiveruserid","parentmessageid","message","sender", "status")
    VALUES($1, $2, $3,$4,$5,$6)
    returning *`;

      const values = [
        req.body.subject,
        req.body.receiver,
        req.body.parentMessageId,
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
    }
  } catch (error) {
    console.log(error);
  }
};
const getAllReceivedMessages = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM messages WHERE receiveruserid = $1',
      [req.user.id]
    );
    if (rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: rows
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error
    });
  }
  return res.status(200).json({
    status: 200,
    message: 'there is no received messages'
  });
};

const getMessage = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM messages WHERE id=$1', [
      req.params.id
    ]);

    if (rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: rows
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error
    });
  }
  return res.status(200).json({
    status: 200,
    message: 'Message not found'
  });
};
const getSentMessages = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM messages WHERE receiver = $1', [
      req.user.id
    ]);
    if (rows.length > 0) {
      const message = rows.sta;
      return res.status(200).json({
        status: 200,
        data: message
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error
    });
  }
  return res.status(200).json({
    status: 200,
    message: 'The message is not found'
  });
};
const deleteMessage = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM messages WHERE id=$1', [
      req.params.id
    ]);
    if (!rows) {
      return res.status(404).json({
        status: 404,
        message: 'invalid id'
      });
    }
    const rows1 = await db.query('DELETE FROM messages WHERE id=$1 returning *', [
      req.params.id
    ]);
    return res.status(200).json({
      status: 200,
      message: 'message deleted'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error
    });
  }
};

export {
  createMessage,
  getAllReceivedMessages,
  getSentMessages,
  getMessage,
  deleteMessage
};
