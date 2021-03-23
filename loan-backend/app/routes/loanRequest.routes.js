
module.exports = function(app){
const loanrequestcontroller = require("../controllers/loanRequest.controller");

    var router = require("express").Router();

    //for requesting loan in customer side
    router.post("/loanrequest", loanrequestcontroller.createLoanRequest);

    // Retrieve all Loan requests
    router.get("/getloanrequests", loanrequestcontroller.findAllRequests);

    // Retrieve one customer's Loan requests
    router.get("/getcustomerrequests/:userId", loanrequestcontroller.findCustomerRequests);
    

    app.use('/api/loanRequest', router);
};
