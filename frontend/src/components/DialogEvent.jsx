import dayjs from "dayjs";
import { Close as CloseIcon, Place as PlaceIcon } from "@mui/icons-material";
import {
  Box,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Colombia from "../assets/colombia1.json";
import { Today as DateIcon } from "@mui/icons-material";

export default function DialogEvent({ event, open, handleCloseEvent }) {
  dayjs.locale("es");
  return (
    <Dialog onClose={handleCloseEvent} open={open} scroll="body">
      <DialogTitle component="div" sx={{ m: 0, p: 2 }}>
        <Typography variant="h5" sx={{ maxWidth: "92%" }}>
          {event.name}
        </Typography>
          {event.cityId?
          (<Typography color="textSecondary" variant="subtitle1" sx={{mb:{xs:2 , sm:0} }}>
          {Colombia.find(ciudad => ciudad.ciudadId === event.cityId).ciudad}, {Colombia.find(depart => depart.departamentoId === event.departmentId).departamento}
          </Typography>) : ("")}

      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseEvent}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "primary.dark",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ m: 0, p: 0 }}>
        <CardMedia
          component="img"
          height="300px"
          image={`https://picsum.photos/1000/1000?random=${Math.random()}`}
          alt="imagen del evento"
          sx={{ placeSelf: "center" }}
        />
        <Box
          sx={{
            display: "flex",
            m: 1,
            justifyContent: "space-evenly",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 1,
          }}
        >
          <Chip
            color="secondary"
            icon={<DateIcon />}
            label={`Inicio: ${dayjs(event.dateStart).format(
              "ddd DD MMM"
            )} | ${dayjs(event.dateStart).format("hh:mm A")}`}
            sx={{ width: "fit-content" }}
          />
          <Chip
            color="primary"
            icon={<DateIcon />}
            label={`Final: ${dayjs(event.dateEnd).format(
              "ddd DD MMM"
            )} | ${dayjs(event.dateEnd).format("hh:mm A")}`}
            sx={{ width: "fit-content" }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            color: "text.secondary",
            px: 2,
            width: "clamp(100%, 80%, 600px)",
          }}
        >
          {event.description}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          m: 2,
          p: 0,
          flexDirection: { xs: "column", sm: "row" },
          minHeight: "40px",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ display: "flex", gap: {xs:0, sm:1} }}>
          <PlaceIcon />
          <Typography variant="button" sx={{mb:{xs:2 , sm:0} }}>
          {event.location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between", alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: "primary.dark" }}
            alt={`${event.organizer?.name} ${event.organizer?.lastname}`}
            src=""
          />
          <Typography>
            {event.organizer?.name} {event.organizer?.lastname}
          </Typography>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
