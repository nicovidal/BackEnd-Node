const { response } = require("express");
const Evento=require('../models/Evento')

const getEventos = async (req, res = response) => {

    /* .populate para rellenar documentos */
    const eventos=await Evento.find()
                            .populate('user','name');




    res.json({
        ok:true,
        eventos
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

    const eventoId=req.params.id;
    const uid=req.uid;

    try{

        const evento=await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== uid){

            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar ese mensaje'
            })

        }

        const nuevoEvento={
            ...req.body,
            user:uid
        }

        const eventoActualizado=await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});//aqui se define si quiere que retorne lo nuevo actualizado.

        res.json({
            ok:true,
            evento:eventoActualizado
        });


    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })



    }


}
const eliminarEvento = async (req, res = response) => {

    const eventoId=req.params.id;
    const uid=req.uid;

    try{

        const evento=await Evento.findById(eventoId);

        if(!evento){
           return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if(evento.user.toString() !== uid){

            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar ese mensaje'
            })

        }


        await Evento.findByIdAndDelete(eventoId);//aqui se define si quiere que retorne lo nuevo actualizado.

        res.json({ok:true});


    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })



    }

}


 


module.exports = { getEventos,crearEvento ,actualizarEvento,eliminarEvento};
