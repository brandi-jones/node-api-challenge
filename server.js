const express = require('express');
const cors = require('cors');


const projectRouter = require('./data/routers/projectRouter.js');
const actionRouter = require('./data/routers/actionRouter.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send("Node Api Sprint Challenge!");
})

//routers to handle endpoints
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter); 

module.exports =  server;