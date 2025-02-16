import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axiosConfig";
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
  FormControl,
  CardMedia,
  Fade,
} from "@mui/material";

export default function Signup() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSingup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiClient.post("/users/signup", {
        name,
        lastname,
        email,
        password,
      });
      if(response.status !== 201) {
        throw new Error(response.data.message)
      }
      navigate("/login");
    } catch (err) {

      if (err) {
        setError(
          err.message || "Error extraño al iniciar sesión"
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
            maxWidth: "40rem",
          }}
        >
          <CardMedia
            component="img"
            image="./ticket-svgrepo-com.svg"
            alt="Signup icon"
            sx={{
              objectFit: "contain",
              mx: "auto",
              p: 1,
              bgcolor: "secondary.main",
              height: "clamp(50px, 80vw, 90px)",
            }}
          />
          <CardHeader
            title={
              <Typography
                variant="h3"
                my={2}
                mx={"auto"}
                sx={{ width: { xs: "clamp(5rem,70vw, 100%)", sm: "100%" } }}
              >
                Crear una cuenta
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
              onSubmit={handleSingup}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
                textAlign: "center",
                px: { sm: "0.5rem", md: "3rem" },
              }}
            >
              <FormControl>
                <TextField
                  required
                  label="Nombre/s"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  label="Apellido/s"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  type="email"
                  label="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  type="password"
                  label="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ maxWidth: "20rem", mx: "auto" }}
              >
                Crear cuenta
              </Button>
            </Box>
          </CardContent>

          <CardActions
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <Typography>¿Ya tienes una cuenta? </Typography>
            <Link to="/login">
              <Button variant="text" color="primary">
                Inicia sesión
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Fade>
    </Box>
  );
}
