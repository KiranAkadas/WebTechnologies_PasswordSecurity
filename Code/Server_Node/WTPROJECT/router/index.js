const user = require('./user.js');

module.exports = (router) =>{
    user(router);
    return router;
}