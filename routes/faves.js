const db = require('../lib/db');

const getUserFaves = async(req, res) => {
  const faveMangas = await db.query('SELECT manga_id FROM fave_mangas WHERE user_id = ?', [req.user_id]);
  if (!faveMangas.length) return res.status(404).send({ status: 'error', msg: 'No favorites found.' });
  const mangaIds = faveMangas.map(item => item.manga_id);
  return res.send({ status: 'success', faves: mangaIds });
}

module.exports = { getUserFaves };