const isEmpty = require("./isEmpty");

const validator = require("validator");

module.exports = function validatorUser(data) {
  let errors = {};
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Name = !isEmpty(data.Name) ? data.Name : "";
  data.Address = !isEmpty(data.Address) ? data.Address : "";
  data.Phone = !isEmpty(data.Phone) ? data.Phone : "";

  if (!validator.isEmail(data.Email)) {
    errors.Email = "Email Format Required";
  }
  if (validator.isEmpty(data.Email)) {
    errors.Email = "Required Email";
  }
  if (validator.isEmpty(data.Name)) {
    errors.Name = "Required Name";
  }
  if (validator.isEmpty(data.Address)) {
    errors.Address = "Required Address";
  }
  if (validator.isEmpty(data.Phone)) {
    errors.Phone = "Required Phone";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
