const { validationResult } = require('express-validator');
const validator = require('validator');
const { selectAllUsers, insertProduct, deleteUser, updateProduct } = require("../models/users")
const bcrypt = require('bcrypt');

async function getAllUsers() {
  try {
    const data = await selectAllUsers()
    return data
  } catch (e) {
    throw e
  }
}

async function addNewUser(req) {
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
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const message = await insertProduct({ ...req.body, passwordHash });
    return message;
  } catch (e) {
    throw e
  }
}
async function updateUserById(id, req) {
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
    let passwordHash = {};


    if(req.body.password) {
      passwordHash.passwordHash = await bcrypt.hash(req.body.password, 10)
    }

    const message = await updateProduct(id, { ...req.body, ...passwordHash });
    return message;
  } catch (e) {
    throw e
  }
}

async function deleteUserById(id) {
  const sanitizedId = validator.escape(id);
  try {
    const message = await deleteUser(sanitizedId)
    return message
  } catch(e) {
    throw e;
  }
}

exports.getAllUsers = getAllUsers
exports.addNewUser = addNewUser
exports.deleteUserById = deleteUserById
exports.updateUserById = updateUserById
