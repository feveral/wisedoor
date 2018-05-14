module.exports = {
    httpPort:80,
    httpsPort: 443,
    devPort: 8080,
    db_name: 'Wisedoor',
    db_config: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '5566',
        database: 'Wisedoor'
    },
    corsOrigin: [`http://localhost:8080`, `http://localhost`, `http://funnypicture.ml`]
}