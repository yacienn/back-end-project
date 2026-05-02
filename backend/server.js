import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});