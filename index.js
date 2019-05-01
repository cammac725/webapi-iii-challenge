const server = require('./server');

server.listen(4000, (req, res) => {
  console.log('\n*** Server is running on port 4000 ***\n');
});