import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import {
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";
import EventForm from "../components/EventForm";
import LoadingScreen from "../components/LoadingScreen";
import Colombia from "../assets/colombia1.json";

export default function EventActions({ action }) {
  const [loading, setLoading] = useState(true);

  //objeto para controlar los campos
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    departmentId: 0,
    department: null,
    cityId: 0,
    city: null,
    location: "",
    dateStart: null,
    hourStart: null,
    dateEnd: null,
    hourEnd: null,
  });

  const [dataError, setDataError] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  //Utils
  const navigate = useNavigate();
  const { eventId } = useParams();
  dayjs.locale("es");

  //Gestiona los cambios en los estados arreglos cada que un campo cambia se agrega
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleErrors = (field, value) => {
    setDataError((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  //Funcion para crear el evento
  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const isFormDataValid = Object.values(formData).every((value) => value);

    try {
      if (!isFormDataValid) {

        handleErrors("severity", "warning");
        handleErrors("message", "Todos los campos son obligatorios");
        return;
      }
      if (!formData.hourStart || !formData.hourEnd) {

        handleErrors("severity", "warning");
        handleErrors("message", "Debes seleccionar una hora de inicio y fin");
        return;
      }
      if (formData.dateStart >= formData.dateEnd) {

        handleErrors("severity", "info");
        handleErrors(
          "message",
          "La fecha de fin debe ser posterior a la fecha de inicio"
        );
        return;
      }

      const response = await apiClient.post("/events", formData);

      if(response.status !== 201) {
        throw new Error(response.data.message)
      }

      navigate("/events");
    } catch (err) {
      handleErrors("severity", "error");
      handleErrors("message", err.message);
    }
  };

  //Funcion para editar el evento
  const handleEditEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.put(`/events/${eventId}`, formData);
      if(response.status !== 200) {
        throw new Error(response.data.message)
      }
      navigate("/events");
    } catch (err) {
      return handleErrors("message", err.message);
    }
  };
  //Funcion para traer el evento
  const fetchEvent = async () => {
    try {
      const response = await apiClient.get(`/events/${eventId}`);
      const event = response.data.event;
      setFormData({
        name: event.name,
        description: event.description,
        departmentId: event.departmentId,
        department: Colombia.find(depart => (depart.departamentoId === event.departmentId)),
        cityId: event.cityId,
        city: Colombia.find(ciudad => ciudad.ciudadId === event.cityId),
        location: event.location,
        dateStart: dayjs(event.dateStart),
        hourStart: dayjs(event.dateStart),
        dateEnd: dayjs(event.dateEnd),
        hourEnd: dayjs(event.dateEnd),
      });
      setLoading(false);
    } catch (err) {
      return handleErrors("message", err.message);
    }
  };
  //Obtener el evento al cargar la pagina si esta en modo edit
  useEffect(() => {
    if (eventId && action === "edit") {
      fetchEvent();
    } else if (action === "create") {
      return;
    } else {
      navigate("/home")
    }
  }, [eventId]);

  //Muestra la alerta si hay algun error
  useEffect(() => {
    if (dataError.message != "") {
      handleErrors("open", true);
    }
  }, [dataError.message]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      bgcolor="background.default"
      py={3}
    >
      {action === "edit" ? <LoadingScreen action={loading} /> : ""}
      <EventForm
        formData={formData}
        action={action}
        handleChange={handleChange}
        handleCreateEvent={
          action === "edit" ? handleEditEvent : handleCreateEvent
        }
        dataError={dataError}
        handleErrors={handleErrors}
      />
    </Box>
  );
}
