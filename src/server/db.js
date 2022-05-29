const connection = {
    host: '',
    user: '',
    password: '',
    database: ''
}

const $mysql = require('mysql');

const $sql = $mysql.createConnection(connection)

$sql.connect()

module.exports = $sql