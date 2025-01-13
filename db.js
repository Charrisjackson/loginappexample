//database configuration 
const mysql = require('mysql2'); // module written to get node and sql to interact easier
const dotenv = require('dotenv'); //initializes dotenv file

dotenv.config();

//database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

// connection 
// .promise() 
// .query('SELECT * FROM users')
// .then(([rows,fields])=>{
//     console.log(rows)
// })
console.log(connection.password);

module.exports= connection;