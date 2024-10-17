const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
    return res.status(400).json({ error: 'Form hasnt been completed' });
}
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash){
            db.run(query, [username, password], function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Error while registering an user' });
                }
                res.status(201).json({ message: 'User registered!', userId: this.lastID });
            });
        })
    })
});

const db = new sqlite3.Database('./main.db', (err) => {
    if (err) {
        console.error('Error while connecting to SQLite:', err)
    } else {
        console.log("Connecting to SQLite")
        db.run(`
        CREATE TABLE IF NOT EXISTS users(
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )`)
    }
});

app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`)
});
