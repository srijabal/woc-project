const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;
const salt = 10;
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
  database: process.env.CONNECTION_NAME ,

 

});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
  }
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

const verifyUser = (req, res, next) => {
  next();
 
};






app.get('/', verifyUser, (req, res) => {
  return res.json({ Status: "Success", email: req.email });
})


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
        if (response) {
          console.log(3)
          const Email = data[0].email;
          const token = jwt.sign({
            email: data[0].email,
            test: 'hello'
          }, "gcuiohjhgutyiouytr687yhed", { expiresIn: '1d' });
          res.cookie('token', token);
          console.log(token)
          return res.status(200).json({ message: "login successful" });
        } else {
          return res.json({ Error: "Password not matched" });
        }
      })
    } else {
      return res.json({ Error: "Email doesn't exist" });
    }
  })
})
app.get('/', (req, res) => {

  return res.json({ message: "Server started" });
})

//logout

app.get('/logout', (req,res) => {
  res.clearCookie('token');
  return res.redirect('/');
});

app.post("/test", (req,res) => {
  console.log(req.headers);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//youtube playlist

const API_KEY = 'AIzaSyAEzxCy_VMGZKeODaac8fZinAIUgWSC8ww';
app.get('/playlists/:playlistIds', async (req, res) => {
  const { playlistIds } = req.params;

  const playlistIdArray = playlistIds.split(',');

  try {
    const promises = playlistIdArray.map(async (playlistId) => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=10&id=${playlistId}&key=${API_KEY}`
      );
      return response.data.items[0]; 
    });

    const playlistsArray = await Promise.all(promises);
    res.json(playlistsArray);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/playlists', (req, res) => {
  const { playlistIds } = req.body;

  
  console.log('Adding playlists:', playlistIds);

  res.status(200).json({ message: 'Playlists added successfully' });
  
});


