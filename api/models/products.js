const db = require('../database/db');

function selectAllProducts() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products', (e, results) => {
      if (e) return reject(err);
      resolve(results)
    });
  });
}

function insertProduct({ name, description, price }) {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
      [name, description, price],
      (e) => {
        if (e) reject(e);
        resolve({ message: 'Product added successfully!' });
      },
    );
  });
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (e, results) => {
      if (e) reject(e);
      if (results.length === 0) {
        reject(`Could not find a product with id ${id}`)
      }

      db.query('DELETE FROM products WHERE id = ?', [id], (e) => {
        if (e) reject(e)
        resolve({ message: `Product deleted successfully!` })
      });
    });
  })
}

function updateProduct({ id, ...args }) {
  const entries = Object.entries(args)
  const keys = entries.map(en => en[0]).join(' = ?, ')
  const values = entries.map(en => en[1])
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE products SET ${keys} = ? WHERE id = ?`,
      [...values, id],
      (e) => {
        if (e) reject(e);
        resolve({ message: `Product updated successfully!` });
      },
    );
  })
}

function setIsStar(id, isStar) {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE products SET isStar = ? WHERE id = ?',
      [isStar, id],
      (e) => {
        if (e) reject(e);
        resolve({ message: isStar ? `Product added to favoutires` : 'Product removed from favourites' });
      },
    );
  })
}


exports.selectAllProducts = selectAllProducts
exports.insertProduct = insertProduct
exports.deleteProduct = deleteProduct
exports.updateProduct = updateProduct
exports.setIsStar = setIsStar
