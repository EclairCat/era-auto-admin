//Imports
var db = require("../db");

//Fonctions Routes
module.exports = {


    add: function (req, res) {
        var lastCode = 0;

        var sql_lastcode = "SELECT max(id_provider) as lastCode from provider"

        //All DATA Received
        var data = req.body.new_provider.data;
        var contact_person = req.body.new_provider.contact_person;
        var primary_data = req.body.new_provider.primary_data;
        var additional_contact = req.body.new_provider.additional_contact;
        var legal_adress = req.body.new_provider.legal_adress;
        var real_adress = req.body.new_provider.real_adress;
        var provider_information = req.body.new_provider.provider_information;
        var color_info = req.body.new_provider.color_info;
        var delivery_type = req.body.new_provider.delivery_type;
        var comment = req.body.new_provider.comment;



        db.query(sql_lastcode,
            function (error, rows) {
                if (!!error) {
                    console.log("error in query add provider");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    lastCode = rows[0].lastCode + 1;
                    console.log(lastCode);

                    var sql_add = "INSERT INTO provider  VALUES ('" + lastCode + "'"
                    +",'" + data.email + "'"
                    +",'" + data.telephone + "'"
                    +",'" + data.password + "'"
                    +"," + +data.use_primary_messaging + ""

                    +",'" + contact_person.last_name + "'"
                    +",'" + contact_person.first_name + "'"
                    +",'" + contact_person.second_last_name + "'"
                    +",'" + +contact_person.active_account + "'"
                    +",'" + +contact_person.refuse_profile_modif + "'"
                    +",'" + +contact_person.display_oem + "'"

                    +",'" + primary_data.type_of_ownership + "'"
                    +",'" + primary_data.company_name + "'"
                    +",'" + primary_data.tax_number + "'"
                    +",'" + primary_data.reason_conde + "'"
                    +",'" + primary_data.bank_name + "'"
                    +",'" + primary_data.bank_id_code + "'"
                    +",'" + primary_data.psrn + "'"
                    +",'" + primary_data.okpo + "'"
                    +",'" + primary_data.corresponding_account + "'"
                    +",'" + primary_data.payment_account + "'"
                    +",'" + +primary_data.with_vat + "'"

                    +",'" + additional_contact.skype + "'"
                    +",'" + additional_contact.phone + "'"
                    +",'" + additional_contact.icq + "'"
                    +",'" + additional_contact.website + "'"

                    +",'" + legal_adress.index + "'"
                    +",'" + legal_adress.region + "'"
                    +",'" + legal_adress.city + "'"
                    +",'" + legal_adress.street + "'"
                    +",'" + legal_adress.house + "'"
                    +",'" + legal_adress.appartement + "'"

                    +",'" + real_adress.index + "'"
                    +",'" + real_adress.region + "'"
                    +",'" + real_adress.city + "'"
                    +",'" + real_adress.street + "'"
                    +",'" + real_adress.house + "'"
                    +",'" + real_adress.appartement + "'"

                    +",'" + provider_information.discount_group + "'"
                    +",'" + provider_information.reply_format + "'"
                    +",'" + provider_information.reply + "'"
                    +",'" + provider_information.credit_limit + "'"
                    +",'" + provider_information.day_of_deffered_payment + "'"
                    +",'" + provider_information.type_of_client + "'"
                    +",'" + provider_information.max_nb_visit_hours + "'"
                    +",'" + provider_information.max_nb_visit_24hours + "'"
                    +",'" + provider_information.exclude_mark_from_blocking + "'"
                    +",'" + provider_information.snapping_visibility + "'"
                    +",'" + +provider_information.disable_default_visibility + "'"
                    +",'" + provider_information.region + "'"
                    +",'" + provider_information.director + "'"
                    +",'" + provider_information.delivery_itinary + "'"
                    +",'" + +provider_information.view_detail_warehouse_info + "'"
                    +",'" + +provider_information.automatic_invoice + "'"
                    +",'" + +provider_information.send_sms + "'"
                    +",'" + +provider_information.send_email + "'"
                    +",'" + +provider_information.lastest_news + "'"
                    +",'" + +provider_information.direct_mail + "'"
                    +",'" + +provider_information.second_name_price_list + "'"
                    +",'" + +provider_information.warehouse_info + "'"
                    +",'" + +provider_information.prohib_automatic_remittance + "'"
                    +",'" + +provider_information.disable_access_web_service + "'"
                    +",'" + provider_information.max_nb_laximo_per_dar + "'"
                    +",'" + provider_information.percentage_package + "'"
                    +",'" + provider_information.reason + "'"

                    +",'" + +color_info.active_color + "'"
                    +",'" + color_info.color_code + "'"
                    +",'" + color_info.comment + "'"
                    +",'" + delivery_type + "'"
                    +",'" + comment + "'"       

                    +", NOW()" 
                    +")"
                    console.log(sql_add);

                    db.query(sql_add,
                        function (error, rows, fields) {
                            if (!!error) {
                                console.log("error in query add provider");
                                console.log(error.message);
                                res.status(500).send("Error in query");
                            }
                            else {
                                console.log("Success query Add provider");
                                res.status(200).json(rows);
                            }
                        }
                    );
                }
            });



    },

    delete: function (req, res) {
        var sql_delete = "DELETE FROM provider WHERE id_provider = '" + req.body.id + "'";

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
        var sql_update = "UPDATE provider SET name = '" + req.body.name + "', telephone =  '" + req.body.telephone + "'";


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
        var sql_show = "Select  id_provider, name, telephone, date_register from provider";

        db.query(sql_show, //changer la requete
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


    }
}