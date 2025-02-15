const mongoose = require('mongoose');

//Estructura de datos de Eventos en la base de datos
const EventSchema = new mongoose.Schema({
    name: { //titulo del evento
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    departmentId: {
        type: Number,
        required: true
    },
    cityId:{
        type: Number,
        required: true
    },
    location: { //Direccion o lugar donde se realiza el evento
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateStart:{
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= this.dateStart;
            },
            message: 'La fecha de fin debe ser posterior a la fecha de inicio.'
                }
            }
});

module.exports =  mongoose.model('Event', EventSchema);