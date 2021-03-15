//controller for authentication
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req,res)=> {
    
  //create new user in database
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 6)
    });

    user.save((err, user) => {
        if(err){
            res.status(500).send({messege: err})
            return;
        }

        if (req.body.roles) {
            Role.find(
              {
                username: { $in: req.body.roles }
              },
              (err, roles) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
      
                user.roles = roles.map(role => role._id);
                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
      
                  res.send({ message: "User was registered successfully!" });
                });
         
            }
        );
        } else {
            Role.findOne({ username: "customer" }, (err, role) => {
                if (err) {
                res.status(500).send({ message: err });
                return;
                }
    
                user.roles = [role._id];
                user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
    
                res.send({ message: "User was registered successfully!" });
                });
          
        
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
      name: req.body.name
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        //compare password with password in database
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
    
          //generate a token
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });

          //return user information and access token
          var authorities = [];
    
          for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].username.toUpperCase());
          }
          res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
    };