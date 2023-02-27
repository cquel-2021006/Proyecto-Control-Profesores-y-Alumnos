const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio' ]
    },
    rol: {
        type: String,
        default: 'ESTUDIANTE_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    }
});


module.exports = model('Usuario', UsuarioSchema);