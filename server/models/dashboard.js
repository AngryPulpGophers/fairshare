var db = require('../db.js');

Dashboard = module.exports;

Dashboard.getOwedUser = function(id) {
  return db.raw("SELECT Sum(owed) FROM (SELECT expenses.title, expenses.amount, (expenses.amount/count(*)) * (count(*) -1) AS owed FROM expenses LEFT JOIN user_expenses ON (expenses.id = user_expenses.expense_id) WHERE expenses.paid_by = " + id + " GROUP BY expenses.id) AS total")
}

Dashboard.getUserOwes = function(id) {
  return db.raw("SELECT SUM(owe) FROM (SELECT expenses.title, expenses.amount, (expenses.amount/count(*)) AS owe FROM expenses LEFT JOIN user_expenses ON (expenses.id = user_expenses.expense_id) WHERE expenses.paid_by != "+id+" and expense_id in (select expense_id from users LEFT JOIN user_expenses ON ("+id+" = user_expenses.user_id)) GROUP BY expenses.id) AS total;");
}

Dashboard.payments = function(id) {
  return db.raw("SELECT (SELECT SUM(amount) as got FROM payments WHERE recipient = " + id + ") - (SELECT SUM(amount) as gave FROM payments WHERE payee = " + id + ") as total;");
}
