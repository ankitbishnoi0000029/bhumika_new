import mysql from 'mysql2/promise';


const ddb = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    // port: Number(process.env.DB_PORT),
    // ssl: {
    //     ca: process.env.AIVEN_SSL_CA,  // using env
    //   },
    waitForConnections: true,
    connectionLimit: 10, // Adjust as needed
    queueLimit: 0
});
export default ddb;

