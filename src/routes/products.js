const { checkAuthentication, checkAuthorization } = require('../controllers/auth');
const { getAllProducts, addNewProduct, deleteProductById, updateProductById, toggleStarProductById } = require('../controllers/products');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.post(checkAuthentication, checkAuthorization);
router.delete(checkAuthentication, checkAuthorization);
router.put(checkAuthentication, checkAuthorization);

router.get('/', async (_, res) => {
  try{
    const data = await getAllProducts()
    return res.status(200).json({ message: 'Products retrieved successfuly', data })
  } catch (e) {
    return res.status(400).json({ message: e, error: e });
  }
});

router.post('/', 
  [
    body('name').isLength({ min: 1 }).trim().escape(),
    body('description').isLength({ min: 1 }).trim().escape(),
    body('price').isFloat({ gt: 0 }).toFloat()
  ], 
  async (req, res) => {
    try {
      const { message } = await addNewProduct(req);
      return res.status(200).json({ message });
    } catch (e) {
      return res.status(400).json({ message: e, error: e });
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const { message } = await deleteProductById(req.params.id)
    return res.status(200).json({ message });
  } catch(e) {
    return res.status(400).json({ message: e, error: e });
  }
});

router.put(
  '/:id',
  [
    ...['name', 'description', 'packageType', 'color', 'ingredients'].map(
      (textField) => body(textField).isLength({ min: 1 }).trim().escape(),
    ),
    ...[
      'price',
      'specialPrice',
      'alcohol',
      'ibu',
      'og',
      'hoppyness',
      'bitternes',
      'sweetness',
      'sourness',
      'maltiness',
    ].map((numberField) => body(numberField).isFloat({ gt: 0 }).toFloat()),
  ],
  async (req, res) => {
    try {
      const message = await updateProductById(req.params.id, req);
      return res.status(200).json({ message });
    } catch (e) {
      return res.status(400).json({ message: e, error: e });
    }
  },
);

router.post('/star/:id', async (req, res) => {
  try {
    const { value } = req.query;
    console.log(typeof value, ' val')
    const isStar = +value
    const message = await toggleStarProductById(req.params.id, isStar)
    return res.status(200).json({ message });
  } catch(e) {
    return res.status(400).json({ message: e, error: e });
  }
});




module.exports = router;