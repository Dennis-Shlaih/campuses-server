import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import campusRoutes from './routes/campuses';


dotenv.config();
console.log(process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Campuses API running' });
});

app.use('/campuses', campusRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));