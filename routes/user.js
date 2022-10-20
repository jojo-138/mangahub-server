const db = require('../lib/db');

const getUser = async(req, res) => {
  const [ data ] = await db.query('SELECT fname, faves_amount, joined_at FROM users WHERE user_id = ?', [req.user_id]);
  if (!data) return res.status(404).send({ status: 'error', msg: 'User not found.' });
  const formattedDate = data.joined_at.toISOString().split('T')[0];
  return res.send({
    status: 'success',
    user: {
      fname: data.fname,
      favesAmount: data.faves_amount,
      joinedAt: formattedDate
    }
  });
}

module.exports = { getUser };