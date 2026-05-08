import express from 'express';
import authRoutes from '../backend/routers/auth_router.js'
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
