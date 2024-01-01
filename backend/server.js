const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;
const salt=10;
require ("dotenv").config();

app.use(cors({
  origin: ["http://localhost:3002"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

const connection = mysql.createConnection({
  
    host: process.env.connection_HOST,
    port: process.env.connection_PORT ,
    user: process.env.connection_USER ,
    password: process.env.connection_PASSWORD ,
    database: process.env.connection_NAME ,
    
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


app.post('/register', (req, res) => {
  
  const sql = "INSERT INTO users (name, email, password) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });

    const values = [
      req.body.name,
      
      req.body.email,
      hash
    ];

    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.json({ Error: "Inserting data error in server" });
      }
      console.log('Data inserted successfully');
      return res.json({ Status: "Values entered successfully" });
    });
  });
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received a login request');
  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], (err, data) => {
    console.log(1)
    if (err) {
      console.error('Login error in server:', err);
      return res.status(500).json({ Error: "Login error in server" });
    }

    if (data.length > 0) {
      console.log(2)
      bcrypt.compare(password.toString(), data[0].password, (err, response) => {
        if (err) {
          console.error('Password compare error:', err);
          return res.status(500).json({ Error: "Password compare error" });
        }
        if(response) {
          console.log(3)
          const Email = data[0].email;
         /* const token = jwt.sign(data[0].name, "jwt-secret-key", {expiresIn: '1d'});
          res.cookie('token', token);*/
          return res.status(200).json({ message: "login successful" });
        } else {
          return res.json({Error: "Password not matched"});
        }
      })
    } else {
        return res.json({Error: "Email doesn't exist"});
    }
  })
})