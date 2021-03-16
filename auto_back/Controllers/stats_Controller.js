//Imports
var db = require("../db");

module.exports = {

    /*getStats: function(req, res){
        var sql = "SELECT b.*, CONCAT(c.first_name, ' ', c.last_name) as Name_client, top.Type from bills b, client c, type_of_paiement top WHERE b.IdClient = c.id AND b.Type_paiement = top.IdType"

        db.query(sql, 
            function(error, rows){
                if (!!error) {
                    console.log("error in query Show Bills");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                   res.status(200).json(rows);
                }
            })
    },*/

    getStats_Total_Client: function(req, res){
        var sql = "SELECT COUNT(id) as total_client from client"

        db.query(sql, 
            function(error, rows){
                if (!!error) {
                    console.log("error in query Get Stats Total Client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                   res.status(200).json(rows);
                   console.log("Success query Stats Total Client")
                }
            })
    },

    getStats_Total_Provider: function(req, res){
        var sql = "SELECT COUNT(id_provider) as total_provider from provider"

        db.query(sql, 
            function(error, rows){
                if (!!error) {
                    console.log("error in query Get Stats Total Provider");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                   res.status(200).json(rows);
                }
            })
    },

    getStats_Total_Sells: function(req, res){
        var sql = "SELECT COUNT(IdLine) as total_sells from client_order_line where State=3"

        db.query(sql, 
            function(error, rows){
                if (!!error) {
                    console.log("error in query Get Stats Total Provider");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                   res.status(200).json(rows);
                }
            })
    },


    //Changed to Number of Orders
    getStats_Total_Money_Earned: function(req, res){
        var sql = "SELECT COUNT(IdOrder) as money_earned from client_order"

        db.query(sql, 
            function(error, rows){
                if (!!error) {
                    console.log("error in query Get Stats Total Provider");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                   res.status(200).json(rows);
                }
            })
    },

    
}