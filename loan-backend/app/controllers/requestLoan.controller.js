const db = require("../models");
const RequestLoan = db.requestLoans;

//create and save a loan
exports.createRequestLoan = (req, res) => {
    //validate request
    if(!req.body.type){
        res.status(400).send("content cannot be empty");
        return;
    }

    //create a requested loan
    const requestLoan = new RequestLoan({
        customerId : req.body.customerId,
        type: req.body.type,
        amount: req.body.amount,
        interest: req.body.interest,
        duration: req.body.duration
    });

    //save requested loan in the database
    requestLoan
    .save(requestLoan)
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message | "error while creating request Loan"
        });
    });

};