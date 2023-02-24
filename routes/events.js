//events routes
// /api/events
const { Router } = require("express");
const { getEventos,crearEvento ,actualizarEvento,eliminarEvento} = require("../controllers/events");
const {check}=require('express-validator')
const{validarCampos}=require('../middlewares/validar-campos')
const router = Router();
const {validarJWT}=require('../middlewares/validar-jwt');
const { isDate } = require("../helpers/isDate");


//todas tienen que pasar por la validacion del JWT
//todas las peticiones deben pasar por validar token
router.use(validarJWT)
//obtener eventos

router.get('/',getEventos);


//crear un evento
router.post('/',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
]
,crearEvento);


//actualizar  evento
 router.put('/:id',actualizarEvento);



//borrar evento
router.delete('/:id',eliminarEvento)


module.exports=router;