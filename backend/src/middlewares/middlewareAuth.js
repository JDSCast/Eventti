const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticatedUser = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  //Validar si hay un token
  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ message: "Debe iniciar sesión para acceder a este recurso" });
  }

  try {
    //Si hay un accessToken lo valida
    validateAccessToken = await exports.verifyToken(res, accessToken, "accessToken");
    req.user = validateAccessToken
    next();
  } catch (error) {
    // Si el accessToken falla, intentar con el refreshToken
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Token inválido", error: error.message });
    } 

    //Si hay un token de refresco, intentar verificarlo y generar un nuevo token de acceso
    try {
      req.user = await exports.verifyToken(res, refreshToken, "refreshToken", );
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Sesión inválida", error: error.message });
    }
  }
};
//Función para restaurar a los nuevos tokens
exports.setNewTokens = async (res, user) => {
  res.cookie("refreshToken", user.getJwtToken("2d"), {
    maxAge: (2 * 24 * 3600 * 1000), //2dias
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("referenceSession", true, {
    maxAge: (2 * 24 * 3600 * 1000), //2dias
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("accessToken", user.getJwtToken("3h"), {
    maxAge: (3 * 3600 * 1000), //3horas
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });
  const currentDate = new Date();
  console.log(` ---> Sesión restaurada, user: ${user.name} ${user.lastname} date: ${currentDate}`);
};


// Función para verificar el token y obtener el usuario
exports.verifyToken = async (res, token, type) => {
  try {
    //Si hay un token lo valida
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    //Si hay un refresh token agrega nuevas cookies
    if (type === "refreshToken") {
      await exports.setNewTokens(res, user);
    }

    return user; //Para uso de los controladores
  } catch (error) {
    throw new Error(`Token ${type} inválido`);
  }
};

// Función para generar un nuevo token de acceso
exports.refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No hay token, por favor inicie sesión de nuevo." });
  }
  try {
    const user = await exports.verifyToken(res, refreshToken, "refreshToken");
    return res.status(200).json({ message: `Nuevo Token generado para ${user.name}` });
  } catch (error) {
    return res.status(401).json({ message: "Expiro la sesión", error: error.message });
  }
};