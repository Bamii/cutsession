import Model from "../common/Model";

export default new Model({
  name: { message: "name should be between 2 and 50 characters", fn: (val) => val.length >= 2 && val.length <= 25 },
  dob: { message: "dob must be a valid date", fn: (val) => !isNaN(Date.parse(val)) },
  email: { message: "email should be less than 50 chars", fn: (val) => val.length <= 50 },
  cityOfResidence: { message: "city name should be less than 20 chars", fn: (val) => val.length <= 20 },
  username: { message: "username should be between 6 and 20 characters", fn: (val) => val.length >= 6 && val.length <= 20 },
  password: { message: "password should be more than 6 chars", fn: (val) => val.length >= 6 },
  phoneNumber: { message: "phone should be less than 20 characters", fn: (val) => val.length <= 20 },
});
