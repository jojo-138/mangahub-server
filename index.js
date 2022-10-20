const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { requireAuth } = require('./middleware/auth');
const { userIsSignedIn } = require('./routes/isSignedIn');
const { registerUser } = require('./routes/register');
const { signinUser } = require('./routes/signin');
const { getUser } = require('./routes/user');
const { getUserFaves } = require('./routes/faves');
const { isFollowing } = require('./routes/following');
const { followManga } = require('./routes/follow');
const { unfollowManga } = require('./routes/unfollow');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://jojo-138.github.io', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Server is working!'));
app.get('/is-signed-in', requireAuth, (req, res) => userIsSignedIn(req, res));
app.get('/user', requireAuth, (req, res) => getUser(req, res));
app.get('/faves', requireAuth, (req, res) => getUserFaves(req, res));
app.get('/following', (req, res) => isFollowing(req, res));
app.get('/sign-out', (req, res) => res.clearCookie('token').redirect('https://jojo-138.github.io/mangahub/pages/signin.html'));

app.post('/register', (req, res) => registerUser(req, res));
app.post('/signin', (req, res) => signinUser(req, res));
app.post('/follow/:mangaId', requireAuth, (req, res) => followManga(req, res));

app.delete('/unfollow/:mangaId', requireAuth, (req, res) => unfollowManga(req, res));

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})