const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


//Controllers
const { getCurso, getCursoPorID, postCurso, putCurso, deleteCurso } = require('../controllers/curso');
const { existeCursoPorId, existeAsignacionPorId } = require('../helpers/db-validators');
const { esProfesor, esAlumno } = require('../middlewares/validar-roles');
const asignacion = require('../models/asignacion');
const { asignacionMasDeTres } = require('../middlewares/validar-asignacion');

const router = Router();

//Manejo de rutas

// Obtener todas las productos - publico
router.get('/', getCurso );

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], getCursoPorID);

// Crear producto - privada - cualquier persona con un token válido
router.post('/agregar', [
    validarJWT,
    esProfesor,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCurso);

// Actuaizar producto - privada - cualquier persona con un token válido
router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeAsignacionPorId ),
], putCurso);

//Borrar un producto - privado - Solo el admin puede eliminar una categoria (estado: false)
router.delete('/eliminar/:id', [
    validarJWT,
    esProfesor,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], deleteCurso);



module.exports = router;