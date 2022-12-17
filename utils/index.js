
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