const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

//admin kullanıcı güncelleme
router.patch('/:id', [authMiddleware, adminMiddleware], userController.adminUserUpdate);

//admin kullanıcı silme
router.delete('/:id', [authMiddleware, adminMiddleware], userController.adminUserDelete);

//tüm kullanıcı listesi
router.get('/', [authMiddleware, adminMiddleware], userController.allUsers);

module.exports = router;