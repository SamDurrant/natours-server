const express = require('express');
const morgan = require('morgan');

// import route handlers and extended api routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/////////////////////////////////////////////////////////////////////////////////// MIDDLEWARE

// returns HTTP method, URL, status code, time to send response back, size of response in bytes
app.use(morgan('dev'));

// middleware allows us to use body
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the other side');
  // important to use next in middleware
  next();
});

app.use((req, res, next) => {
  // set a timestamped string prop on req
  req.requestTime = new Date().toISOString();
  next();
});

// middleware mounts routers on routes for api paths
app.use('/api/v1/tours', tourRouter);

// use router in app at this route
app.use('/api/v1/users', userRouter);

module.exports = app;

/*


////////// this is the routes before refactoring

// return all tours
app.get('/api/v1/tours', getAllTours);

// adds a new tour
app.post('/api/v1/tours', createTour);

// return a tour item
app.get('/api/v1/tours/:id', getTour);

// update tour item
app.patch('/api/v1/tours/:id', updateTour);

// delete tour item
app.delete('/api/v1/tours/:id', deleteTour);



*/
