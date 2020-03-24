const express = require('express');

// import all route handlers/controllers
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody
} = require('../controllers/tourController');

const router = express.Router();

// parameter middleware run through middleware checks id valid
router.param('id', checkID);

/////////////////////////////////////////////////////////////////////////////////// ROUTES

router
  .route('/')
  .get(getAllTours)
  // checks body properties before creating tour like access rights over if user is logged in
  .post(checkBody, createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
