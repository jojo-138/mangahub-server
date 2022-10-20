const db = require('../lib/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
  return await db.transaction(async({ fname, username, password }, connection) => {
    if (!fname || !username || !password) return res.status(400).send({ status: 'error', msg: 'One or more credentials missing. Please complete register form.' });
    try {
      password = bcrypt.hashSync(password, 14); // hash password 
      await connection.execute('INSERT INTO login (username, hash) VALUES (?, ?)', [username, password]);
      const [[ userId ]] = await connection.execute(`SELECT user_id FROM login WHERE username = ?`, [username]);
      await connection.execute('INSERT INTO users (user_id, fname) VALUES (?, ?)', [userId.user_id, fname]);
      const token = jwt.sign({ user_id: userId.user_id }, process.env.JWT_KEY, { expiresIn: 60 * 60 }); // JWT expires in an hour
      await connection.commit();
      return res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).send({ status: 'success', msg: 'User account successfully created.'});
    } catch (err) {
      console.error(`An error occurred while registering: ${err.message}`);
      return err.message.includes('Duplicate entry') ? res.status(400).send({ status: 'error', msg: 'Username has been used. Try another.' })
      : res.status(500).send({ status: 'error', msg: 'Server error occurred.' });
    }
  }, req.body);
};

module.exports = { registerUser };

// TODO:
// remove jwt cookie when signing out
// how to refresh jwt after expiration