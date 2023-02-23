const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  //x-token headers recibir jwt
  const token = req.header("x-token");
  /* console.log(token); */
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no hay token en la peticion",
    });
  }

  try {
    //payload
    const { uid, name } = jwt.verify(
      token, 
      process.env.SECRET_JWT_SEED
    );

    /* console.log(payload) */

    req.uid = uid;
    req.name = name;
      


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
      
    }
  



    next();
}

module.exports = {
  validarJWT,
};
