//Imports
var db = require("../db");
const { Console } = require("console");
const { EROFS } = require("constants");
var mailer = require("../mailer");

//Fonctions Routes
module.exports = {


    add: function (req, res) {
        var lastCode = 0;
      

        var sql_lastcode = "SELECT max(id_bc_frs) as lastCode from bc_frs"

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
                    var sql_add = "INSERT INTO bc_frs VALUES ('" + lastCode + "', NOW(), '" + req.body.id_provider + "' )";

                    db.query(sql_add,
                        function (error, rows, fields) {
                            if (!!error) {
                                console.log("error in query add bc_frs");
                                console.log(error.message);
                                res.status(500).send("Error in query");
                            }
                            else {
                                console.log("Success query Add Bc_FRS");

                                var sql_lastcode2 = "SELECT max(id_bc_ligne_frs) as lastCode from bc_ligne_frs"

                                db.query(sql_lastcode2, function (error, rows) {
                                    if (!!error) {
                                        console.log("error in query get Lastcode for Id_bc_ligne_frs");
                                        console.log(error.message);
                                        res.status(500).send("Error in query");
                                    }
                                    else {
                                        lastCode2 = rows[0].lastCode +1 ;

                                        var sql_multiple_insert = "";

                                        req.body.bc_provider.forEach(element => {
                                            sql_multiple_insert += "INSERT INTO bc_ligne_frs VALUES ('" + lastCode2 + "', '" + element.produit_name + "','" + element.quantite + "', '" + element.id_client + "', '" + lastCode + "', 0, "+element.Price+"); ";
                                            lastCode2 ++;
                                        });

                                        sql_multiple_insert += "UPDATE client_order_line SET State = '2' WHERE IdOrder ='"+req.body.bc_provider[0].id_bc_client+"'; "
                                        sql_multiple_insert += "UPDATE client_order SET Received = '2' WHERE IdOrder ='"+req.body.bc_provider[0].id_bc_client+"'; "

                                        console.log(sql_multiple_insert);

                                        db.query(sql_multiple_insert, function (error, rows) {
                                            if (!!error) {
                                                console.log("error in query sql_multiple_insert");
                                                console.log(error.message);
                                                console.log(sql_multiple_insert)
                                                res.status(500).send("Error in query");
                                            } else {
                                                console.log("Success query sql_multiple_insert add bc_ligne_frs");

                                                
                                                
                                                res.status(200).send("Success!");                                                                                                                                       
                                            }
                                        })


                                    }
                                }

                            )}
                        }
                    );
                }
            });



    },

    delete: function (req, res) {
        var sql_delete = "DELETE FROM bc_frs WHERE id = '" + req.body.id + "'";

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

    //Update quoi ?
    update: function (req, res) {
        var sql_update = "UPDATE bc_frs SET email = '" + req.body.email + "'";



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
        var sql_show = "Select p.id_provider, f.id_Bc_Frs, p.name, f.date_Bc_Frs FROM bc_frs f, provider p where f.id_Frs = p.id_provider";

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bc_provider");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Select bc_provider");
                    res.status(200).json(rows);
                }
            });
    },

    showProduitFromBcProvider: function (req, res) {
        console.log(req.query.ib_bc_frs)
        var sql_show = "Select fol.* from bc_ligne_frs fol where fol.id_bc_frs ='"+req.query.id_bc_frs+"'";

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bc_provider");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Select bc_provider");
                    res.status(200).json(rows);
                }
            });
    }

}