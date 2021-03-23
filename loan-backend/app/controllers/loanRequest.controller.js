const db = require("../models");
const LoanRequest = db.loanRequests;

//create and save a requested loan
exports.createLoanRequest = (req, res) => {
    //validate request
    if(!(req.body.userId && req.body.loanId)){
        res.status(400).send("content cannot be empty");
        return;
    }

    //create a requested loan
    const loanRequest = new LoanRequest({
        userId : req.body.userId,
        loanId : req.body.loanId
        
    });

    //save requested loan in the database
    LoanRequest
    .create(loanRequest)
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "error while creating request Loan"
        });
    });

};


//retrieve all loan requests from database
exports.findAllRequests = (req, res) =>{
    
    LoanRequest.find()
    .populate("userId", {name:1})
    .populate("loanId")
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "error while retrieving loan requests"
        });
    });   
};

//retrieve one customer's loan requests from database
exports.findCustomerRequests = (req, res) =>{
    const userId =req.params.userId;

    LoanRequest.find({userId})
    .populate("userId", {userId:1})
    .populate("loanId")
    .then(data=>{
        if (!data)
        res.status(404).send({ message: "Not found Loan request with userid " + userId });
      else res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "error while retrieving loan requests"
        });
    });
};