const { setNewTokens } = require('../middlewares/middlewareAuth');
const User = require ('../models/user');

//Registar un usuario
exports.registerUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({message:'Usuario creado exitosamente'});
    } catch (error) {
        res.status(500).json({message:'Error al crear el usuario', error: error.message})
    };
};

//Inicio de sesion usuario
exports.logInUser = async (req, res) => {
    const { email, password } =  req.body;
    try {
    //Validar campos completos
    if (!email || !password){
        return res.status(400).json({message: "Por favor ingrese su Email y Contraseña"})
    };

    //Validar si el usuario existe
    const user = await User.findOne({email}).select("+password")
    if (!user) {
        return res.status(404).json({ message: 'Email o contraseña invalidos' });
    };

    //Comprobar la contraseña
    const checkPass = await user.comparePass(password);
    if (!checkPass) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    //Asignar una cookies una con httpOnly por seguridad
    setNewTokens(res, user);
    return res.status(200).json({ message: 'Inicio de sesión exitoso', referenceSession: true, name: user.name , lastname: user.lastname, email: user.email});

    } catch (error) {
        return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

//Cerrar sesion
exports.logOut = async(req, res) => {
    res.cookie("refreshToken",null, {
        expires: new Date(Date.now()),
        httpOnly:true})
    res.cookie("accessToken",null, {
        expires: new Date(Date.now()),
        httpOnly:false})

    res.status(200).json({
        message: "Cerró sesión"
    })
}

//Traer perfil del usuario
exports.getUserProfile = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);

        //Verifica el usuario
        if (user != null) {
           res.status(200).json({message: 'El usuario se obtuvo exitosamente', user: user});
        } else {
            res.status(404).json({message:`No se ha encontrado ningun usuario con el id: ${userId}`});
        }

    } catch (error) {
        res.status(500).json({message:'Error al obtener el perfil del usuario', error: error.message})
    }
}


//Traer un usuario - dev only
exports.getUserById = async (req, res) => {
    try {
        const userOne = await User.findById(req.params.id);

        //Verifica el usuario
        if (userOne != null) {
           res.status(200).json({message: 'El usuario se obtuvo exitosamente', user: userOne});
        } else {
            res.status(404).json({message:`No se ha encontrado ningun usuario con el id: ${req.params.id}`});
        }

    } catch (error) {
        res.status(500).json({message:'Error al obtener el perfil del usuario', error: error.message})
    }
}


//Traer todos los usuarios - dev only
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({message: 'Usuarios obtenidos exitosamente', count : users.length, users})
    } catch (error) {
        res.status(500).json({message:'Error al obtener los usuarios', error: error.message})
    };
};

//Actualizar el usuario
exports.updateUser = async (req, res) =>{
    try {
        const userUpdate = await User.findByIdAndUpdate( req.params.id, req.body, {new: true});

        //Verificar el usuario
        if(userUpdate != null){
            res.status(200).json({message:'Usuario actualizado correctamente', user: userUpdate})
        } else {
            res.status(404).json({message:`Usuario con id: ${req.params.id} no se encuentra en la base de datos`})
        };

    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el usuario', error: error.message})
    };
};

//Eliminar el usuario
exports.deleteUser = async (req, res) => {
    try {
        const userDelete = await User.findById( req.params.id);

        //Verificar el usuario
        if(userDelete != null){
            await userDelete.deleteOne();
            res.status(200).json({message:'Usuario eliminado correctamente', user: userDelete})
        } else {
            res.status(404).json({message:`Usuario con id: ${req.params.id} no se encuentra en la base de datos`})
        };
        
    } catch (error) {
        res.status(500).json({message:'Error al eliminar el usuario', error: error.message})
    };
};

//Respuesta para verificar el usuario
exports.checkTokens = async (req, res) => {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    const user = req.user
  try {
    //Validar si estan los nuevos tokens
    if (!accessToken && !refreshToken) {
      return res
        .status(401)
        .json({ referenceSession: false, message: "Debe iniciar sesión para acceder a este recurso" });
    }
    
    return res.status(200).json({ message: 'Token restaurados', referenceSession: true, name: user.name , lastname: user.lastname, email: user.email});
    
    } catch (error) {
        res.status(401).json({message: 'Token inválidos'})
    }
}