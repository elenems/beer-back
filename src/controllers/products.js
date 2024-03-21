const { validationResult } = require('express-validator');
const validator = require('validator');
const { selectAllProducts, insertProduct, deleteProduct, updateProduct, setIsStar } = require("../models/products")

async function getAllProducts() {
  try {
    const data = await selectAllProducts()
    return data
  } catch (e) {
    throw e
  }
}

async function addNewProduct(req) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsStringified = errors
        .array()
        .reduce(
          (acc, next) => acc + `Field: ${next.path}. Message: ${next.msg}. `,
          '',
        );
      throw(errorsStringified);
    }
    const message = await insertProduct(req.body);
    return message;
  } catch (e) {
    throw e;
  }
}

async function deleteProductById(id){
  const sanitizedId = validator.escape(id);
  try {
    const message = await deleteProduct(sanitizedId)
    return message
  } catch(e) {
    throw e;
  }
}

async function toggleStarProductById(id, isStar) {
  const sanitizedId = validator.escape(id);
  try {
    const { message } = await setIsStar(sanitizedId, isStar);
    return message
  } catch(e) {
    throw e;
  }
}

async function updateProductById(id, req) {
  const sanitizedId = validator.escape(id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsStringified = errors
      .array()
      .reduce(
        (acc, next) => acc + `Field: ${next.path}. Message: ${next.msg}. `,
        '',
      );
    throw errorsStringified;
  }
  try {
    const { message } = await updateProduct({
      ...req.body,
      id: sanitizedId,
    });
    return message;
  } catch (e) {
    console.log(e, ' e')
    throw e;
  }
}

exports.getAllProducts = getAllProducts
exports.addNewProduct = addNewProduct
exports.deleteProductById = deleteProductById
exports.updateProductById = updateProductById
exports.toggleStarProductById = toggleStarProductById