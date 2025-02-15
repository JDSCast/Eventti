import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Colombia1 from "../assets/colombia1.json";
import Colombia2 from "../assets/colombia2.json";
import {
  Autocomplete,
  TextField,
} from "@mui/material";
export default function BtnFilters({
  dataEvents,
  setEventsFiltered,
  filterOn,
}) {
  const [value, setValue] = useState(null);
  const [word, setWord] = useState("");
  const [department, setDepartment] = useState(null);
  const [city, setCity] = useState(null);

  // Filtros se hacen sobre una copia de dataEvents para poder aplicar varios al mismo tiempo 
  const handleFilters = () => {
    let newEvents = dataEvents;

    if (value) {
      newEvents = newEvents.filter((event) =>
        dayjs(event.dateStart).isSameOrAfter(value, "day")
      );
    }
    if (word !== "") {
      newEvents = newEvents.filter(
        (event) =>
          event.name.toLowerCase().includes(word.toLowerCase()) ||
          event.description.toLowerCase().includes(word.toLowerCase())
      );
    }
    if (department) {
      newEvents = newEvents.filter((event) =>
        event.departmentId === department.departamentoId
      );
     
    }
    if (city) {
      newEvents = newEvents.filter((event) =>
        event.cityId === city.ciudadId
      );
    }

    if (!value && (word === "" ) && !department && !city) {
      newEvents = dataEvents;

    }

    setEventsFiltered(newEvents);
  };
  
  //Mantiene los filtro despues de eliminar un evento
  useEffect(() => {
    if (dataEvents.length > 0 ) {
      handleFilters();
    }
  }, [dataEvents]);

  useEffect(() => {
    if (value || word || department || city) {
      handleFilters();
    } else{
      //Asegura que vuelva a l original si todos son false
      setEventsFiltered(dataEvents);

    }
  }, [value, word, department, city]);
  
  // elimina los filtros al cerrar los inputs
  useEffect(() => {
    setValue(null);
    setWord("");
    setDepartment(null);
    setCity(null);
    setEventsFiltered(dataEvents);
  }, [filterOn]);

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Filtro por palabra"
        variant="outlined"
        value={word}
        onChange={(newValue) => setWord(newValue.target.value)}
        sx={{ width: "clamp(5rem, 100%, 250px)" }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DatePicker
          label="Filtro por fecha"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          sx={{ width: "clamp(5rem, 100%, 250px)" }}
        />
      </LocalizationProvider>

      <Autocomplete
        disablePortal
        autoComplete
        value={department}
        getOptionKey={(value) => value.departamentoId}
        onChange={(event, newValue) => {
          setDepartment(newValue);
        }}
        options={Colombia2.departamentos}
        getOptionLabel={(value) => value.departamento}
        clearOnEscape
        sx={{ width: "clamp(5rem, 100%, 250px)" }}
        renderInput={(params) => (
          <TextField {...params} label="Filtrar por departamento"/>
        )}
      />

      <Autocomplete
        disablePortal
        autoComplete
        value={city}
        getOptionKey={(value) => value.ciudadId}
        groupBy={(value) => value.departamento}
        onChange={(event, newValue) => {
          setCity(newValue);
        }}
        options={Colombia1}
        getOptionLabel={(value) => value.ciudad}
        clearOnEscape
        sx={{ width: "clamp(5rem, 100%, 250px)" }}
        renderInput={(params) => (
          <TextField {...params} label="Filtrar por ciudad" />
        )}
      />
    </>
  );
}
