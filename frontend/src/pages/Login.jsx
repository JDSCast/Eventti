import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  CardActions,
  Box,
  Typography,
  Divider,
  Alert,
  Collapse,
  Fade,
} from "@mui/material";
import { useAuth } from "../hooks/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!email && !password) {
      throw new Error("Por favor, completa todos los campos.")
    }
    const infoLogin = {
      email,
      password,
    };
    await auth.loginAction(infoLogin);
    
    } catch (err) {

      if (err.message) {
        setError(
          err.message
        );
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      bgcolor="background.default"
      py={3}
    >
      <Fade in={true}>
      <Card
        variant="outlined"
        sx={{
          placeSelf: "center",
          margin: "auto",
          width: { xs: "98%", sm: "100%" },
          maxWidth: "30rem"
        }}
      >
        <Box
          sx={{ height: "0.5rem", bgcolor: "primary.main" }}
        ></Box>
        <CardHeader
          title={
            <Typography
              variant="h3"
              my={2}
              mx={"auto"}
              sx={{ width: { xs: "clamp(5rem,70vw, 100%)", sm: "100%" } }}
            >
              Inicio de sesión
            </Typography>
          }
          subheader={
            <Divider>
              <Typography
                sx={{
                  textWrap: { xs: "wrap", sm: "nowrap" },
                  width: { xs: "clamp(5rem,70vw, 15rem)", sm: "100%" },
                }}
              >
                Bienvenido a la aplicación <strong>Eventti</strong>
              </Typography>
            </Divider>
          }
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              textAlign: "center",
              px: { xs: "0.5rem", sm: "3rem" },
            }}
          >
            <TextField
              required
              label="Correo electrónico"
              placeholder="miCorreo@Ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Collapse in={open}>
              <Alert
                onClick={() => {
                  setOpen(false);
                }}
                severity="error"
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            </Collapse>
            <Button type="submit" variant="contained" color="primary">
              Iniciar Sesión
            </Button>
          </Box>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography>¿Aún no tienes una cuenta? </Typography>
          <Link to="/signup">
            <Button variant="text" color="primary">
              Regístrate
            </Button>
          </Link>
        </CardActions>
      </Card>
      </Fade>
    </Box>
    
  );
}
