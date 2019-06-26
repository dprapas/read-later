const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.slite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    const drop = 'DROP TABLE IF EXISTS articles';
    const sql = `CREATE TABLE IF NOT EXISTS articles (id integer primary key, title, content TEXT)`;
    const insert = `INSERT INTO articles VALUES (1, 'Title', 'Content')`;
    db.run(drop);
    db.run(sql);
    db.run(insert);
});

class Article {
    static all(cb) {
        db.all('SELECT * FROM articles', cb);
    }

    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb);
    }

    static create(data, cb) {
        const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
        db.run(sql, data.title, data.content, cb);
    }
}

module.exports = db;
module.exports.Article = Article;