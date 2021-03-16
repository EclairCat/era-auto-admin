//Imports
var db = require("../db");
const { query } = require("express");

//Fonctions Routes
module.exports = {


    add: function (req, res) {
        var lastCode = 0;


        var sql_lastcode = "SELECT max(id_order) as lastCode from bc_client"

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
                    console.log(lastCode);

                    var sql_add = "INSERT INTO commande  VALUES ('" + lastCode + "', NOW(),'" + req.body.id_client + "', '" + req.body.total + "')";
                    console.log(sql_add);

                    db.query(sql_add,
                        function (error, rows, fields) {
                            if (!!error) {
                                console.log("error in query add commande");
                                console.log(error.message);
                                res.status(500).send("Error in query");
                            }
                            else {
                                console.log("Success query Add commande");
                                res.status(200).json(rows);
                            }
                        }
                    );
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

    //Routes SHOW

    show: function (req, res) {
        var sql_show = "Select o.IdOrder as id_bc_client, o.CreatedAt as bc_date, CONCAT(c.first_name, ' ', c.last_name) as Name, o.Amount as total, o.Received as etat, o.IdClient as id_client from client_order o, client c where c.id = o.IdClient";

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bc_client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Show bc_client");
                    res.status(200).json(rows);
                }
            });
    },

    show_bc_ligne_client_by_id_provider: function (req, res) {
        var sql_show = "Select col.State as etat, col.IdLine as id_bc_ligne_client, col.IdOrder as id_bc_client, co.IdClient as id_client, CONCAT(c.first_name, ' ', c.last_name) as client_name, col.Product as produit_name, col.Quantity as quantite, col.Price FROM client_order_line col, client c, client_order co  WHERE c.id = co.IdClient AND col.Warehouse ='"+req.query.id_provider+"' AND co.IdOrder = col.IdOrder AND col.State ='0'";

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bc_client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query show_bc_ligne_client_by_id_provider");
                    res.status(200).json(rows);
                }
            });
    },

    show_produit_from_bc_client: function (req, res) {
        var sql_show = "Select col.*, CONCAT(c.first_name, ' ', c.last_name) as client_name, c.id as id_client from client c, client_order_line col, client_order co where c.id = co.IdClient and co.IdOrder = col.IdOrder AND col.IdOrder ='"+req.query.id_bc_client+"'"; 


        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show  produit from bc_client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query show_produit_from_bc_client");
                    res.status(200).json(rows);
                }
            });

    },

    show_bc_InProgress_ligne_client_by_id_provider: function( req, res){
        var sql_show = "Select col.State as etat, col.IdLine as id_bc_ligne_client, col.IdOrder as id_bc_client, co.IdClient as id_client, CONCAT(c.first_name, ' ', c.last_name) as client_name, col.Product as produit_name, col.Quantity as quantite, col.Price, col.Amount FROM client_order_line col, client c, client_order co  WHERE c.id = co.IdClient AND col.Warehouse ='"+req.query.id_provider+"' AND co.IdOrder = col.IdOrder AND col.State ='2'";

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bc_client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query show_bc_ligne_client_by_id_provider");
                    res.status(200).json(rows);
                }
            });
    },

    cancel_Order_By_Id: function(req, res) {
        var sql = "UPDATE client_order SET Received='4' WHERE IdOrder='"+req.query.id_order+"';  UPDATE client_order_line SET State='4' WHERE IdOrder='"+req.query.id_order+"'"

        console.log(sql);

        db.query(sql,
            function(error, rows, fields){
                if (!!error) {
                    console.log("error in query Cancel Order");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query cancelOrderById");
                    res.status(200).json(rows);
                }
            })
    },

    show_bc_client_by_idClient: function(req, res ){
        var sql = "SELECT * from client_order_line col, client_order co WHERE State=1 AND co.IdClient='"+req.query.id_client+"' AND co.IdOrder = col.IdOrder";

        console.log(sql);

        db.query(sql,
            function(error, rows, fields){
                if (!!error) {
                    console.log("error in query show_bc_client_by_idClient");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query show_bc_client_by_idClient");
                    res.status(200).json(rows);
                }
            })
    },

    show_produit_from_id_client: function (req, res) {
        var sql_show = "Select l.*, co.CreatedAt From client_order_line l, client_order co WHERE l.IdOrder = co.IdOrder AND co.IdClient = '"+req.query.id_client+"'"; 

        console.log(sql_show);

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show  produit from id_client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query show_produit_from_id_client");
                    res.status(200).json(rows);
                }
            });

    },

}