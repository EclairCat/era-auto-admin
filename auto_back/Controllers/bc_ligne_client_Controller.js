//Imports
var db = require("../db");

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

    show: function (req, res) {
        var sql_show = "Select b.id_bc_ligne_client, b.id_bc_client, b.id_client, CONCAT(c.nom, ' ', c.prenom) as client_name, b.id_produit, p.name as produit_name, b.quantite FROM bc_ligne_client b, client c, produit p, bc_client bcc WHERE c.id_client = b.id_client AND p.produit_id = b.id_produit AND p.id_provider ='"+req.query.id_provider+"' AND bcc.id_bc_client = b.id_bc_client AND bcc.etat ='Open'";

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bc_client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Select bc_ligne_client");
                    res.status(200).json(rows);
                }
            });
    }

}