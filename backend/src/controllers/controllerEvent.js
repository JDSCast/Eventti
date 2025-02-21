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
        const hasPermission = await userPass(req, eventOne)
        //Verifica que el evento exista
        if (eventOne !== null) {
            // No es administrador, verifica que sea su propio evento
            if (!hasPermission) {
                return res.status(403).json({message: 'No tienes permisos para ver este evento'})
            }
           res.status(200).json({message: 'El evento se obtuvo exitosamente', event: eventOne});
        } else {
            res.status(404).json({message:`No se ha encontrado ningun evento con el id: ${req.params.id}`});
        }

    } catch (error) {
        res.status(500).json({message:'Error en el servidor', error: error.message})
    }
}

//Decide si devuelve todos los eventos o solo los evento de usuario no autenticado
exports.getAllEvents = async (req, res) => {

    try {
        if(req.user){
            if(req.user.role === 'admin'){
                //Administrador puede ver y editar todos los eventos
                return await exports.getAllEventsAdmin(req, res);
            }
                //Usuario auth puede ver los eventos pero solo puede editar sus propios eventos
                return await exports.getAllEventsUser(req, res);
        }
        // Usuario sin auth solo puede ver los eventos
        const events = await Event.find().populate('organizer');
        const cleanEvents = events.map(event => {
            const { organizer, ...rest } = event.toJSON();
            return {
                ...rest,
                organizer: {
                    name: organizer.name,
                    lastname: organizer.lastname,
                    email: organizer.email
                  }
            };
        });

        res.status(200).json({message: 'Eventos obtenidos exitosamente', count : cleanEvents.length , events: cleanEvents})
    } catch (error) {
        res.status(500).json({message:'Error al obtener los Eventos', error: error.message})
    }
}

//Traer todos los eventos para administrador
exports.getAllEventsAdmin = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer');
        res.status(200).json({message: 'Eventos obtenidos exitosamente',count : events.length , events: events})
    } catch (error) {
        res.status(500).json({message:'Error al obtener los Eventos', error: error.message})
    }
}

// Traer todos los eventos con indicador de editable si coincide con el usuario autenticado
exports.getAllEventsUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const events = await Event.find().populate('organizer');
        const editableEvents = events.map(event => {
            const eventObj = event.toObject(); // Necesario para manipular solo la info y no el documento de Mongo
            const editable = event.organizer._id.equals(userId);
            const { organizer, ...rest } = eventObj;

            return {
                ...rest,
                organizer: {
                    name: organizer.name,
                    lastname: organizer.lastname,
                    email: organizer.email
                  },
                editable // agrega el campo editable
            }
            });
        res.status(200).json({message: 'Eventos obtenidos exitosamente', count : editableEvents.length, events: editableEvents})
    } catch (error) {
        res.status(500).json({message:'Error al obtener los Eventos', error: error.message})
    }
}

//Actualizar el Evento
exports.updateEvent = async (req, res) =>{
    try {
        const hasPermission = await userPass(req)
        if (!hasPermission) {
            return res.status(403).json({message: 'No tienes permisos para editar este evento'})
        }
        const eventUpdate = await Event.findByIdAndUpdate( req.params.id, req.body, {new: true});
        res.status(200).json({message: 'Evento actualizado exitosamente', event: eventUpdate});
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el evento', error: error.message})
    }
}

//Eliminar el Evento
exports.deleteEvent = async (req, res) => {
    try {
        const hasPermission = await userPass(req)
        if (!hasPermission) {
            return res.status(403).json({message: 'No tienes permisos para eliminar este evento'})
        }
        const eventDelete = await Event.findByIdAndDelete( req.params.id);
        res.status(200).json({message:'Evento eliminado exitosamente', event: eventDelete})
    } catch (error) {
        res.status(500).json({message:'Error al eliminar el evento', error: error.message})
    }
}

// Verifica si el usuario autenticado es administrador o el dueño del evento
async function userPass(req, eventTemp) {
    const user = req.user

    if (!eventTemp) {
        eventTemp = await Event.findById(req.params.id).populate('organizer');
    }
    // No es administrador, verifica que sea su propio evento
    if (user.role !== 'admin' && !eventTemp.organizer._id.equals(user._id)) {
        return false;
    }
    return true;
}