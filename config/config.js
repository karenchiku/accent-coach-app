const config = {
  "user": process.env.sqluser,
  "password": process.env.sqlpassword,
  "server": process.env.sqlserver,
  "database": process.env.sqldatabase,
  options: {
    encrypt: true // enable SSL encryption
  }
};

module.exports = config;
