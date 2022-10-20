const jwt = require('jsonwebtoken');
const db = require('../lib/db');

const isFollowing = async(req, res) => {
  const token = req.cookies.token;
  if (!token) return res.send({ following: false }); // user not logged in, automatic false
  const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  const [ data ] = await db.query('SELECT EXISTS(SELECT * FROM fave_mangas WHERE user_id = ? AND manga_id = ?)', [decoded.user_id, req.query.mangaId]);
  const areIdsCorrect = data['EXISTS(SELECT * FROM fave_mangas WHERE user_id = ? AND manga_id = ?)'];
  return areIdsCorrect ? res.send({ following: true }) : res.status(404).send({ following: false });
}

module.exports = { isFollowing };