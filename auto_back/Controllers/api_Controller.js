
const db = require("../db");
const auth = require("../auth");



module.exports = {

    add_API: function(req, res){

        var lastCode = 0;

        var sql_lastcode = "SELECT max(id) as lastCode from api_frs"

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

                    sql_add= "INSERT INTO api_frs VALUES ( "+lastCode+", '"+req.body.ip+"', '"+req.body.link+"', '"+req.body.key1+"', '"+req.body.key2+"', '"+req.body.key3+"', '"+req.body.key4+"')";

                    db.query(sql_add,
                        function(error, rows) {
                            if(!!error)
                            {
                                console.log(error.message)
                                res.status(500).send("Error in query");
                                console.log(sql_add)
                            }
                            else{
                                res.status(200).send("Added API!")
                            }
                        })
                }

        })
    },

    show_API: function(req, res) {

        sql = "Select * from api_frs"

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

    delete_API : function(req, res) {

        sql = "DELETE from api_frs WHERE Ip_Frs = '"+req.body.ip+"'"

        db.query(sql,
            function(error, rows){
                if(!!error){
                    console.log(error.message)
                    res.status(500).send("Error in query");
                    console.log(sql)
                }
                else{
                    console.log("API DELETED");
                    res.status(200).send();
                }
            })


    }
}