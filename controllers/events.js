const { response } = require("express");
const Evento=require('../models/Evento')

const getEventos = async (req, res = response) => {
    res.json({
        ok:true,
        msg:'getEvento'
    })


}
const crearEvento = async (req, res = response) => {

    //verificar que tenga el evento

    const evento= new Evento(req.body);

    try{

        evento.user=req.uid;

        const eventoGuardado=await evento.save()
        res.json({
            ok:true,
            evento:eventoGuardado
        })


    }catch(error){
        res.json({
            ok:false,
            msg:'hable con el adminsitador'
        })
    

    }

}
const actualizarEvento = async (req, res = response) => {

    res.json({
        ok:true,
        msg:'actualizarEvento'
    })


}
const eliminarEvento = async (req, res = response) => {
    res.json({
        ok:true,
        msg:'eliminarEvento'
    })


}


 


module.exports = { getEventos,crearEvento ,actualizarEvento,eliminarEvento};
