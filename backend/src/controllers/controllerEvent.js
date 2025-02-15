const Event = require('../models/event')

//Crear el evento
exports.createEvent = async (req, res) => {
    try {
         // Obtener el usuario logueado
         const organizer = req.user;
         // Crear un nuevo evento y agregar el organizador al body
         const newEvent = new Event({
             ...req.body,
             organizer: organizer.id
         });
 
        await newEvent.save();
        res.status(201).json({message:'Evento creado exitosamente', newEvent});
    } catch (error) {
        res.status(500).json({message:'Error al crear el Evento', error: error.message})
    }
}

//Traer un evento
exports.getEventById = async (req, res) => {
    try {
        const eventOne = await Event.findById(req.params.id).populate('organizer');

        //Verifica el evento
        if (eventOne != null) {
           res.status(200).json({message: 'El evento se obtuvo exitosamente', event: eventOne});
        } else {
            res.status(404).json({message:`No se ha encontrado ningun evento con el id: ${req.params.id}`});
        }

    } catch (error) {
        res.status(500).json({message:'Error en el servidor', error: error.message})
    }
}

//Traer todos los eventos
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer');
        res.status(200).json({message: 'Eventos obtenidos exitosamente',count : events.length , events: events})
    } catch (error) {
        res.status(500).json({message:'Error al obtener los Eventos', error: error.message})
    }
}

//Actualizar el Evento
exports.updateEvent = async (req, res) =>{
    try {
        const eventUpdate = await Event.findByIdAndUpdate( req.params.id, req.body, {new: true});
        res.status(200).json({message: 'Evento actualizado exitosamente', event: eventUpdate});
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el evento', error: error.message})
    }
}

//Eliminar el Evento
exports.deleteEvent = async (req, res) => {
    try {
        const eventDelete = await Event.findByIdAndDelete( req.params.id);
        res.status(200).json({message:'Evento eliminado exitosamente', event: eventDelete})
    } catch (error) {
        res.status(500).json({message:'Error al eliminar el evento', error: error.message})
    }
}