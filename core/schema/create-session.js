import Model from "../common/Model";

export default new Model({
  startsAt: {
    message: "startsAt must be a valid date",
    fn: (val) =>
      val.split(":").length === 3 &&
      val.split(":").every((val) => !isNaN(parseInt(val))),
  },
  endsAt: { message: "startsAt must be a valid date", fn: (val) => val.length <= 100 },
  type: { message: "invalid day type", fn: (val) => val === "WeekDay" || val === "WeekEnd" },
});
