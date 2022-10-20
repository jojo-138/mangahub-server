const db = require('../lib/db');

const unfollowManga = (req, res) => {
  db.query('DELETE FROM fave_mangas WHERE user_id = ? AND manga_id = ?', [req.user_id, req.body.mangaId])
    .then(() => res.send({ status: 'success', msg: `Unfollowed ${req.params.mangaId}` }))
    .catch(e => {
      console.error(e.message);
      res.status(503).send({ status: 'error', msg: 'An error occurred. Refresh page and try again.' })
    })
}

module.exports = { unfollowManga };