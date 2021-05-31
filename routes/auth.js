/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post( '/',
    [
        body('email', 'El email es obligatorio').isEmail(),
        body('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post( '/google',
    [
        body('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)






module.exports = router;
