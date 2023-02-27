const { request, response } = require('express');
const Asignacion = require('../models/asignacion');


const getAsignacion = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaAsignacion = await Promise.all([
        Asignacion.countDocuments(query),
        Asignacion.find(query).populate('usuario', 'nombre')
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        listaAsignacion
    });

}


const getAsignacionPorID = async (req = request, res = response) => {

    const { id } = req.params;
    const asignacionById = await Asignacion.findById(id).populate('nombre', 'curso');

    res.status(201).json(asignacionById);

}


const postAsignacion = async (req = request, res = response) => {
    //toUpperCase para todo a Mayusculas
    const nombre = req.body.nombre.toUpperCase();

    const asignacionDB = await Asignacion.findOne({ nombre });

    //validacion para verificar si ya existe dicha categoria para que no lo agregue
    if (asignacionDB) {
        return res.status(400).json({
            msg: `La asignacion ${asignacionDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario.id,
        curso: req.body.curso
    }

    const asignacion = new Asignacion(data);
    //Guardar en DB
    await asignacion.save();

    res.status(201).json(asignacion);

}


const putAsignacion = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;
    resto.curso = req.curso._id;

    //Editar o actualiar la cateogira
    const asignacionEditada = await Asignacion.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(asignacionEditada);

}

const deleteAsignacion = async (req = request, res = response) => {

    const { id } = req.params;

    //Editar o actualiar la cateogira: Estado FALSE
    const asignacionBorrada = await Asignacion.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(201).json(asignacionBorrada);

}




module.exports = {
    getAsignacion,
    getAsignacionPorID,
    postAsignacion,
    putAsignacion,
    deleteAsignacion
}
