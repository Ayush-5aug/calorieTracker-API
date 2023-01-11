const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/usersRoutes");
const masterFileUploadRoutes = require("../routes/masterFileUploadRoutes");

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'templates/assets')));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors(corsOptions))
    app.use("/api/auth", authRoutes.router);
    app.use("/api/user", userRoutes.router);
    app.use("/api/upload", masterFileUploadRoutes.router)
    return app;
}

module.exports = {
    createServer
}