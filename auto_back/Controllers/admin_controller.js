
const db = require("../db");
const auth = require("../auth");



module.exports = {

    addAdmin: function(req, res){

        var lastCode = 0;

        var hashed_pass = auth.hash_password(req.body.password)

        var sql_lastcode = "SELECT max(id_admin) as lastCode from admin"

        db.query(sql_lastcode,
            function (error, rows) {
                if (!!error) {
                    console.log("error in query get id MAx commande");
                    console.log(error.message);
                    console.log(sql_lastcode);
                    res.status(500).send("Error in query");
                }
                else {
                    lastCode = rows[0].lastCode + 1;

                    sql_add= "INSERT INTO admin VALUES ( "+lastCode+", '"+req.body.email+"', '"+hashed_pass+"', '"+req.body.username+"')";

                    db.query(sql_add,
                        function(error, rows) {
                            if(!!error)
                            {
                                console.log(error.message)
                                res.status(500).send("Error in query");
                                console.log(sql_add)
                            }
                            else{
                                res.status(200).send("Added Admin!")
                            }
                        })
                }

        })
    },

    showAdmin: function(req, res) {

        sql = "Select * from admin"

        db.query(sql,
            function(error, rows){
                if(!!error){
                    console.log(error.message)
                    res.status(500).send("Error in query");
                    console.log(sql)
                }
                else{
                    res.status(200).send(rows);
                }
            })

    },

    deleteAdmin : function(req, res) {

        sql = "DELETE from admin WHERE email = '"+req.body.email+"'"

        db.query(sql,
            function(error, rows){
                if(!!error){
                    console.log(error.message)
                    res.status(500).send("Error in query");
                    console.log(sql)
                }
                else{
                    res.status(200).send();
                }
            })


    }
}