import { Box, Fade, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import dayjs from "dayjs";
import {
  Delete as DeleteIcon,
  ModeEdit as EditIcon,
  PsychologyAlt,
} from "@mui/icons-material";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useMemo, useState } from "react";
import Colombia from "../assets/colombia1.json";

export default function ViewTable({
  data,
  actionEdit,
  actionDelete,
  actionDetails,
}) {
  const auth = useAuth();
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const wait = setTimeout(() => {
      setShowTable(true);
    }, 200);
    return () => clearTimeout(wait);
  }, []);

  //Nodo que se muestra en tabla si no hay datos
  function sinDatos() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          placeContent: "center",
          placeItems: "center",
          height: 1,
          width: 1,
        }}
      >
        <Typography>No hay eventos disponibles.</Typography>
        <PsychologyAlt sx={{ fontSize: 50 }} />
      </Box>
    );
  }

  //Contruccion de las columnas de la tabla y como debe de mostrarse los datos
  const columns = [
    { field: "name", headerName: "Nombre", flex: 1, minWidth: 150 },
    {
      field: "departmentId",
      headerName: "Departamento",
      width: 150,
      valueFormatter: (value) =>
        value
          ? Colombia.find((depart) => depart.departamentoId === value)
              .departamento
          : "",
    },
    {
      field: "cityId",
      headerName: "Ciudad",
      width: 150,
      valueFormatter: (value) =>
        value
          ? Colombia.find((ciudad) => ciudad.ciudadId === value).ciudad
          : "",
    },
    { field: "location", headerName: "Ubicación", width: 150 },
    {
      field: "dateStart",
      type: "date",
      headerName: "Fecha de inicio",
      width: 160,
      valueFormatter: (value) => dayjs(value).format("DD/MM/YYYY HH:mm A"),
    },
    {
      field: "dateEnd",
      type: "date",
      headerName: "Fecha de fin",
      width: 160,
      valueFormatter: (value) => dayjs(value).format("DD/MM/YYYY HH:mm A"),
    },
    {
      field: "organizer",
      headerName: "Organizador",
      width: 160,
      valueGetter: (value) => `${value.name || ""} ${value.lastname || ""}`,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Opciones",
      sortable: false,
      hideable: false,
      getActions: (params) => 
        {
          if (auth.token === "admin" || params.row.editable) {
            return optionsIcons(params);
          } else {
            return [];
          }
        } 
    },
  ];

  //Asigna que columnas deber ser visibles por tipo de usuario
  const columnVisibility = useMemo(() => {
    if (auth.token) {
      return {
        actions: true,
      };
    }
    return {
      actions: false,
    };
  }, [auth]);

  //Cada row requiere un id, esta asigna el id de cada row como el id del objeto
  function getRowId(row) {
    return row._id;
  }
  //Controla la cantidad de rows por page
  const paginationModel = { page: 0, pageSize: 10 };

  const optionsIcons = (params) => {
    return [
    <GridActionsCellItem
      key={params.id}
      icon={<EditIcon color="warning" />}
      label="Editar"
      onClick={() => actionEdit(params.id)}
    />,
    <GridActionsCellItem
      key={params.id}
      icon={<DeleteIcon color="error" />}
      label="Eliminar"
      onClick={() => actionDelete(params.row)}
    />
  ]}
  return (
    <Box
      sx={{
        minWidth: "90%",
        maxWidth: "95%",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Fade in={showTable}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={data}
          getRowId={getRowId}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
            sorting: {
              sortModel: [{ field: "dateStart", sort: "desc" }],
            },
          }}
          pageSizeOptions={[5, 10]}
          slots={{ toolbar: GridToolbar, noRowsOverlay: sinDatos }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
            },
          }}
          columnVisibilityModel={columnVisibility}
          onRowClick={(params) => {
            actionDetails(params.row);
          }}
          disableColumnSelector
          disableDensitySelector
        />
      </Fade>
    </Box>
    // </Zoom>
  );
}
