const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { selectUserByUsername } = require('../models/auth');
const { ADMIN_ROLE } = require('../config');

const TOKEN_EXPIRE_TIME = '1d';

const checkAuthentication = (req, res, next) => {
  const token = req.headers?.['authorization']?.split(' ')?.[1];
  if (!token || token === 'undefined') {
    return res
      .status(401)
      .json({ error: 'Unauthenticated', message: 'No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'Invalid token.' });
  }
};

const checkAuthorization = (req, res, next) => {
  if (req.user?.userRole !== ADMIN_ROLE) {
    return res
      .status(403)
      .json({
        error: 'Unauthorized',
        message: 'Forbidden: You do not have the necessary permissions.',
      });
  }
  next();
};

async function authenticateUser(username, password) {
  try {
    const user = await getUser(username, password);
    if (user) {
      const token = jwt.sign(
        { username, userRole: user.userRole },
        process.env.SECRET_KEY,
        { expiresIn: TOKEN_EXPIRE_TIME },
      );
      return token;
    }
  } catch (e) {
    throw e;
  }
}

async function getUser(username, password) {
  try {
    const user = await selectUserByUsername(username);
    const isValidPassword =
      user && (await bcrypt.compare(password, user?.password_hash));
    if (isValidPassword) {
      return user;
    } else {
      throw 'Invalid username or password';
    }
  } catch (e) {
    throw e;
  }
}

exports.checkAuthentication = checkAuthentication;
exports.checkAuthorization = checkAuthorization;
exports.authenticateUser = authenticateUser;
