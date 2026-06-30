const express = require('express');
const cors = require('cors');
require('dotenv').config();

const campusRoutes = require('./routes/campuses');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Campuses API running' });
});

app.use('/campuses', campusRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));