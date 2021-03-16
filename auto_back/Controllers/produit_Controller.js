//Imports
var db = require("../db");

//Fonctions Routes
module.exports = {


    add: function (req, res) {
        var lastCode = 0;


        var sql_lastcode = "SELECT max(produit_id) as lastCode from produit"

        db.query(sql_lastcode,
            function (error, rows) {
                if (!!error) {
                    console.log("error in query add Produit");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    lastCode = rows[0].lastCode + 1;
                    console.log(lastCode);

                    var sql_add = "INSERT INTO produit  VALUES ('" + lastCode + "', '" + req.body.name + "', '" + req.body.price + "', '" + req.body.provider + "', '" + req.body.family + "', '" + req.body.subfamily + "', '" + req.body.url + "', '" + req.body.unite + "', '" + req.body.stock + "', '" + req.body.tiens_ordre + "', '" + req.body.taux_vacance + "', '" + req.body.code_barre + "', " + req.body.is_new + ", '" + req.body.prix_detail_min + "')";
                    console.log(sql_add);

                    db.query(sql_add,
                        function (error, rows, fields) {
                            if (!!error) {
                                console.log("error in query add Produit");
                                console.log(error.message);
                                res.status(500).send("Error in query");
                            }
                            else {
                                console.log("Success query Add Produit");
                                res.status(200).json(rows);
                            }
                        }
                    );
                }
            });



    },

    delete: function (req, res) {
        var sql = "DELETE FROM produit WHERE code = " + req.body.code;

        console.log(sql);
        console.log(req.body);


        db.query(sql, //changer la requete
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
        var sql = "UPDATE produit SET designation = '" + req.body.designation + "', famille = '" + req.body.famille + "', prix = " + req.body.prix + " WHERE code = " + req.body.code;



        db.query(sql, //changer la requete
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
        var sql = "Select * from bc_client";




        db.query(sql, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show Produit");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Select Produit");
                    res.status(200).json(rows);
                }
            });


    },

    return_products: function (req, res) {
        var sql = "SELECT max(id_return) as lastCode from return_product";
        var lastCode = 0;



        db.query(sql, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show Produit");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    lastCode = rows[0].lastCode + 1;
                    var sql_add = "";

                    req.body.table_products.forEach(element => {
                        if(element.IdProduct == undefined){
                            element.IdProduct = 0;
                        }
                        sql_add += "INSERT INTO return_product VALUES ('"+lastCode+"', '"+element.IdProduct+"', '"+element.IdOrder+"', '"+element.Quantity+"'); ";
                        lastCode++;
                    })

                    db.query(sql_add, function (error, rows) {
                        if (!!error) {
                            console.log("error in query add return product");
                            console.log(error.message);
                            res.status(500).send("Error in query");                            
                        } else {
                            console.log("Success query add return product");
                            res.status(200).json(rows);

                        }
                    })

                }
            });


    },
}