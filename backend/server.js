const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const tasksRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);    

app.use('/api/tasks', tasksRoutes);

app.get('/', (req, res) => {
    res.send('Task Manager API is running');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});