// import app
const app = require('./app');

// start server on local host
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
