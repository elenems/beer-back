const { authenticateUser } = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const token = await authenticateUser(username, password)
    return res.status(200).json({ message: 'Succesfuly authenticated', data: token })
  } catch(e) {
    return res.status(400).json({ message: e, error: e })
  }
});

module.exports = router;
