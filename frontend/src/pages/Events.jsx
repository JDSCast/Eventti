import { Box, Collapse, ToggleButton } from "@mui/material";

import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";

import { useAuth } from "../hooks/AuthProvider";
import BtnGroupView from "../components/BtnGroupView";

import ViewCards from "../components/ViewCards";
import DialogDelete from "../components/DialogDelete";
import DialogEvent from "../components/DialogEvent";
import ViewTable from "../components/ViewTable";
import BtnCreateEvent from "../components/BtnCreateEvent";
import BtnFilters from "../components/BtnFilters";
import { FilterAlt } from "@mui/icons-material";

export default function Events() {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [eventsFiltered, setEventsFiltered] = useState([]);

  const [error, setError] = useState("");
  //Estados para dialog
  const [openDelete, setOpenDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventSelected, setEventSelected] = useState([]);
  //Estados para view
  const [viewType, setViewType] = useState("cards");

  const navigate = useNavigate();

  //Traer los eventos
  const fetchEvents = async () => {
    try {
      const response = await apiClient.get("events/");
      setEvents(response.data.events);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (eventsFiltered.length == 0) {
      setEventsFiltered(events);
    }
  }, [events]);

  //Funcion para setear el mensaje de la alerta
  const errorCatcher = (catched) => {
    if (catched.response) {
      setError(catched.response.data.message);
    } else {
      setError("Error al conectar con el servidor");
    }
  };

  //Funciones de las acciones
  const handleCreate = () => {
    navigate(`/events/create`);
  };
  const handleShowMore = (eventToShow) => {
    setEventSelected(eventToShow);
    setOpenDialog(true);
  };

  const handleEdit = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await apiClient.delete(`events/${eventId}`);
      // TODO: Implementar alerta de errores para events
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      setEvents((events) => events.filter((eve) => eve._id !== eventId));
    } catch (error) {
      setError(error.message);
    }
  };
  // Funciones de control de dialogo
  function confirmDelete(params) {

    setEventSelected(params);
    setOpenDelete(true);
    return;
  }

  function closeDialogDelete() {
    setOpenDelete(false);
  }
  function closeDialogEvent() {
    setOpenDialog(false);
  }
  // Control de views
  const handleChangeView = (view) => {
    setViewType(view);
    if (view === "table") {
      setFilterOn(false);
    }
  };

  return (
    //Container principal
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      bgcolor="background.default"
      py={3}
    >
      {/* Componente overlay no controlado */}
      <LoadingScreen action={loading} />
      {/* Componente dialog controlado */}
      <DialogDelete
        open={openDelete}
        deleteId={eventSelected._id}
        eventName={eventSelected.name}
        handleDialogClose={closeDialogDelete}
        handleDialogDelete={handleDelete}
      />
      <DialogEvent
        event={eventSelected}
        open={openDialog}
        handleCloseEvent={closeDialogEvent}
      />
      {auth.token ? <BtnCreateEvent action={handleCreate} /> : ""}

      <Box
        sx={{
          width: "clamp(90%, 100%, 95%)",
          mb: "2rem",
          display: "flex",
          justifyContent: `${viewType == "cards" ? "space-between" : "right"}`,
        }}
      >
        {viewType == "cards" ? (
          <ToggleButton
            value="filtro"
            color="info"
            selected={filterOn}
            onChange={() => setFilterOn((prevSelected) => !prevSelected)}
          >
            <FilterAlt />
          </ToggleButton>
        ) : (
          ""
        )}
        {/* Componente para cambiar vista */}
        <BtnGroupView action={handleChangeView} value={viewType} />
      </Box>
      <Collapse in={filterOn} sx={{ width: "clamp(90%, 100%, 95%)" }}>
        <Box
          sx={{
            mb: "2rem",
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            placeItems: "center",
            placeContent: "center"
          }}
        >
          <BtnFilters
            dataEvents={events}
            setEventsFiltered={setEventsFiltered}
            filterOn={filterOn}
          />
        </Box>
      </Collapse>
      {/* Vistas segun el estado viewType */}
      {viewType === "cards" ? (
        <ViewCards
          data={eventsFiltered}
          actionEdit={handleEdit}
          actionDelete={confirmDelete}
          actionDetails={handleShowMore}
        />
      ) : (
        <ViewTable
          data={events}
          actionEdit={handleEdit}
          actionDelete={confirmDelete}
          actionDetails={handleShowMore}
        />
      )}
    </Box>
  );
}
