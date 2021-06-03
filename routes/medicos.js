/*
    Medicos
    ruta: '/api/medico'
*/
const {Router} = require('express');
const {body} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const {validarJWT} = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
} = require('../controllers/medicos')


const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/',
    [
        validarJWT,
        body('name', 'El nombre del médico es necesario').not().isEmpty(),
        body('hospital', 'El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [validarJWT, body('name', 'El nombre del médico es necesario').not().isEmpty(), validarCampos],
    actualizarMedico
);

router.delete('/:id', validarJWT,
    borrarMedico
);

router.get('/:id', validarJWT,
    getMedicoById
);


module.exports = router;



