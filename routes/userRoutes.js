const { Router } = require('express')
const { Register, Login, Logout, users } = require('../controllers/userController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.get('/users', users)
router.post('/register', Register)
router.post('/login', Login)
router.delete('/logout/:token', authenticate,  Logout)

module.exports = router