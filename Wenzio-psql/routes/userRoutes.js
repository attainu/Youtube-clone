const { Router } = require('express');
const controller = require('../controllers/userController');
const middleware = require('../middlewares/authenticate');
const router = Router()


//route for confirming the password that has been sent to user while registering
//router.get('/emailConfirmation/:token',controller.emailConfirmation);

//User can change password only when logged in
router.post('/user/changePassword',middleware.authentication, controller.changePassword)
//route for registration
router.post('/user/register', controller.register);
//route for login
router.post('/user/login', controller.login)
//User can logout only when logged in
router.delete('/user/logout',middleware.authentication, controller.logout)

module.exports = router