const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;
const axios = require('axios');
const jwt = require('jsonwebtoken');

require("dotenv").config();

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET","DELETE"],
  credentials: true
}));
app.use(express.json());

const connection = mysql.createConnection({

  host: process.env.CONNECTION_HOST ,
  port: process.env.CONNECTION_PORT ,
  user: process.env.CONNECTION_USER ,
  password: process.env.CONNECTION_PASSWORD ,
  database: process.env.NAME ,
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
  }
});

//middleware to verify user
const verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ Error: "Access denied" });
  const verified = jwt.verify(token, process.env.SECRET_KEY);
  if(!verified) return res.status(401).json({ Error: "Access denied" });
  req.email = verified.email;
  next();
 };

// apis for authentication

// 1. login

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(404).json({ Error: "Error fetching data" });
    }
    if (result.length === 0) return res.status(404).json({ Error: "User not found" });
    bcrypt.compare(password.toString(), result[0].password, (err, isMatch) => {
      if (err) return res.status(401).json({ Error: "Error for comparing password" });
      if (!isMatch) return res.status(401).json({ Error: "Invalid credentials" });
      const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
      return res.json({ status: "Login successful", token });
    });
  });
});

// 2. register

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  const selectSql = `SELECT * FROM users WHERE email = ?`;
  connection.query(selectSql, [email], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ Error: `Error fetching data: ${err.message}` });
    }

    if (result.length !== 0) {
      return res.status(400).json({ Error: "User already exists" });
    }

    bcrypt.hash(password.toString(), salt, (hashErr, hash) => {
      if (hashErr) {
        console.error('Error hashing password:', hashErr);
        return res.status(500).json({ Error: `Error hashing password: ${hashErr.message}` });
      }

      const insertSql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      connection.query(insertSql, [name, email, hash], (insertErr) => {
        if (insertErr) {
          console.error('Error inserting data:', insertErr);
          return res.status(500).json({ Error: `Error inserting data: ${insertErr.message}` });
        }
        
        return res.json({ status: "Registration successful" });
      });
    });
  });
});


//apis for tasks
app.get('/tasks', verifyUser, (req, res) => {
  connection.query('SELECT * FROM todo', (queryErr, results) => {
    if (queryErr) {
      res.status(500).json({ error: queryErr.message });
      return;
    }
    res.json(results);
  });
});

app.post('/tasks', verifyUser, (req, res) => {
  const { task_title, status } = req.body;
  connection.query('INSERT INTO todo (task_title, status) VALUES (?, ?)', [task_title, status], (queryErr, results) => {
    if (queryErr) {
      res.status(500).json({ error: queryErr.message });
      return;
    }
    res.json({ task_id: results.insertId, task_title, status });
  });
});

app.delete('/tasks/:id', verifyUser, (req, res) => {
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
  
  connection.query('SELECT status FROM todo WHERE task_id = ?', [key], (selectErr, result) => {
    if (selectErr) {
      res.status(500).json({ error: selectErr.message });
      console.log(selectErr.message);
      return;
    }

    
    const newStatus = result[0].status === 1 ? 0 : 1;

 
    connection.query('UPDATE todo SET status = ? WHERE task_id = ?', [newStatus, key], (updateErr, results) => {
      if (updateErr) {
        res.status(500).json({ error: updateErr.message });
        console.log(updateErr.message);
        return;
      }

      res.json({ task_id: results.insertId, status: newStatus });
    });
  });
});

// apis for youtube playlists

// 1. get all youtube playlists for a user
app.get('/playlists', verifyUser, async (req, res)=> {
  const userEmail = req.email || '';
 const sql = `SELECT playlists FROM users WHERE email = ?`;
  connection.query(sql, [userEmail], (err, result) => {
  if (err) {
    console.error('Error fetching playlists:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    res.json(result[0].playlists);
  } 
  }
)})

// 2. add youtube playlists for a user
app.post('/playlists', verifyUser, (req, res) => {
  const { playlists } = req.body;
  const userEmail = req.email || '';


  const getCurrentPlaylists = `SELECT playlists FROM users WHERE email = ?`;

  connection.query(getCurrentPlaylists, [userEmail], (error, results) => {
    if (error) {
      console.error('Failed to fetch current playlists:', error);
      res.status(500).json({ Status: 'Error', Error: 'Failed to fetch current playlists.' });
    } else {
     
      const currentPlaylists = results[0].playlists || ''; 
      const updatedPlaylists = currentPlaylists + (currentPlaylists ? ',' : '') + playlists;

     
      const updatePlaylists = `UPDATE users SET playlists = ? WHERE email = ?`;

      connection.query(updatePlaylists, [updatedPlaylists, userEmail], (updateError, updateResults) => {
        if (updateError) {
          console.error('Failed to add playlists:', updateError);
          res.status(500).json({ Status: 'Error', Error: 'Failed to add playlists.' });
        } else {
          res.json({ Status: 'Success', message: 'Playlists added successfully.' });
        }
      });
    }
  });
});

// 3. delete youtube playlists for a user
app.delete('/playlists/:playlistId', verifyUser, (req, res) => {
  const { playlistId } = req.params;
  const userEmail = req.email || '';

  
  const getCurrentPlaylists = `SELECT playlists FROM users WHERE email = ?`;

  connection.query(getCurrentPlaylists, [userEmail], (error, results) => {

    if (error) {
      console.error('Failed to fetch current playlists:', error);
      res.status(500).json({ Status: 'Error', Error: 'Failed to fetch current playlists.' });
    } else {
     
      const currentPlaylists = results[0].playlists || ''; 
      const updatedPlaylists = currentPlaylists.split(',').filter((id) => id !== playlistId).join(',');

      
      const updatePlaylists = `UPDATE users SET playlists = ? WHERE email = ?`;

      connection.query(updatePlaylists, [updatedPlaylists, userEmail], (updateError, updateResults) => {
        if (updateError) {
          console.error('Failed to remove playlist:', updateError);
          res.status(500).json({ Status: 'Error', Error: 'Failed to remove playlist.' });
        } else {
          res.json({ Status: 'Success', message: 'Playlist removed successfully.' });
        }
      });
    }
  });
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


