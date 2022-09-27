const express = require("express");
const {
  addUser,
  findAllUsers,
  findSingleUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  deleteAllUser
} = require("../controllers/user.controller");


const router = express.Router();

//* add users
router.post("/users", addUser);

//* Find all users
router.get("/users", findAllUsers);

//* Find one users
router.get("/users/:id", findSingleUser);

//* update user
router.put("/users/:id", updateUser); 

//* delete users
router.delete("/users/:Name/:id", deleteUser);

//* delete Many users
router.delete("/users/:id", deleteManyUser);

//* delete All users
router.delete("/users", deleteAllUser);

module.exports = router;
