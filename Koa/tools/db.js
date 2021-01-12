const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const DBconfig = require('../db/defaultConfig')
const basePathG = path.join(__dirname, '../models');

let models = fs.readdirSync(basePathG);

dbInit();

async function dbInit() {
    let sequelize = await new Sequelize(
        DBconfig.database.DATABASE,
        DBconfig.database.USERNAME,
        DBconfig.database.PASSWORD,
        {
            host: DBconfig.database.HOST,
            dialect: 'mysql',
            port: DBconfig.database.PORT,
            timestamp: false,
            quoteIdentifiers: true
        }
    );
    models.forEach((item, index) => {
        let name = item.substr(0, item.length - 3);
        name = name.substring(0,1).toUpperCase() + name.substring(1)//首字母大写
        module.exports[name] = require(basePathG + `/${item}`)(sequelize, Sequelize.DataTypes)
    });
}