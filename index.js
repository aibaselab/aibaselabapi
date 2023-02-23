import express from 'express';
import mysql from 'mysql';
const app = express();
const port = process.env.PORT || 8800;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const db = mysql.createConnection({
    host: '143.198.161.19',
    user: 'sql_aibaselab_co',
    password: 'wCSBfnmMELrSaRWG',
    database: 'sql_aibaselab_co'
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.get('/api/getData', (req, res) => {
    let userName = req.query.email;
    let password = req.query.password;
    const sqlSelect = `SELECT email, password, data FROM users WHERE email = '${userName}'`;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));
