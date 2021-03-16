//Imports
var db = require("../db");

//Fonctions Routes
module.exports = {


    add: function (req, res) {

        var lastCode = 0;
        var sql_lastcode = "SELECT max(id_bl_frs) as lastCode from bl_frs"

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
                    // ADD New Bl FRS
                    var sql_add = "Insert into bl_frs VALUES (" + lastCode + ",NOW(),'" + req.body.id_provider + "','" + req.body.bc_provider[0].Amount + "')"

                    db.query(sql_add, function (error, rows) {
                        if (!!error) {
                            console.log("error in query add bl FRS");
                            console.log(error.message);
                            console.log(sql_lastcode);
                            res.status(500).send("Error in query");
                        }
                        else {
                            // UPDATE state Line Bc Client to Received

                            console.log("SUCCESS Add BL in BL_FRS");

                            var sql_lastcode2 = "SELECT max(id_bl_ligne_frs) as lastCode from bl_ligne_frs"

                            db.query(sql_lastcode2, function (error, rows) {
                                if (!!error) {
                                    console.log("error in query get Lastcode for Id_bl_ligne_frs");
                                    console.log(error.message);
                                    res.status(500).send("Error in query");
                                }
                                else {
                                    lastCode2 = rows[0].lastCode + 1;

                                    var sql_multiple = ""

                                    req.body.bc_provider.forEach(element => {
                                        lastCode2++;
                                        sql_multiple += "INSERT INTO bl_ligne_frs VALUES ('" + lastCode2 + "', '" + lastCode + "','" + element.produit_name + "', '" + element.quantite + "','" + element.Price + "','" + element.Amount + "'); ";
                                    });

                                    sql_multiple += "UPDATE client_order_line SET State = '1' WHERE IdOrder ='" + req.body.bc_provider[0].id_bc_ligne_client + "'; ";
                                    sql_multiple += "UPDATE client_order SET Received = '1' WHERE IdOrder ='" + req.body.bc_provider[0].id_bc_client + "'; ";


                                    db.query(sql_multiple, function (error, rows) {
                                        if (!!error) {
                                            console.log("error in query add bl_ligne_frs");
                                            console.log(error.message);
                                            res.status(500).send("Error in query");
                                            console.log(sql_multiple)
                                        } else {
                                            console.log("Success query add sql_multiple");
                                            res.status(200).json(rows);

                                        }
                                    })
                                }
                            })
                        }

                    })

                }
            })

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
        var sql_show = "select bl.*, p.name from bl_frs bl, provider p where p.id_provider = bl.id_frs ";

        db.query(sql_show,
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bl_frs");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Select bl_frs");
                    res.status(200).json(rows);
                }
            });
    },

    show_Produit_From_Bl_Frs: function (req, res) {
        var sql_show = " SELECT * from bl_ligne_frs where id_bl_frs ='" + req.query.id_bl_frs + "'";

        db.query(sql_show,
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show bl_frs");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Select bl_frs");
                    res.status(200).json(rows);
                }
            });
    }

}