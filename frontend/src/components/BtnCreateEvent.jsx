import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Tooltip } from "@mui/material";
export default function BtnCreateEvent(props) {
  return (
    <Box
      sx={{
        position: "fixed",
        right: {xs:"5%", lg:"10%"},
        bottom: {xs:"5%", lg:"10%"},
        zIndex: "1050",
        "& > :not(style)": {
          m: 1,
          bgcolor: "secondary.dark",
        },
      }}
    >
      <Tooltip title="Nuevo" placement="left" arrow>
      <Fab
        color="primary"
        onClick={props.action}
        aria-label="Boton crear un evento"
      >
        <AddIcon />
      </Fab>
      </Tooltip>
    </Box>
  );
}
