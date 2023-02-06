require('dotenv').config();
const env = process.env;
 
const development = {
    "username": "root",
    "password": "import1015",
    "database": "import",
    "host": "mariadb",
    "port" : "3306",
    "dialect": "mysql"
  };
const test = {
    "username": "root",
    "password": "import1015",
    "database": "import",
    "host": "mariadb",
    "port" : "3306",
    "dialect": "mysql"
  };
const production = {
    "username": "root",
    "password": "import1015",
    "database": "import",
    "host": "mariadb",
    "port" : "3306",
    "dialect": "mysql"
  };

module.exports = { development, production, test };
