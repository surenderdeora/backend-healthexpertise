require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const cors = require("cors")
const port = process.env.PORT || 8888; // Use 8888 as default port if PORT is not defined in environment

// require route
const authRoutes = require('./app/routes/authRoutes');

// connect database
require('./config/db').connectdatabase();

console.log(port);

// config express body parser
app.use(express.json());
app.use(cors());    

app.get('/', (req, res) => {
    res.send(`${process.env.NODE_ENV} server is running`);
});

// Use authentication routes
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(` Server is running at http://localhost:${port}`);
});
