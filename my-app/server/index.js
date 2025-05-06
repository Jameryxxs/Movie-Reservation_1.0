const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Simulated in-memory database
const users = [];

const SECRET_KEY = 'your-secret-key'; // Replace with env variable in production

// Register route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, coNo, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ firstName, lastName, email, coNo, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully.' });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { firstName, password } = req.body;

  const user = users.find(u => u.firstName === firstName);
  if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid credentials.' });

  const token = jwt.sign({ firstName: user.firstName }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
