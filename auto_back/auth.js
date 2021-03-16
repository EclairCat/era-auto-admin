//Import

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const db = require("./db");

module.exports = {


    hash_password: function (password) {

        var hash = bcrypt.hashSync(password, salt);

        return hash
    },


    login: function (req, res) {


        if (!req.body.email && !req.body.password) {
            res.status(500).send("Please insert an email or a password");
        }
        else {
            sql = "Select * from admin where email='" + req.body.email + "'"
            var admin;

            db.query(sql,
                function (error, rows) {
                    if (!!error) {
                        console.log("error in query get Auth Login");
                        console.log(error.message);
                        res.status(500).send("Error in query");
                    }
                    else {

                        if (rows.length <= 0) {
                            res.status(500).send("No email Found");
                        }
                        else {
                            admin = rows[0];

                            bcrypt.compare(req.body.password, admin.password, function (err, result) {
                                if (!result) {
                                    res.status(401).send("Invalid Email or Password");
                                }
                                else {
                                    var token = jwt.sign("token", "admin_key");

                                    res.status(200).send(token)
                                }
                            });
                        }

                    }
                });
        }
    },

    auth_verification: function (req, res, next) {

        var token

        if(req.query.token != undefined){
            token = req.query.token
        }
        else {
            token = req.body.token
        }
        console.log(token)

        if (token == undefined) {
            return res.status(500).send("Invalid Token")
            console.log("Error : Token is undefines")

        }
        else {
            if(jwt.verify(token, 'admin_key')){
                console.log("Token Passed")
                next()
            }
            else{
                return res.status(500).send("Invalid Token")
                console.log("Error : Tokin is invalid")
            }
 
            
        }
    }




}


