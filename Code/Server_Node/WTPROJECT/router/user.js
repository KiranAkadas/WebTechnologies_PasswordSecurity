const controller = require('../controller/user.js')
//app.use(cors( {origin:"http://localhost:4200"}))

module.exports = (router) => {
    router.route('/user')
    .post(controller.adduser)
    
	router.route('/user1')
    .post(controller.getusers)
	
	router.route('')
}