const db = require('../lib/db');

const followManga = (req, res) => {
  db.query('INSERT INTO fave_mangas (user_id, manga_id) VALUES (?, ?)', [req.user_id, req.body.mangaId])
    .then(() => res.send({ status: 'success', msg: `Following ${req.params.mangaId}` }))
    .catch(e => {
      console.error(e.message);
      res.status(503).send({ status: 'error', msg: 'An error occurred. Refresh page and try again.' })
    })
}

module.exports = { followManga };