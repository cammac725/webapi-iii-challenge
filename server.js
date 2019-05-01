const express = require('express');
const configMiddleware = require('./config/middleware');

const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');

const server = express();

//middleware
configMiddleware(server);

server.use('/posts', postsRouter);
server.use('/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to Lambda Blog</h2>
  `);
});

module.exports = server;