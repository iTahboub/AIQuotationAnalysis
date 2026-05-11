require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
const PORT = 3000;

app.use(express.json({limit: '10mb'})); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Security headers (AI)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

//API routes
const quotationRouter = require('./routes/quotationRouter');
app.use('/api/quotations', quotationRouter);
app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});