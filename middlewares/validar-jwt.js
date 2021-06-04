const jwt = require('jsonwebtoken');
const {request, response} = require("express");
const Usuario = require('../models/usuario');


const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}


const validarADMRole = async (req = request, res = response, next) => {
    const uid = req.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(405).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        if (usuarioDB.role != 'ADM_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes los permisos suficentes para esta acción'
            });
        }

        next();

    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'HAble con el adm'
        });
    }
}

const validarADMRoleOMismoUsuario = async (req = request, res = response, next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(405).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        if (usuarioDB.role === 'ADM_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes los permisos suficentes para esta acción'
            });
        }


    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'HAble con el adm'
        });
    }
}

module.exports = {
    validarJWT,
    validarADMRole,
    validarADMRoleOMismoUsuario
}