//Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = express.Router();
var cors = require('cors');

//Import Controller 
var produitController = require("./Controllers/produit_Controller");
var clienController = require("./Controllers/client_Controller");
var providerController = require("./Controllers/provider_Controller");
var bc_clientController = require("./Controllers/bc_client_Controller");
var bc_provider_Controller = require("./Controllers/bc_provider_Controller");
var bl_client_Controller = require("./Controllers/bl_client_Controller");
var bl_provider_Controller = require("./Controllers/bl_provider_Controller");

var categorie_List_Controller = require("./Controllers/categorie_List_Controller");
var notification_Controller = require('./Controllers/notification_Controller');
var bill_Controller = require('./Controllers/bills_Controller');
var stat_Controller = require('./Controllers/stats_Controller');
var admin_controller = require('./Controllers/admin_controller');
var api_Controller = require('./Controllers/api_Controller');


var auth = require('./auth');




// Router
exports.router = (function () {
    //Config api
    apiRouter.use(bodyParser());
    apiRouter.use(cors());

    //Exemple de route : apiRouter.route('/rdv/denieRdv').post(verifyTokenMedecin, rdvController.denieRdv);

    //AUTH SERVICE
    apiRouter.route('/loginAdmin').post(auth.login);

    //Admin CRUD
    apiRouter.route('/addAdmin').post(auth.auth_verification, admin_controller.addAdmin);
    apiRouter.route('/showAdmin').get(auth.auth_verification, admin_controller.showAdmin);
    apiRouter.route('/deleteAdmin').post(auth.auth_verification, admin_controller.deleteAdmin);



    //Produit CRUD
    apiRouter.route('/addProduit').post(auth.auth_verification, produitController.add);
    apiRouter.route('/delProduit').delete(auth.auth_verification, produitController.delete);
    apiRouter.route('/updateProduit').post(auth.auth_verification, produitController.update);
    apiRouter.route('/showProduit').get(auth.auth_verification, produitController.show);
    apiRouter.route('/returnProducrs').post(auth.auth_verification, produitController.return_products);

    // CLIENT

    //Client CRUD
    apiRouter.route('/addClient').post(auth.auth_verification, clienController.add);
    apiRouter.route('/delClient').delete(auth.auth_verification, clienController.delete);
    apiRouter.route('/updateClient').post(auth.auth_verification, clienController.update);
    apiRouter.route('/showClient').get(auth.auth_verification, clienController.show);
    apiRouter.route('/showTypeClient').get(auth.auth_verification, clienController.showTypeClient);
    apiRouter.route('/changeTypeClient').post(auth.auth_verification, clienController.changeTypeClient);
    
    apiRouter.route('/addCathegoryClient').post(auth.auth_verification, clienController.add_cathegory_client);
    apiRouter.route('/deleteCathegoryClient').post(auth.auth_verification, clienController.delete_cathegory_client);

    apiRouter.route('/getClientById').get(auth.auth_verification, clienController.get_client_by_id);

    
    //Bc_Client CRUD    Order Client
    apiRouter.route('/addBcClient').post(auth.auth_verification, bc_clientController.add);
    apiRouter.route('/delBcClient').delete(auth.auth_verification, bc_clientController.delete);
    apiRouter.route('/updateBcClient').post(auth.auth_verification, bc_clientController.update);
    apiRouter.route('/showBcClient').get(auth.auth_verification, bc_clientController.show);
    apiRouter.route('/showBcClientByFrsId').get(auth.auth_verification, bc_clientController.show_bc_ligne_client_by_id_provider);
    apiRouter.route('/showProduitFromBcClient').get(auth.auth_verification, bc_clientController.show_produit_from_bc_client);
    apiRouter.route('/showBcIPClientByFrsId').get(auth.auth_verification, bc_clientController.show_bc_InProgress_ligne_client_by_id_provider);
    apiRouter.route('/cancelOrderId').get(auth.auth_verification, bc_clientController.cancel_Order_By_Id);    
    apiRouter.route('/showBcClientByIdClient').get(auth.auth_verification, bc_clientController.show_bc_client_by_idClient);    
    apiRouter.route('/showProduitFromIdClient').get(auth.auth_verification, bc_clientController.show_produit_from_id_client);    
    
    //Bl_Client CRUD  Delivery Client
    apiRouter.route('/addBlClient').post(auth.auth_verification, bl_client_Controller.add);
    apiRouter.route('/delBlClient').delete(auth.auth_verification, bl_client_Controller.delete);
    apiRouter.route('/updateBlClient').post(auth.auth_verification, bl_client_Controller.update);
    apiRouter.route('/showBlClient').get(auth.auth_verification, bl_client_Controller.show);


    //PROVIDER

    //Provider CRUD
    apiRouter.route('/addProvider').post(auth.auth_verification, providerController.add);
    apiRouter.route('/delProvider').delete(auth.auth_verification, providerController.delete);
    apiRouter.route('/updateProvider').post(auth.auth_verification, providerController.update);
    apiRouter.route('/showProvider').get(auth.auth_verification, providerController.show);

    //Bc_Frs CRUD  Order Provider
    apiRouter.route('/addBcFrs').post(auth.auth_verification, bc_provider_Controller.add);
    apiRouter.route('/delBcFrs').delete(auth.auth_verification, bc_provider_Controller.delete);
    apiRouter.route('/updateBcFrs').post(auth.auth_verification, bc_provider_Controller.update);
    apiRouter.route('/showBcFrs').get(auth.auth_verification, bc_provider_Controller.show);
    apiRouter.route('/showProduitFromBcProvider').get(auth.auth_verification, bc_provider_Controller.showProduitFromBcProvider);    

    //Bl_Frs CRUD  Delivery Provider
    apiRouter.route('/addBlFrs').post(auth.auth_verification, bl_provider_Controller.add);
    apiRouter.route('/delBlFrs').delete(auth.auth_verification, bl_provider_Controller.delete);
    apiRouter.route('/updateBlFrs').post(auth.auth_verification, bl_provider_Controller.update);
    apiRouter.route('/showBlFrs').get(auth.auth_verification, bl_provider_Controller.show);
    apiRouter.route('/showProduitFromBlFrs').get(auth.auth_verification, bl_provider_Controller.show_Produit_From_Bl_Frs);
    

    //CATEGORIE_NOTIFICATION
    apiRouter.route('/addCategorieNotif').post(auth.auth_verification, categorie_List_Controller.add);
    apiRouter.route('/delCategorieNotif').delete(auth.auth_verification, categorie_List_Controller.delete);
    apiRouter.route('/updateCategorieNotif').post(auth.auth_verification, categorie_List_Controller.update);
    apiRouter.route('/showCategorieNotif').get(auth.auth_verification, categorie_List_Controller.show);

    //NOTIFICATION
    apiRouter.route('/addNotification').post(auth.auth_verification, notification_Controller.add);
    apiRouter.route('/delNotification').delete(auth.auth_verification, notification_Controller.delete);
    apiRouter.route('/updateNotification').post(auth.auth_verification, notification_Controller.update);
    apiRouter.route('/showNotification').get(auth.auth_verification, notification_Controller.show);

    //BILLS
    apiRouter.route('/showBills').get(auth.auth_verification, bill_Controller.show);
    apiRouter.route('/addBill').post(auth.auth_verification, bill_Controller.add);
    apiRouter.route('/billIsPaid').get(auth.auth_verification, bill_Controller.billispaid);

    //STATS
    apiRouter.route('/getStatsTotalClient').get(stat_Controller.getStats_Total_Client);
    apiRouter.route('/getStatsTotalMoneyEarned').get(stat_Controller.getStats_Total_Money_Earned);
    apiRouter.route('/getStatsTotalProvider').get(stat_Controller.getStats_Total_Provider);
    apiRouter.route('/getStatsTotalSells').get(stat_Controller.getStats_Total_Sells);

    //API
    apiRouter.route('/getAPI').get(auth.auth_verification, api_Controller.show_API);
    apiRouter.route('/addAPI').post(auth.auth_verification, api_Controller.add_API);
    apiRouter.route('/deleteAPI').post(auth.auth_verification, api_Controller.delete_API);    

    return apiRouter;
})();