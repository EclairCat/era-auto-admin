//Imports
var db = require("../db");

//Fonctions Routes
module.exports = {


    add: function (req, res) {
        var lastCode = 0;

        var sql = "";

        req.body.bc_client.forEach(element => {
            sql += "UPDATE client_order_line SET State='3' WHERE IdLine ='"+element.IdLine+"'; UPDATE client_order SET Received = '3' WHERE IdOrder='"+element.IdOrder+"'; "
            
        });

        console.log(sql);

        db.query(sql,
            function (error, rows) {
                if (!!error) {
                    console.log("error in query get id MAx commande");
                    console.log(error.message);
                    console.log(sql_lastcode);
                    res.status(500).send("Error in query");
                }
                else {
                   res.status(200).send("Success!");
                }
            });
            



    },

    delete: function (req, res) {
        var sql_delete = "DELETE FROM bc_client WHERE email = '" + req.body.email + "'";

        console.log(sql_delete);
        console.log(req.body);


        db.query(sql_delete, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query delete Client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Delete Client");
                    res.status(200).json(rows);
                }
            });


    },

    update: function (req, res) {
        var sql_update = "UPDATE bc_client SET mdp = '" + req.body.mdp + "', nom = '" + req.body.nom + "', prenom = '" + req.body.prenom + "', telephone = '" + req.body.telephone + "' WHERE email = '" + req.body.email + "'";



        db.query(sql_update, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Update Produit");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Update Produit");
                    res.status(200).json(rows);
                }
            });

    },

    show: function (req, res) {
        var sql_show = "Select co.*, c.first_name, c.last_name from client_order co, client c where Received = '3' AND c.id = co.IdClient";

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bc_client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Select bc_client");
                    res.status(200).json(rows);
                }
            });
    }

}