//combine middleware and controller functions
//authentication part (signup and signin)
const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //signup
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateNameOrEmail,
            verifySignUp.checkRoleExisted
        ],
        controller.signup
    );

    //signin
    app.post("/api/auth/signin", controller.signin);
};