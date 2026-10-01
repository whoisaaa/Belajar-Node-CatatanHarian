const express = require('express')
const app = express();
const PORT = 3000;
const db = require('./database');

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server Catatan Harian sudah aktif dan aman!')
});

app.listen(PORT, () => {
    console.log(`Server berjalan sukses di http://localhost:${PORT}`);
    
})