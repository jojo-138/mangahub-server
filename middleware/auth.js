const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  if (!req.cookies.token) return res.status(401).send({ status: 'error', msg: 'Unauthorized' });
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).send({ status: 'error', msg: 'Unauthorized' });
  }
}

module.exports = { requireAuth };