const db = require('../lib/db');

const userIsSignedIn = async(req, res) => {
  try {
    const [ data ] = await db.query('SELECT EXISTS(SELECT * FROM users WHERE user_id = ?)', [req.user_id]);
    const userExists = data['EXISTS(SELECT * FROM users WHERE user_id = ?)'];
    if (userExists) return res.send({ status: 'success', msg: 'User is signed in.' });
  } catch (e) {
    console.error('Error occurred:', e.message);
    return res.status(503).send({ status: 'error', msg: 'An error occurred.' });
  }
}

module.exports = { userIsSignedIn };