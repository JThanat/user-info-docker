//  config.js
//
//  Simple application configuration. Extend as needed.
module.exports = {
  port: process.env.PORT || 8123,
  db: {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    dbName: process.env.MONGODB_DBNAME || 'asset_mapping'
  }
};
