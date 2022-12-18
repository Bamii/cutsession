import Model from "../common/Model";

export default new Model({
  username: {
    message: "username should be longer than 6 characters",
    fn: (val) => val.length > 6,
  },
  password: {
    message: "password should be longer than 6 characters",
    fn: (val) => val.length > 6,
  },
  accessType: {
    message: "Invalid access type",
    fn: (val) => val === "USER" || val === "MERCHANT",
  },
});
