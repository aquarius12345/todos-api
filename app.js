require('dotenv').config();

const express = require('express');
const connectDb = require('./config/db.config');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');
const authMiddleware = require('./routes/auth.middleware');

connectDb();

const app = express();

app.use(express.json());

app.use(cors());


//rota publica
app.use('/', authRoutes);

//middleware
app.use(authMiddleware);

//rota privada
app.use('/', todoRoutes);


app.listen(process.env.PORT, () => console.log('Server running on port 5000'));

