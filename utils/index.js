
export const withTable = (Controller) => {
  const MyController = new Object();
  MyController.prototype = Controller.prototype;
  MyController.table = document.querySelector('[data-table]')
  MyController.loading = function(status) {
    this.table.classList[status ? 'add' : 'remove']("loading");
  }
  return MyController;
}
