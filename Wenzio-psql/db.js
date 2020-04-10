//importing the Sequlize orm

const { Sequelize } = require("sequelize");
// require("colors");

//connecting the app with the postgre Sql instance hosted on aws with the help of Elephant sql platform

require('dotenv').config();

const connectDB = new Sequelize(
  process.env.HOST,
  process.env.USER,
  process.env.PASS,
  {
    host: "satao.db.elephantsql.com",
    dialect:"postgres",
pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
}
)

connectDB
.authenticate()
.then(()=>{
  console.log(
    "Postgres database has been connected successfully"
  );
})
.catch(err=>{
  console.error(
    "Connection failed Database not connected error:",
   err
   );
});
module.exports = connectDB



//CODE MODIFICATION STARTS HERE

// const Sequelize = require('sequelize');

// module.exports = new Sequelize('dProject', 'postgres', 'November@247', {
//   host: 'localhost',
//   dialect: 'postgres',
// });


