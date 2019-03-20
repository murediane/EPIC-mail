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
export { createGroups };
