//Imports
var db = require("../db");

module.exports = {

    show: function(req, res){
        var sql = "SELECT b.*, CONCAT(c.first_name, ' ', c.last_name) as Name_client, t.Type from bills b, client c, type_of_paiement t where b.IdClient = c.id "
        console.log(sql)
        db.query(sql, 
            function(error, rows){
                if (!!error) {
                    console.log("error in query Show Bills");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                   res.status(200).json(rows);
                   console.log("SHOW BILL Success!")
                   console.log(rows)
                }
            })
    },

    add: function(req, res){
        var sql_lastcode = "SELECT max(IdBill) as lastcode from bills";
        
        var sql = "INSERT INTO bills VALUES(, NOW(), '"+req.body.IdOrder+"', '"+req.body.IdClient+"','"+req.body.Type_paiement+"','"+req.body.Total+"', 1); "

        db.query(sql_lastcode, 
            function(error, rows){
                if (!!error) {
                    console.log("error in get last ID Bills");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    var lastcode = rows[0].lastcode  + 1;
                   var sql = "INSERT INTO bills VALUES('"+lastcode+"', NOW(), '"+req.body.IdOrder+"', '"+req.body.IdClient+"','"+req.body.Type_paiement+"','"+req.body.Total+"', 1); "
                    
                   db.query(sql, function(error, rows){
                    if (!!error) {
                        console.log("error in query Add Bills");
                        console.log(error.message);
                        res.status(500).send("Error in query");
                    }
                    else {                       
                       res.status(200).send("Success!");
                    }
                    })
                   
                }
            });
    },

    billispaid : function(req, res){
        var idBill = req.query.IdBill;

        var sql = "UPDATE bills SET is_paid=0 WHERE IdBill='"+idBill+"'";


        db.query(sql, function(error, rows){
            if (!!error) {
                console.log("error in query bill is paid");
                console.log(error.message);
                res.status(500).send("Error in query");
            }
            else {                       
               res.status(200).send("Success!");
            }
        })
           
    }
}