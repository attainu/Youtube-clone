const { Router } = require('express')
const { Register, Login, Logout, users } = require('../controllers/userController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.get('/user/all', users)
router.post('/user/register', Register)
router.post('/user/login', Login)
router.delete('/user/logout/:token', authenticate,  Logout)

module.exports = router