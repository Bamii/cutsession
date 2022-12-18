import { DateTime } from "../vendors/luxon";

export const withTable = (Controller) => {
  const MyController = new Object();
  MyController.prototype = Controller.prototype;
  MyController.table = document.querySelector('[data-table]')
  MyController.loading = function(status) {
    this.table.classList[status ? 'add' : 'remove']("loading");
  }
  return MyController;
}

export function parseQuery (str) {
  if(str.startsWith("?")) {
    str = str.substring(1);
  }

  const split = str.split("&");
  return split.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    return {...acc, [key]: value }
  }, {})
}

export const get_query_string = (query) => {
  if (!query) return "";

  const query_string = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    query_string.set(key, value);
  });
  return query_string.toString();
};

export const getTimeInterval = (start, interval) => {
  const suffix = ":00Z"
  const [_hour,_minute] = start.split(":");
  const { hour, minute } = DateTime.now()
    .set({ hour: _hour, minute: _minute })
    .plus({ minutes: interval });

  return { hour, minute, suffix };
}