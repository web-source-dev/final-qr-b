const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const path = require('path');

// Initialize app
const app = express();
app.use(express.json());  // Parse incoming JSON requests
const corsOptions = {
  origin: 'https://final-qr-psi.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies (if needed)
};

// Enable CORS with the defined options
app.use(cors(corsOptions));



// MongoDB Connection using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
    console.log('MongoDB connected with Mongoose...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Connect to DB
connectDB();

// Routes
const userRoutes = require('./Routes/userroute');
app.use('/api', userRoutes);

app.get('/',(req, res) => {
  res.send('Welcome to the QR Code API!');
})
// Set up port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
