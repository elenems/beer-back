const { getAllUsers, addNewUser, deleteUserById, updateUserById } = require('../controllers/users');
const { checkAuthentication, checkAuthorization } = require('../controllers/auth');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.use(checkAuthentication, checkAuthorization);

router.get('/', async (_, res) => {
  try{
    const data = await getAllUsers()
    return res.status(200).json({ message: 'Users retrieved successfuly', data })
  } catch (e) {
    return res.status(400).json({ message: e, error: e });
  }
});

router.post('/', 
  [
    body('name').isLength({ min: 1 }).trim().escape(),
    body('password').isLength({ min: 8 }).trim().escape(),
  ], 
  async (req, res) => {
    try {
      const { message } = await addNewUser(req);
      return res.status(200).json({ message });
    } catch (e) {
      return res.status(400).json({ message: e, error: e });
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const { message } = await deleteUserById(req.params.id)
    return res.status(200).json({ message });
  } catch(e) {
    return res.status(400).json({ message: e, error: e });
  }
});

router.put(
  '/:id',
  [
    body('name').trim().escape(),
    body('password').trim().escape(),
  ],
  async (req, res) => {
    try {
      if(req.body.password && req.body.password.length < 8) {
        throw 'Password should be at least 8 characters'
      }
      const { message } = await updateUserById(req.params.id, req);
      return res.status(200).json({ message });
    } catch (e) {
      return res.status(400).json({ message: e, error: e });
    }
  },
);

module.exports = router;