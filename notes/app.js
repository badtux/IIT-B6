const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

// Create and connect to SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table for notes
db.serialize(() => {
  db.run("CREATE TABLE notes (id INTEGER PRIMARY KEY, title TEXT, content TEXT)");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  db.all("SELECT * FROM notes", (err, notes) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('index', { notes });
    }
  });
});

app.get('/note/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get("SELECT * FROM notes WHERE id = ?", [id], (err, note) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('note', { note });
    }
  });
});

app.post('/note/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.run("DELETE FROM notes WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/');
    }
  });
});

app.post('/note/add', (req, res) => {
  const { title, content } = req.body;
  db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(200);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
