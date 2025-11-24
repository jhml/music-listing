const Datastore = require('nedb');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const productsRaw = new Datastore({
  filename: path.join(dataDir, 'products.db'),
  autoload: true,
});
const usersRaw = new Datastore({
  filename: path.join(dataDir, 'users.db'),
  autoload: true,
});

function promisifyDb(db) {
  return {
    find: (q = {}) =>
      new Promise((res, rej) =>
        db.find(q, (err, docs) => (err ? rej(err) : res(docs))),
      ),
    findOne: (q = {}) =>
      new Promise((res, rej) =>
        db.findOne(q, (err, doc) => (err ? rej(err) : res(doc))),
      ),
    insert: (doc) =>
      new Promise((res, rej) =>
        db.insert(doc, (err, newDoc) => (err ? rej(err) : res(newDoc))),
      ),
    update: (q, update, opts = {}) =>
      new Promise((res, rej) =>
        db.update(q, update, opts, (err, numAffected) =>
          err ? rej(err) : res(numAffected),
        ),
      ),
    remove: (q, opts = {}) =>
      new Promise((res, rej) =>
        db.remove(q, opts, (err, numRemoved) =>
          err ? rej(err) : res(numRemoved),
        ),
      ),
  };
}

module.exports = {
  productsDB: promisifyDb(productsRaw),
  usersDB: promisifyDb(usersRaw),
  raw: { productsRaw, usersRaw },
};
