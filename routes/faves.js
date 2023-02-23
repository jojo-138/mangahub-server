const db = require('../lib/db');

const getUserFaves = async (req, res) => {
	const faveMangas = await db.query(
		'SELECT manga_id, provider FROM fave_mangas WHERE user_id = ?',
		[req.user_id]
	);
	return res.send({ status: 'success', faves: faveMangas });
};

module.exports = { getUserFaves };
