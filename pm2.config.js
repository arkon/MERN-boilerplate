require('dotenv').config();

let isProd = process.env.NODE_ENV !== 'development';
console.log("PM2: " + JSON.stringify({isProd}));

module.exports = {
  apps : [{
    name      : 'numis-matters',
    script    : 'src/server',
    watch     : isProd ? false :  'src/server',
    node_args : isProd ? null : ["--inspect=9289"]
  }]
};
