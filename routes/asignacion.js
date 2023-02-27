const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { getAsignacion, getAsignacionPorID, postAsignacion, putAsignacion, deleteAsignacion } = require('../controllers/asignacion');
const { existeAsignacionPorId, existeCursoPorId } = require('../helpers/db-validators');
const { asignacion, asignacionMasDeTres } = require('../middlewares/validar-asignacion');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAlumno, esProfesor } = require('../middlewares/validar-roles');


const router = Router();

//Manejo de rutas

// Obtener todas las categorias - publico
router.get('/', getAsignacion );

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeAsignacionPorId ),
    validarCampos
], getAsignacionPorID );

// Crear categoria - privada - cualquier persona con un token válido
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,postAsignacion);

// Actuaizar categoria - privada - cualquier persona con un token válido
router.put('/editar/:id', [
    validarJWT,
    esAlumno,
    check('id').custom(existeCursoPorId),
    validarCampos
] ,putAsignacion);

//Borrar una categoria - privado - Solo el admin puede eliminar una categoria (estado: false)
router.delete('/eliminar/:id', [
    validarJWT,
    esProfesor,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeAsignacionPorId ),
    validarCampos
] ,deleteAsignacion);



module.exports = router;