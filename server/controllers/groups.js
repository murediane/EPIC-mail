import joi from 'joi';
import db from '../database/db';

const createGroups = async (req, res) => {
  if (req.user.role !== 'Groupadmin') {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }
  try {
    const text = `INSERT INTO
            groups(groupname, groupowner)
            VALUES($1, $2)
            returning *`;

    const values = [req.body.groupName, req.user.id];

    const { rows } = await db.query(text, values);

    if (rows.length > 0) {
      return res.status(201).json({
        status: 201,
        data: rows
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    status: 200,
    message: 'group not created'
  });
};
const getAllGroups = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM groups');

    if (rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: rows
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    status: 200,
    office: 'No group in the database'
  });
};
const updateGroup = async (req, res) => {
  if (req.user.role !== 'Groupadmin') {
    return res.status(401).json({
      error: 'unauthorized access'
    });
  }
  try {
    const { rows } = await db.query('SELECT * FROM groups WHERE id=$1', [
      req.params.id
    ]);
    if (!rows) {
      return res.status(404).json({
        status: 404,
        message: 'invalid id'
      });
    }

    const rows1 = await db.query(
      'UPDATE groups SET groupname=$1 WHERE id=$2 returning *',
      [req.body.groupName, req.params.id]
    );
    return res.status(200).json({
      status: 200,
      data: [rows1.rows[0]]
    });
  } catch (error) {
    // return res.status(500).json({
    //   status: 500,
    //   message: error
    // });
    console.log(error);
  }
};
export { createGroups, getAllGroups, updateGroup };
