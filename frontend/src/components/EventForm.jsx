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
  FormControl,
  CardMedia,
  InputLabel,
  Autocomplete,
  Fade,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ModeEdit, Send } from "@mui/icons-material";
import Colombia from "../assets/colombia1.json";
import ColombiaDepart from "../assets/colombia2.json";

export default function EventForm({
  formData,
  action,
  handleChange,
  handleCreateEvent,
  dataError,
  handleErrors,
}) {

  const [disabledStart, setDisabledStart] = useState(false);
  const [disabledEnd, setDisabledEnd] = useState(false);

  //Utils
  dayjs.locale("es");

  //Modo de accion
  let title = "";
  let info = "";
  let theme = "";
  let btnTheme = "";
  switch (action) {
    case "create":
      title = "Nuevo un evento";
      info = "Completa el formulario para publicar tu evento";
      theme = "secondary.main";
      btnTheme = "primary";
      break;
    case "edit":
      title = "Actualizar evento";
      info = "Completa el formulario para actualizar tu evento";
      theme = "warning.light";
      btnTheme = "warning";
      break;
    default:
      title = "Error";
      info = "Algo salio mal...";
      break;
  }

  // Mantiene disable los inputs que dependen de otros
  useEffect(() => {
    if (formData.dateStart) {
      setDisabledStart(true);
    }
    if (formData.dateEnd) {
      setDisabledEnd(true);
    }
  }, [
    formData.dateStart,
    formData.dateEnd,
    formData.hourStart,
    formData.hourEnd,
  ]);

  // Agrega el departamento y el id al formData
  const addDepartment = (value) => {
    handleChange("department", value);
    value
      ? handleChange("departmentId", value.departamentoId)
      : handleChange("city", value);
  };

  // Agrega la ciudad y el id al formData dependiendo del departamento
  const addCityDepartament = (value) => {
    if (formData.department) {
      if (!value) {
        handleChange("city", value);
        handleChange("cityId", 0);
        return;
      }
      if (formData.department.departamentoId === value.departamentoId) {
        handleChange("city", value);
        handleChange("cityId", value.ciudadId);
        return;
      }
      handleErrors("severity", "warning");
      handleErrors(
        "message",
        "La ciudad no coincide con el departamento seleccionado"
      );
      return;
    } else {
      handleErrors("message", "Debes seleccionar un departamento");
      return;
    }
  };

  // Agrega las horas a las fecha
  const addTime = (time, mode) => {
    if (!time) {
      handleErrors("message", "Debes seleccionar una hora");
      return;
    }
    let newDateTime = null;
    try {

      switch (mode) {
        case "start":
          handleChange("hourStart", time);
          newDateTime = dayjs(formData.dateStart)
            .set("hour", time.hour())
            .set("minute", time.minute());

          if (formData.dateStart) {
            handleChange("dateStart", newDateTime);
            return newDateTime;
          } else {
            return handleErrors(
              "message",
              "Debes seleccionar una fecha y una hora de inicio"
            );
          }

        case "end":
          handleChange("hourEnd", time);
          newDateTime = dayjs(formData.dateEnd)
            .set("hour", time.hour())
            .set("minute", time.minute());
          if (formData.dateEnd) {
            handleChange("dateEnd", newDateTime);
            return newDateTime;
          } else {
            return handleErrors(
              "message",
              "Debes seleccionar una fecha y una hora final"
            );
          }

        default:
          return handleErrors(
            "message",
            "Debes selecciona una fecha y hora de inicio/Fin"
          );
      }
    } catch (error) {
      handleErrors("message", error.message);
    }
  };

  return (
    <Fade in={true}>
    <Card
      sx={{
        placeSelf: "center",
        margin: "auto",
        width: { xs: "98%", sm: "80%" },
        maxWidth: "50rem",
      }}
    >
      <CardMedia
        component="img"
        image="./event-edit-svgrepo-com.svg"
        alt="Signup icon"
        sx={{
          objectFit: "contain",
          mx: "auto",
          p: 1,
          bgcolor: `${theme}`,
          height: "clamp(50px, 80vw, 90px)",
        }}
      />
      <CardHeader
        title={
          <Typography
            variant="h4"
            my={2}
            mx={"auto"}
            sx={{ width: { xs: "clamp(5rem,70vw, 15rem)", sm: "inherit" } }}
          >
            {title}
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
              {info}
            </Typography>
          </Divider>
        }
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <Box
          component="form"
          onSubmit={handleCreateEvent}
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
              label="Nombre del evento"
              placeholder="Mi primer evento..."
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              label="Descripcion"
              placeholder="Cuanto vacio..."
              multiline={true}
              minRows={3}
              maxRows={6}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </FormControl>
          <Box
            id="containerCityDepartament"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              gap: 2,
              placeContent: "center",
              placeItems: "center",
            }}
          >
            <Autocomplete
              disablePortal
              required
              autoComplete
              value={formData.department}
              getOptionKey={(value) => value.departamentoId}
              onChange={(e, newValue) => {
                addDepartment(newValue);
              }}
              options={ColombiaDepart.departamentos}
              getOptionLabel={(value) => value.departamento}
              clearOnEscape
              sx={{ width: "clamp(5rem, 100%, 90%)" }}
              renderInput={(params) => (
                <TextField {...params} label="Departamento *" />
              )}
            />
            <Autocomplete
              disablePortal
              required
              autoComplete
              value={formData.city}
              getOptionKey={(value) => value.ciudadId}
              groupBy={(value) => value.departamento}
              onChange={(e, newValue) => {
                addCityDepartament(newValue);
              }}
              options={Colombia}
              getOptionLabel={(value) => value.ciudad}
              clearOnEscape
              sx={{ width: "clamp(5rem, 100%, 90%)" }}
              renderInput={(params) => (
                <TextField {...params} label="Ciudad *" />
              )}
            />
          </Box>
          <FormControl>
            <TextField
              required
              label="Ubicación"
              placeholder="Mi ciudad favorita..."
              helperText="Dirección o lugar donde se realizará el evento."
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </FormControl>
          <Box
            id="containerDates"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              marginTop: "1rem",
            }}
          >
            <FormControl sx={{ mb: { xs: "1rem", sm: 0 } }}>
              <InputLabel shrink htmlFor="date-start">
                Fecha y hora de inicio
              </InputLabel>
              <Box
                id="date-start"
                sx={{ mt: 2, mx: "auto", width: { xs: "100%", sm: "90%" } }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    value={formData.dateStart}
                    label="Fecha inicio"
                    onChange={(newValue) => handleChange("dateStart", newValue)}
                    sx={{ mb: 2 }}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <TimePicker
                    disabled={!disabledStart}
                    label="Hora inicio"
                    value={formData.hourStart}
                    onChange={(newValue) => addTime(newValue, "start")}
                  />
                </LocalizationProvider>
              </Box>
            </FormControl>
            {window.innerWidth >= 600 ? (
              <Divider orientation="vertical" flexItem />
            ) : (
              <Divider orientation="horizontal" flexItem />
            )}
            <FormControl sx={{ mt: { xs: "1rem", sm: 0 } }}>
              <InputLabel shrink htmlFor="date-end">
                Fecha y hora de finalización
              </InputLabel>
              <Box id="date-end" sx={{ mt: 2, mx: "auto", width: "90%" }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    value={formData.dateEnd}
                    label="Fecha final"
                    onChange={(newValue) => handleChange("dateEnd", newValue)}
                    sx={{ mb: 2 }}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <TimePicker
                    disabled={!disabledEnd}
                    label="Hora final"
                    value={formData.hourEnd}
                    onChange={(newValue) => addTime(newValue, "end")}
                  />
                </LocalizationProvider>
              </Box>
            </FormControl>
          </Box>
          <Collapse in={dataError.open}>
            <Alert
              onClick={() => {
                handleErrors("open", false);
                handleErrors("message", "");
              }}
              severity={dataError.severity}
              sx={{ mb: 2 }}
            >
              {dataError.message}
            </Alert>
          </Collapse>
          <Button
            type="submit"
            variant="contained"
            color={btnTheme}
            sx={{ maxWidth: "20rem", mx: "auto" }}
            endIcon={action === "edit" ? <ModeEdit /> : <Send />}
            disableElevation
          >
            {action === "edit" ? "Editar evento" : "Crear evento"}
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
        <Link to="/events" style={{ margin: 0 }}>
          <Button
            variant="outlined"
            color="error"
            sx={{ maxWidth: "20rem", mb: "1rem" }}
          >
            Cancelar
          </Button>
        </Link>
      </CardActions>
    </Card>
    </Fade>
  );
}
