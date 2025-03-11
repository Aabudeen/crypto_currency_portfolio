require('dotenv').config()
module.exports = {
  apps : [{
    name:"CRYPTO TASK",
    script: 'app.js',
    watch:true,
    output: 'logs/pm2/out.log',
    error: 'logs/pm2/error.log',
    ignore_watch: [
        "logs", "logs/*", ".node-gyp", ".node-gyp/*", ".pm2", ".pm2/*", "public", "public/*",
        "xml_file/*"],
    log: 'logs/pm2/user.outerr.log',
    env: {
        NODE_ENV: 'local',
        PORT: process.env.PORT
    },
    env_production: {
        NODE_ENV: 'prod',
        PORT: process.env.PORT
    }
  }]
};
