const Users = require("../models/users.models");
const validationUser = require("../validation/users.validation");

const addUser = async (req, res) => {
  const { errors, isValid } = validationUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await Users.findOne({ Email: req.body.Email }).then(async (exist) => {
        if (exist) {
          errors.Email = "Email exist";
          res.status(404).json(errors);
        } else {
          const { Email, Name, Address, Phone } = req.body;
          const addUserP = new Users({
            Email,
            Name,
            Address,
            Phone,
          });
          await addUserP.save();
          res.status(201).json({ message: "User added successfully" });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const findAllUsers = async (req, res) => {
  try {
    const data = await Users.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const findSingleUser = async (req, res) => {
  try {
    const data = await Users.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message); 
  }
};

const updateUser = async (req, res) => {
  const { errors, isValid } = validationUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await Users.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      });
      res.status(201).json({ message: "User updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await Users.deleteOne({ _id: req.params.id });
    res
      .status(201)
      .json({ message: `<b>${req.params.Name}</b> deleted successfully` });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteManyUser = async (req, res) => {
  try {
    const {id} = req.params;
    await Users.deleteOne({ _id:id })
    res
      .status(201)
      .json({ message: `deleted successfully` });
  } catch (error) {
    console.log(error.message);
  }
  
};

const deleteAllUser = async (req, res) => {
  try {
    await Users.deleteMany({})
    res
      .status(201)
      .json({ message: `deleted successfully` });
  } catch (error) {
    console.log(error.message);
  }
  
};

module.exports = {
  addUser,
  findAllUsers,
  findSingleUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  deleteAllUser
};
