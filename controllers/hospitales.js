const {response, request} = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();


        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: true,
                msg: 'No existe ese id'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            hospitalActualizado
        })
    } catch (e) {
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarHospital = async (req = request, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).json({
                ok: true,
                msg: 'No existe ese id'
            })
        }

       await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Registro eliminado'
        })
    } catch (e) {
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}