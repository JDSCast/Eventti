const mongoose = require('mongoose');

//conexión a la base de datos con Mongo Atlas
exports.connectBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(con =>{
            console.log(`Base de datos conectada a MongoDB Atlas con el servidor: ${con.connection.host}`);})
        
    } catch (error) {
        console.log('Error en la conexión a MongoDB Atlas: ',error);
        process.exit();
    }
}

