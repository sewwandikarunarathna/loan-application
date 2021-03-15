const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["customer", "admin", "user"];

db.loans = require("./loan.model.js")(mongoose);
db.requestLoans = require("./requestLoan.model.js")(mongoose);

module.exports = db;