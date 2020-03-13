const express = require('express');

const projectRouter = require('./data/routers/projectRouter.js');
const actionRouter = require('./data/routers/actionRouter.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Node Api Sprint Challenge!");
})

//routers to handle endpoints
server.use("/api/projects", projectRouter);
//server.use("/api/actions", actionRouter); may need to add middleware here? /api/projectid/actions?

module.exports =  server;