//Imports
const db = require("../db");
const auth = require('../auth')

//Fonctions Routes
module.exports = {


    add: function (req, res) {
        var lastCode = 0;

        //All DATA Received
        var data = req.body.new_client.data;
        var contact_person = req.body.new_client.contact_person;
        var additional_contact = req.body.new_client.additional_contact;
        var legal_adress = req.body.new_client.legal_adress;
        var real_adress = req.body.new_client.real_adress;
        var client_information = req.body.new_client.provider_information;
        var color_info = req.body.new_client.color_info;
        var delivery_type = req.body.new_client.delivery_type;
        var comment = req.body.new_client.comment;

        var sql_lastcode = "SELECT max(id) as lastCode from client"

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

                    var sql_add = "INSERT INTO client  VALUES ('" + lastCode + "',"
                        + "'" + data.email + "',"
                        + "'" + data.telephone + "',"
                        + "'" + data.password + "',"
                        + "'" + +data.use_primary_messaging + "',"

                        + "'" + contact_person.first_name + "',"
                        + "'" + contact_person.last_name + "',"
                        + "'" + contact_person.second_last_name + "',"
                        + "'" + +contact_person.active_account + "',"
                        + "'" + +contact_person.refuse_profile_modif + "',"
                        + "'" + +contact_person.display_oem + "',"

                        + "'" + additional_contact.skype + "',"
                        + "'" + additional_contact.phone + "',"
                        + "'" + additional_contact.icq + "',"
                        + "'" + additional_contact.website + "',"

                        + "'" + legal_adress.index + "',"
                        + "'" + legal_adress.region + "',"
                        + "'" + legal_adress.city + "',"
                        + "'" + legal_adress.street + "',"
                        + "'" + legal_adress.house + "',"
                        + "'" + legal_adress.appartement + "',"

                        + "'" + real_adress.index + "',"
                        + "'" + real_adress.region + "',"
                        + "'" + real_adress.city + "',"
                        + "'" + real_adress.street + "',"
                        + "'" + real_adress.house + "',"
                        + "'" + real_adress.appartement + "',"

                        + "'" + client_information.type_of_client + "',"
                        + "'" + client_information.reply_format + "',"
                        + "'" + client_information.reply + "',"
                        + "'" + client_information.discount_group + "',"
                        + "'" + client_information.credit_limit + "',"
                        + "'" + +client_information.allow_client_to_assign_discount_group + "',"
                        
                        + "'" + client_information.day_of_deffered_payment + "',"
                        + "'" + client_information.discount_card_number + "',"
                        + "'" + client_information.promotional_code + "',"
                        + "'" + client_information.basis + "',"
                        + "'" + client_information.id_1c + "',"

                        + "'" + +client_information.invoice_auto + "',"
                        + "'" + +client_information.send_sms + "',"
                        + "'" + +client_information.send_email + "',"
                        + "'" + +client_information.lastest_news + "',"
                        + "'" + +client_information.direct_mail + "',"
                        + "'" + +client_information.second_name_price_list + "',"
                        + "'" + +client_information.warehouse_info + "',"
                        + "'" + +client_information.prohib_automatic_remittance + "',"
                        + "'" + +client_information.allow_print_basket + "',"
                        + "'" + +client_information.disable_access_web_service + "',"
                        + "'" + +client_information.prohibit_creation_invoices + "',"
                        + "'" + +client_information.do_not_send_document_after_invoice + "',"                        
                        + "'" + +client_information.change_name_of_the_product + "',"
                        + "'" + client_information.max_nb_laximo_per_day + "',"
                        + "'" + client_information.percentage_package + "',"
                        + "'" + client_information.max_nb_visit_24hours + "',"
                        + "'" + client_information.max_nb_visit_hours + "',"
                        + "'" + client_information.exclude_mark_from_blocking + "',"
                        + "'" + client_information.director + "',"
                        + "'" + client_information.region + "',"
                        + "'" + client_information.action_when_ordering + "',"
                        + "'" + client_information.approved_payment_method + "',"
                        + "'" + client_information.snapping_visibility + "',"
                        + "'" + +client_information.disable_default_visibility + "',"
                        + "'" + client_information.delivery_itinary + "',"
                        + "'" + +client_information.view_detail_warehouse_info + "',"
                        + "'" + client_information.storage_location + "',"

                        + "'" + +color_info.active_color + "',"
                        + "'" + color_info.color_code + "',"
                        + "'" + color_info.comment + "',"

                        + "'" + delivery_type + "',"
                        + "'" + comment + "',"

                        + "''," //Token
                        + "false," //Email_confirmed
                        + "NOW()," //date_registered
                        + "''," //address
                        + "'')" //postal code
               

                    db.query(sql_add,
                        function (error, rows, fields) {
                            if (!!error) {
                                console.log("error in query add Client");
                                console.log(error.message);
                                res.status(500).send("Error in query");
                            }
                            else {
                                console.log("Success query Add Client");
                                res.status(200).json(rows);
                            }
                        }
                    );
                }
            });



    },

    delete: function (req, res) {
        var sql_delete = "DELETE FROM client WHERE email = '" + req.body.email + "'";

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

        //All DATA Received
        var data = req.body.new_client.data;
        var contact_person = req.body.new_client.contact_person;
        var additional_contact = req.body.new_client.additional_contact;
        var legal_adress = req.body.new_client.legal_adress;
        var real_adress = req.body.new_client.real_adress;
        var client_information = req.body.new_client.provider_information;
        var color_info = req.body.new_client.color_info;
        var delivery_type = req.body.new_client.delivery_type;
        var comment = req.body.new_client.comment;

        var sql_add = "UPDATE client SET "
        + "email = '" + data.email + "',"
        + "phone = '" + data.telephone + "',"

        + "first_name= '" + contact_person.first_name + "',"
        + "last_name='" + contact_person.last_name + "',"
        + "second_last_name='" + contact_person.second_last_name + "',"
        + "active_account='" + +contact_person.active_account + "',"
        + "refuse_profile_modif='" + +contact_person.refuse_profile_modif + "',"
        + "display_oem='" + +contact_person.display_oem + "',"

        + "skype='" + additional_contact.skype + "',"
        + "other_phone='" + additional_contact.phone + "',"
        + "icq='" + additional_contact.icq + "',"
        + "website='" + additional_contact.website + "',"

        + "legal_index='" + legal_adress.index + "',"
        + "legal_region='" + legal_adress.region + "',"
        + "legal_city='" + legal_adress.city + "',"
        + "legal_street='" + legal_adress.street + "',"
        + "legal_house='" + legal_adress.house + "',"
        + "legal_appartement='" + legal_adress.appartement + "',"

        + "delivery_index='" + real_adress.index + "',"
        + "delivery_region='" + real_adress.region + "',"
        + "delivery_city='" + real_adress.city + "',"
        + "delivery_street='" + real_adress.street + "',"
        + "delivery_house='" + real_adress.house + "',"
        + "delivery_appartement='" + real_adress.appartement + "',"

        + "id_type_client='" + client_information.type_of_client + "',"
        + "reply_format='" + client_information.reply_format + "',"
        + "reply='" + client_information.reply + "',"
        + "discount_group='" + client_information.discount_group + "',"
        + "allow_client_to_assign_discount_group='" + +client_information.allow_client_to_assign_discount_group + "',"
        + "credit_limit='" + client_information.credit_limit + "',"
        + "day_of_deffered_payment='" + client_information.day_of_deffered_payment + "',"
        + "discount_card_number='" + client_information.discount_card_number + "',"
        + "promotional_code='" + client_information.promotional_code + "',"
        + "basis='" + client_information.basis + "',"
        + "id_1c='" + client_information.id_1c + "',"
        + "invoice_auto='" + +client_information.invoice_auto + "',"
        + "send_sms='" + +client_information.send_sms + "',"
        + "send_email='" + +client_information.send_email + "',"
        + "lastest_news='" + +client_information.lastest_news + "',"
        + "direct_mail='" + +client_information.direct_mail + "',"
        + "second_name_price_list='" + +client_information.second_name_price_list + "',"
        + "warehouse_info='" + +client_information.warehouse_info + "',"
        + "prohib_automatic_remittance='" + +client_information.prohib_automatic_remittance + "',"
        + "allow_print_basket='" + +client_information.allow_print_basket + "',"
        + "disable_access_web_service='" + +client_information.disable_access_web_service + "',"
        + "prohibit_creation_invoices='" + +client_information.prohibit_creation_invoices + "',"
        + "change_name_of_the_product='" + +client_information.change_name_of_the_product + "',"
        + "max_nb_laximo_per_day='" + client_information.max_nb_laximo_per_day + "',"
        + "percentage_package='" + client_information.percentage_package + "',"
        + "max_nb_visit_24hours='" + client_information.max_nb_visit_24hours + "',"
        + "max_nb_visit_hours='" + client_information.max_nb_visit_hours + "',"
        + "exclude_mark_from_blocking='" + client_information.exclude_mark_from_blocking + "',"
        + "director='" + client_information.director + "',"
        + "region='" + client_information.region + "',"
        + "action_when_ordering='" + client_information.action_when_ordering + "',"
        + "approved_payment_method='" + client_information.approved_payment_method + "',"
        + "snapping_visibility='" + client_information.snapping_visibility + "',"
        + "disable_default_visibility='" + +client_information.disable_default_visibility + "',"
        + "delivery_itinary='" + client_information.delivery_itinary + "',"
        + "view_detail_warehouse_info='" + +client_information.view_detail_warehouse_info + "',"
        + "storage_location='" + client_information.storage_location + "',"

        + "active_color='" + +color_info.active_color + "',"
        + "color_code='" + color_info.color_code + "',"
        + "color_comment='" + color_info.comment + "',"

        + "delivery_type='" + delivery_type + "',"
        + "comment='" + comment +"'"
        + "WHERE email ='"+data.email+"'"

    console.log(sql_add);

    db.query(sql_add,
        function (error, rows, fields) {
            if (!!error) {
                console.log("error in query Update Client");
                console.log(error.message);
                res.status(500).send("Error in query");
            }
            else {
                console.log("Success query Update Client");
                res.status(200).json(rows);
            }
        }
    );

    },

    show: function (req, res) {

        var sql_show = "Select c.id as id_client, c.first_name, c.last_name, c.email, c.phone as telephone, c.date_registered as date_registration, tc.nom_type, tc.idType from client c, type_client tc WHERE c.id_type_client = tc.idType";

        db.query(sql_show, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show Clients");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Show Client");
                    res.status(200).json(rows);
                }
            });


    },

    showTypeClient: function (req, res) {
        var sql = "SELECT * from type_client"

        db.query(sql, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query Show type Client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query Show Type Client");
                    res.status(200).json(rows);
                }
            });
    },

    changeTypeClient: function (req, res) {

        var id_client = req.body.data.id_client;
        var id_type = req.body.data.id_type;

        var sql = "UPDATE client set id_type_client ='" + id_type + "' WHERE id='" + id_client + "'";
        db.query(sql, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query change type Client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    console.log("Success query change Type Client");
                    res.status(200).send("Success!");
                }
            });
    },


    add_cathegory_client: function (req, res) {
        var name = req.body.name;
        var margin = req.body.margin;
        var lastCode = 0;

        var sql = "SELECT MAX(idType) as lastcode from type_client";
        db.query(sql, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query change type Client");
                    console.log(error.message);
                    res.status(500).send("Error in query");
                }
                else {
                    lastCode = rows[0].lastcode + 1;
                    var sql_add = "INSERT INTO type_client VALUES ('" + lastCode + "', '" + name + "', '" + margin + "')";

                    db.query(sql_add, //changer la requete
                        function (error, rows, fields) {
                            if (!!error) {
                                console.log("error in query change type Client");
                                console.log(error.message);
                                console.log(sql_add);
                                res.status(500).send("Error in query");
                            }
                            else {
                                res.status(200).send("Success!");
                            }
                        });


                }
            });
    },

    delete_cathegory_client : function(req, res) {

        sql_update = "UPDATE client SET id_type_client = '0' WHERE id_type_client = '"+req.body.id+"'"

        sql = "DELETE from type_client WHERE idType = '"+req.body.id+"'"

        db.query(sql_update,
            function(error, rows){
                if(!!error){
                    console.log(error.message)
                    res.status(500).send("Error in query");
                    console.log(sql)
                }
                else{
                    console.log("Type Client updated before Delete");                                        
                }
            })


        db.query(sql,
            function(error, rows){
                if(!!error){
                    console.log(error.message)
                    res.status(500).send("Error in query");
                    console.log(sql)
                }
                else{
                    console.log("Type Client DELETED");
                    res.status(200).send("test");                    
                }
            })


    },

    get_client_by_id: function (req, res) {
        var id = req.query.id_client;

        var sql = "SELECT * from client where id = "+id;

        db.query(sql, //changer la requete
            function (error, rows, fields) {
                if (!!error) {
                    console.log("error in query get client by id");
                    console.log(error.message);
                    console.log(sql);
                    res.status(500).send("Error in query");
                }
                else {
                    res.status(200).json(rows);                    
                }
            });

    }
}