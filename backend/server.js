const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: 'root',
  password: 'durgapur123',
  database: 'studyace',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); 
  } else {
    console.log('Connected to MySQL database');

    

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});

app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM todo', (queryErr, results) => {
    if (queryErr) {
      res.status(500).json({ error: queryErr.message });
      return;
    }
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { task_title, status } = req.body;
  connection.query('INSERT INTO todo (task_title, status) VALUES (?, ?)', [task_title, status], (queryErr, results) => {
    if (queryErr) {
      res.status(500).json({ error: queryErr.message });
      return;
    }
    res.json({ task_id: results.insertId, task_title, status });
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('DELETE FROM todo WHERE task_id = ?', [taskId], (queryErr) => {
    if (queryErr) {
      res.status(500).json({ error: queryErr.message });
      return;
    }
    res.sendStatus(200);
  });
});
app.post('/updatetasks', (req, res) => {
  const { key } = req.body;
  connection.query('UPDATE todo SET status=1 WHERE task_id= ?' , [key], (queryErr, results) => {
    if (queryErr) {
      res.status(500).json({ error: queryErr.message });
      console.log(queryErr.message)
      return;
    }
    res.json({ task_id: results.insertId });
  });
});
