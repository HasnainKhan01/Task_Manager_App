const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://task-manager-app-rip6.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests from this IP, please try again later.' }
});

app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});