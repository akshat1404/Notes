const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.TRUSTED_ORIGIN }));
app.use(helmet());
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));