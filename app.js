const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

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

// read file with tour data and parse into object
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/////////////////////////////////////////////////////////////////////////////////// ROUTE HANDLERS

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  // change parameter of id to number
  const id = Number(req.params.id);
  // get tour with matching id
  const tour = tours.find(tour => tour.id === id);

  // check if tour is undefined
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID'
    });
  }

  // return tour to client
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  // create id and new tour object
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    ...req.body,
    id: newId
  };

  // push new tour onto tours array
  tours.push(newTour);

  // write new tour to json file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      // return 201 status and new tour object which now contains id
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

const updateTour = (req, res) => {
  // change parameter of id to number
  const id = Number(req.params.id);
  // get tour with matching id
  const tour = tours.find(tour => tour.id === id);

  // check if tour is undefined
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  // return success to client
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

const deleteTour = (req, res) => {
  // change parameter of id to number
  const id = Number(req.params.id);
  // get tour with matching id
  const tour = tours.find(tour => tour.id === id);

  // check if tour is undefined
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid  ID'
    });
  }

  // return success to client
  res.status(204).json({
    data: null
  });
};

/////////////////////////////////////////////////////////////////////////////////// ROUTES

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

/////////////////////////////////////////////////////////////////////////////////// START SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

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
