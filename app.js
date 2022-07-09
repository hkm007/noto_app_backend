const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./routes");


// cors setup
app.use(cors({
    origin: ['https://thenoto-app.web.app', 'https://thenoto-app.firebaseapp.com'],
    methods: ['GET']
}));


// routes
app.use(router);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));