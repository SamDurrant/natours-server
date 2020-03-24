const express = require('express');

// import all route handlers/controllers
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('./../controllers/userController');
// create new router and store in variable
const router = express.Router();

/////////////////////////////////////////////////////////////////////////////////// ROUTES

// gets all user at base route
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// gets specific user at id route
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
