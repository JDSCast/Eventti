const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt= require("jsonwebtoken")

//Estructura de datos de Usuarios en la base de datos

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: { 
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Por favor ingrese un email valido']
    },
    password: {
        type: String,
        required: true,
        select: false // para ocultar el campo en consultas
    }
});

//Métodos para autenticar

//Encriptar contraseña antes de guardarla
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
});

//Comprobar la contraseña
UserSchema.methods.comparePass = async function(password) {
    return await bcrypt.compare(password, this.password)
};

//Crear JWT token
UserSchema.methods.getJwtToken = function(time) {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: time || '1h'
    })
};

module.exports = mongoose.model('User', UserSchema);