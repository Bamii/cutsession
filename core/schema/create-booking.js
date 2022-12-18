import Model from "../common/Model";

export default new Model({
  date: { message: "Must be a date", fn: (val) => !isNaN(Date.parse(val)) },
  notes: {
    message: "Notes should be less than 100 characters",
    fn: (val) => val.length <= 100,
  },
  title: {
    message: "Title should be less than 75 characters",
    fn: (val) => val.length <= 75,
  },
  userId: { message: "", fn: (val) => val.length >= 15 && val.length <= 100 },
  sessionId: {
    message: "",
    fn: (val) => val.length >= 15 && val.length <= 100,
  },
});
