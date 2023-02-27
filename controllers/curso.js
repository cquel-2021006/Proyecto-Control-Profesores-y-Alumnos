const { request, response, json } = require('express');
const Curso = require('../models/curso');

const getCurso = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador de Cursos',
        listaCursos
    });

}


const getCursoPorID = async (req = request, res = response) => {

    const { id } = req.params;
    const CursoById = await Curso.findById(id).populate('nombre')


    res.status(201).json(CursoById);

}


const postCurso = async (req = request, res = response) => {

    //Desestructuración
    const { nombre, descripcion } = req.body;
    const usuarioGuardadoDB = new Curso({ nombre, descripcion });

    //Guardar en BD
    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Curso',
        usuarioGuardadoDB
    });

}


const putCurso = async (req = request, res = response) => {
//Req.params sirve para traer parametros de las rutas
const { id } = req.params;
const { _id, estado,...resto } = req.body;
//Los parametros img, rol, estado y google no se modifican, el resto de valores si (nombre, correo y password)

//Editar al usuario por el id
const cursoEditado = await Curso.findByIdAndUpdate(id, resto);

res.json({
    msg: 'PUT editar curso',
    cursoEditado
});
}

const deleteCurso = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    const cursoEliminado = await Curso.findByIdAndDelete( id);

    res.json({
        msg: 'DELETE eliminar user',
        cursoEliminado
    });

}



module.exports = {
    getCurso,
    getCursoPorID,
    postCurso,
    putCurso,
    deleteCurso
}
