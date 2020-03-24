const dotenv = require('dotenv');
// reads variables from file and saves into node environment variables
dotenv.config({ path: './config.env' });
// import app
const app = require('./app');

// shows which environment we are  in
// console.log(app.get('env'));
console.log(process.env);

// start server on local host
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
