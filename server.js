const express = require('express')
const app = express();
const PORT = 3000;
const db = require('./database');
const { encrypt, decrypt } = require('./crypto');

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server Catatan Harian sudah aktif dan aman!')
});

app.post('/catatan', (req,res) => {
const { judul, isi} = req.body;
    
    if (!judul || !isi) {
        return res.status(400).json({ error: 'Judul dan isi tidak boleh kosong!'});
    }

    const judulTerekstrisi = encrypt(judul);
    const isiTerekstrisi = encrypt(isi);

    const query = 'INSERT INTO catatan (judul, isi) VALUES (?, ?)';

    db.run(query, [judulTerekstrisi, isiTerekstrisi], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Gagal menyimpan ke database'})
        }

        res.status(201).json({
            message: 'Catatan harian berhasil disimpan dengan aman!',
            id: this.lastID
        });
    })
})

app.get('/catatan', (req, res) =>{
    const query = 'SELECT * FROM catatan ORDER BY tanggal DESC';

    db.all(query, [], (err, rows) =>{
        if (err) {
            return res.status(500).json({ error: 'Gagal mengambil data dari database'});
        }

        const hasilDekripsi = rows.map(row =>{
            return{
                id: row.id,
                judul: decrypt(row.judul),
                isi: decrypt(row.isi),
                tanggal: row.tanggal
            };
        });

        res.status(200).json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan sukses di http://localhost:${PORT}`);
    
})