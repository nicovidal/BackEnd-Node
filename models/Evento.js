const {Schema,model}= require('mongoose');

const EventoSchema=Schema({

    title:{
        type:String,
        required:true
    },
    notes:{
        type:String,

    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    //se pasa el dato desde la otra tabla
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
});

//como se seralize o configuraciones que uno desee

EventoSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();

    object.id=_id;
    return object;

})


module.exports=model('Evento',EventoSchema);