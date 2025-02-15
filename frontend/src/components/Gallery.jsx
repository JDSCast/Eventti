import { Box, Button, Fade, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Clock from "./Clock";

const images = [
  {
    img: "/crowd.jpg",
    title: "Multitud de un concierto de DJ",
  },
  {
    img: "/music.jpg",
    title: "Evento de música acústica",
  },
  {
    img: "/marathon.jpg",
    title: "Personas corriendo una maratón",
  },
  {
    img: "/students.jpg",
    title: "Estudiantes en una clase de arte",
  },
  {
    img: "/carnival.jpg",
    title: "Desfile de carnaval local",
  },
  {
    img: "/couple.jpg",
    title: "Pareja de bodas",
  },
];

export default function Gallery() {
  const [showImg, setShowImg] = useState(true);
  const [img, setImg] = useState(
    images[Math.floor(Math.random() * images.length)]
  );

  // funcion para cambiar la imagen
  const cambiarImagen = () => {
    let newImg;
    do {
      newImg = images[Math.floor(Math.random() * images.length)];
    } while (newImg.img === img.img); // sigue mientras la imagen no sea la misma que la anterior

    setImg(newImg);
    setShowImg(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImg(false);
      setTimeout(() => {
        cambiarImagen();
      }, 500); // tiempo de espera para el fadeout
    }, 10000); // cambia la imagen cada x segundos

    // Limpieza del intervalo
    return () => clearInterval(interval);
  }, [img]);

  return (
    <>
      <Box
        position="absolute"
        key={"btnHome"}
        sx={{
          zIndex: 1,
        }}
      >
        <Typography variant="h1" sx={{
          fontFamily: "Righteous",
          textAlign: "center",
          fontSize: "clamp(5rem, 25vw , 12rem)",
          bgcolor: "background.paper",
          px: 2,
          borderRadius: "10px"
           }}>
          Eventti
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: {xs: "column", sm: "row"},
            gap: 2,
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Link to="/events/create">
            <Button variant="contained" color="primary">
              Publicar evento
            </Button>
          </Link>
          <Link to="/events">
            <Button variant="contained" color="secondary">
              Ver Eventos
            </Button>
          </Link>
        </Box>
        {/* <Clock /> */}
      </Box>
      <Fade in={showImg} timeout={500} mountOnEnter>
        <Box
          alt={img ? img.title : ""}
          sx={{
            placeContent: "center",
            placeItems: "center",
            width: "inherit",
            height: "90vh",
            backgroundImage: `url(${img.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            bgcolor: "primary.main",
            filter: "blur(1px)",
            zIndex: 0,
          }}
        ></Box>
      </Fade>
    </>
  );
}
