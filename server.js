const express = require('express');
const server = express();
const path = require('path');
let PORT = process.env.PORT || 4200;

server.use((req, res, next) => {
    console.log(`requested url: ${req.url}`);
    next();
})
server.use(express.static(__dirname + '/dist'));

server.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})