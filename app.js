const express = require('express');
const { connectToDB } = require('./config/connectToDB');
const authRouter = require('./routers/authRoutes');
const userRouter = require('./routers/userRoutes');
const studentRouter = require('./routers/studentRoutes');
const classRouter = require('./routers/classRoutes');
require("dotenv").config();

// Init App
const app = express();

// Connect To DB
connectToDB();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/students', studentRouter);
app.use('/classes', classRouter);

app.get('/', (req, res) => {
   res.send("bonjour")
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})