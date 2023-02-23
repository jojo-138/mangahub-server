const jwt = require('jsonwebtoken');
const db = require('../lib/db');

const isFollowing = async (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.send({ following: false }); // user not logged in, automatic false
	const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
	const [data] = await db.query(
		'SELECT EXISTS(SELECT * FROM fave_mangas WHERE user_id = ? AND manga_id = ? and provider = ?)',
		[decoded.user_id, req.query.mangaId, req.query.provider]
	);
	const userIsFollowing =
		data['EXISTS(SELECT * FROM fave_mangas WHERE user_id = ? AND manga_id = ? and provider = ?)'];
	return userIsFollowing ? res.send({ following: true }) : res.send({ following: false });
};

module.exports = { isFollowing };
