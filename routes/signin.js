const db = require('../lib/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signinUser = async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ status: 'error', msg: 'One or more credentials missing. Please complete sign in form.' });
  const [ data ] = await db.query('SELECT user_id, hash FROM login WHERE username = ?', [username]); // username doesn't exist
  if (!data) return res.status(400).send({ status: 'error', msg: 'Incorrect credentials. Try again.' });
  const isPasswordCorrect = bcrypt.compareSync(password, data.hash);
  if (!isPasswordCorrect) return res.status(400).send({ status: 'error', msg: 'Incorrect credentials. Try again.' }); // incorrect password
  const token = jwt.sign({ user_id: data.user_id }, process.env.JWT_KEY, { expiresIn: 60 * 60 }); // JWT expires in an hour
  isPasswordCorrect ? 
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).send({ status: 'success', msg: 'User successfully signed in.' }) :
    res.status(500).send({ status: 'error', msg: 'Server error occurred' });
}

module.exports = { signinUser };