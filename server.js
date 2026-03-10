const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "ds_portfolio"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// Get projects
app.get("/projects", (req, res) => {
    db.query("SELECT * FROM projects", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching projects");
        } else {
            res.json(results);
        }
    });
});

// Save contact form
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err) => {
        if (err) {
            res.status(500).send("Error saving message");
        } else {
            res.send("Message sent successfully!");
        }
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});