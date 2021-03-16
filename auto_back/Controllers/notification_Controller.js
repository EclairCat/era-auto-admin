//Imports
var db = require("../db");

//Fonctions Routes
module.exports = {


    add: function (req, res) {
        var lastCode = 0;


        var sql_lastcode = "SELECT max(notification_id) as lastCode from notification"

        db.query(sql_lastcode,
            function (error, rows) {
                if (!!error) {
                    console.log("error in query get Lastcode for Notif");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    lastCode = rows[0].lastCode + 1;
                    console.log(lastCode);

                    var sql_add = "INSERT INTO notification  VALUES ('" + lastCode + "', NOW(), \"" + req.body.data.content + "\", '" + req.body.data.category + "', 0, '" + req.body.data.id_client + "')";
                    console.log(sql_add);

                    db.query(sql_add,
                        function (error, rows, fields) {
                            if (!!error) {
                                console.log("error in query add Notif");
                                console.log(error.message);
                                res.status(500).send("Error in query");
                            }
                            else {
                                console.log("Success query Add Notif");
                                res.status(200).json(rows);
                            }
                        }
                    );
                }
            });



    },

    delete: function (req, res) {
        var sql_delete = "DELETE FROM produit WHERE code = " + req.body.code;

        console.log(sql_delete);
        console.log(req.body);


        db.query(sql_delete, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query delete Produit");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Delete Produit");
                    res.status(200).json(rows);
                }
            });

    },

    update: function (req, res) {
        var sql_delete = "UPDATE produit SET designation = '" + req.body.designation + "', famille = '" + req.body.famille + "', prix = " + req.body.prix + " WHERE code = " + req.body.code;



        db.query(sql_delete, //changer la requete
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
        var sql_show = "Select * from notification";


        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show Notif ");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Select Notif ");
                    res.status(200).json(rows);
                }
            });


    }
}