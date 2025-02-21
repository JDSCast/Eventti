import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Fade,
  Grid2 as Grid,
  Grow,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";
import {
  Delete as DeleteIcon,
  ModeEdit as EditIcon,
  Today as DateIcon,
  PsychologyAlt,
} from "@mui/icons-material";
import { useAuth } from "../hooks/AuthProvider";
import Colombia from "../assets/colombia1.json";

export default function ViewCards({
  data,
  actionEdit,
  actionDelete,
  actionDetails,
}) {
  const auth = useAuth();

// opciones de la card si esta autenticado
  const optionsCard = (event) => {
   return <CardActions
    sx={{
      justifyContent: "right",
      flexDirection: { sm: "row" },
      bgcolor: "background.default",
      borderBottom: " solid 5px",
      borderColor: "secondary.dark",
    }}
  >
    <Typography
      variant="overline"
      noWrap
      color="textDisabled"
      gutterBottom
    >
      OPCIONES{" "}
    </Typography>
    <Tooltip title="Editar" arrow>
      <IconButton
        color="warning"
        aria-label="Editar el evento"
        onClick={() => {
          actionEdit(event._id);
        } }
        sx={{
          border: "2px solid",
          borderColor: "warning.main",
          borderRadius: "10px",
        }}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Eliminar" arrow>
      <IconButton
        color="error"
        aria-label="Eliminar el evento"
        onClick={() => {
          actionDelete(event);
        } }
        sx={{
          border: "2px solid",
          borderColor: "error.main",
          borderRadius: "10px",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </CardActions>;}

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ justifyContent: "space-evenly", alignItems: "center" }}
    >
      {data.length > 0 ? (
        data.map((event, index) => (
          <Grow
            in={true}
            key={index}
            timeout={{ enter: 500, exit: 100 }}
            style={{ transitionDelay: `${index * 30}ms` }}
          >
            <Card sx={{ width: "clamp(5rem,90%,345px)" }} key={event._id}>
              <Tooltip title="Ver más..." placement="top" arrow>
                <CardActionArea
                  onClick={() => {
                    actionDetails(event);
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    // Imagen aleatoria
                    image={`https://picsum.photos/600/600?random=${index}`}
                    alt="Foto del evento"
                    sx={{ bgcolor: "secondary.dark" }}
                  />
                  <CardContent sx={{ minHeight: "194px" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {event.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {event.description}
                    </Typography>
                    <Typography></Typography>
                    <Divider sx={{ my: 1 }}></Divider>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignContent: "center",
                        justifyContent: "center",
                        placeItems: "center",
                      }}
                    >
                      <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{
                          width: { xs: "100%", sm: "8rem" },
                          color: "text.secondary",
                          textAlign: "center",
                        }}
                      >
                        {
                          Colombia.find(
                            (ciudad) => ciudad.ciudadId === event.cityId
                          ).ciudad
                        }
                      </Typography>
                      <Chip
                        color="info"
                        icon={<DateIcon />}
                        label={`${dayjs(event.dateStart).format(
                          "ddd DD MMM"
                        )} | ${dayjs(event.dateStart).format("hh:mm A")}`}
                        sx={{ width: "fit-content" }}
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Tooltip>
              {/* Si el evento es editable por el administrador o el mismo usuario que lo creó, muestra las opciones */}
              {(auth.token === "admin" || event.editable)
                ? optionsCard(event)
                : ""
              }
            </Card>
          </Grow>
        ))
      ) : (
        <Fade in={true}>
          <Card
            sx={{
              width: "80%",
              height: "60%",
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h3">No hay eventos disponibles.</Typography>
            <PsychologyAlt sx={{ fontSize: 100 }} />
          </Card>
        </Fade>
      )}
    </Grid>
  );
}
