const fs = require('fs');

// read file with tour data and parse into object
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/////////////////////////////////////////////////////////////////////////////////// ROUTE HANDLERS/CONTROLLERS

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
