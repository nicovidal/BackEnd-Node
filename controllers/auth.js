const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email }); //{email:email} puede ser asi igualmente
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }
    //create user on mongo
    usuario = new Usuario(req.body);
    //lo guarda en base de datos
    await usuario.save();

    res.status(201).json({
      ok: true,
      uid:usuario.id,
      name:usuario.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
