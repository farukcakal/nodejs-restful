const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

//oturum açan kullanıcı bilgileri
router.get('/me', authMiddleware, userController.myAccount);

//oturum açan kullanıcı kendisini silmesi
router.delete('/me', authMiddleware, userController.loggedUserDelete);

//oturum açan kullanıcı güncelleme
router.patch('/me', authMiddleware, userController.loggedUserUpdate);

//kullanıcı kayıt
router.post('/', userController.register);

//giriş yap
router.post('/login', userController.login);

module.exports = router;