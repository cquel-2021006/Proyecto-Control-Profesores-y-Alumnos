const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre de la curso es obligatorio'],
        unique: true
    },
    descripcion: { type: String },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});


module.exports = model('Curso', CursoSchema);