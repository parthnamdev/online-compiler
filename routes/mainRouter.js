const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, mainController.index);
router.get('/login', mainController.login);
router.get('/signup', mainController.signup);
router.get('/logout', mainController.logout);
router.get('/deleteUser', authenticate, mainController.deleteUser);

router.post('/', authenticate, mainController.compile);
router.post('/signup', mainController.registerUser);
router.post('/login', mainController.loginUser);
router.post('/addFile', authenticate, mainController.addFile);
router.post('/deleteFile', authenticate, mainController.deleteFile);

module.exports = router;