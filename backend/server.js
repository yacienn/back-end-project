import express from 'express';
import authRoutes from '../backend/routers/auth_router.js'

const app = express();
const port = 3000;

app.use(express.json());

// routes
app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
