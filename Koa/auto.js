const DBconfig = require('./db/defaultConfig')
const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto(
    DBconfig.database.DATABASE,
    DBconfig.database.USERNAME,
    DBconfig.database.PASSWORD,
    {
        host: DBconfig.database.HOST,      // 数据库服务器ip
        dialect: 'mysql',
        directory: './models',  // prevents the program from writing to disk
        port: DBconfig.database.PORT,           // 数据库运行端口
        additional: {
            timestamps: false
        }
    }
)
auto.run(function (err) {
    if (err) throw err;
    // console.log(auto.tables); // table list
    // console.log(auto.foreignKeys); // foreign key list
 
    //生成models表后，直接执行项目
    require('./bin/www');
});