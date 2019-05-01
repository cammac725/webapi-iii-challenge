const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/posts', postsRouter);
server.use('/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to Lambda Blog</h2>
  `);
});

module.exports = server;