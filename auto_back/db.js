//Connection a la Base de Donnée

var mysql = require('mysql');
var connection = mysql.createPool({
    //connectionLimit : 50  //<= limite de connection par sec a la bdd

    host : '64.188.2.244',    
    user : 'era_creator',
    port: 3306,
    database : 'era_auto_parts',
    password : 'Gu35T_2020', 
    multipleStatements: true,
    
    /*
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'sqlVolcaniqua',
    database: 'era_auto'*/
});

module.exports = connection;