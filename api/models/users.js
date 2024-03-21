const db = require('../database/db');

function selectAllUsers() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (e, results) => {
      if (e) return reject(err);
      resolve(results)
    });
  });
}

async function insertProduct({ name, passwordHash }) {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (username, password_hash, userRole) VALUES (?, ?, ?)',
      [name, passwordHash, 2],
      (e) => {
        if (e) reject(e);
        resolve({ message: 'User added successfully!' });
      },
    );
  });
}
async function updateProduct(id, { name, passwordHash }) {
  const fields = []
  name && fields.push(name)
  passwordHash && fields.push(passwordHash)
  fields.push(id)
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET ${name ? 'username = ?' : ''} ${passwordHash ? ',password_hash = ?' : ''} WHERE id = ?`,
      fields,
      (e) => {
        if (e) reject(e);
        resolve({ message: 'User updated successfully!' });
      },
    );
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (e, results) => {
      if (e) reject(e);
      if (results.length === 0) {
        reject(`Could not find a user`)
      }

      if(results[0].userRole === 1) {
        reject("Can't remove admin")
      }

      db.query('DELETE FROM users WHERE id = ?', [id], (e) => {
        if (e) reject(e)
        resolve({ message: `User deleted successfully!` })
      });
    });
  })
}

exports.selectAllUsers = selectAllUsers
exports.insertProduct = insertProduct
exports.deleteUser = deleteUser
exports.updateProduct = updateProduct
