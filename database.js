const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./diary.db', (err) => {
    if (err) {
        console.error('gagal terkoneksi ke database:', err.message);
    } else {
        console.log('Sukses terkoneksi ke database SQLite (diary.db).');
    }
});

db.serialize(() =>{
    db.run(`
        CREATE TABLE IF NOT EXISTS catatan (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            judul TEXT NOT NULL,
            isi TEXT NOT NULL,
            tanggal DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;