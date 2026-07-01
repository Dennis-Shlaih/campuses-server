import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import campusRoutes from './routes/campuses';
import studentRoutes from './routes/students';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Campuses API running' });
});

app.use('/campuses', campusRoutes);
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));