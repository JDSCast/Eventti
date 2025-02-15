import {
  Typography,
  IconButton,
  useColorScheme,
  Box,
  Paper,
} from "@mui/material";
import { DarkMode, WbSunny as WbSunnyIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Footer() {
  const [sizeScreen, setSizeScreen] = useState("subtitle2");

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 600) {
        setSizeScreen("subtitle1");
      } else {
        setSizeScreen("subtitle2");
      }
    });
  }, []);
  const { mode, setMode } = useColorScheme();

  return (
    <Paper
      square
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row-reverse" },
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#191a1b",
        color: "#ffffff54",
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          edge="start"
          aria-label="menu"
          sx={{
            mx: "auto",
            color: "white",
            "&:hover": {
              bgcolor: mode === "light" && "rgba(255, 255, 255, 0.03)",
            },
          }}
          onClick={() =>
            localStorage.getItem("mui-mode") === "light"
              ? setMode("dark")
              : setMode("light")
          }
        >
          {mode === "light" ? <WbSunnyIcon /> : <DarkMode />}
        </IconButton>
      </Box>
      <Typography variant={sizeScreen} align="center" sx={{alignContent: 'center'}}>
        JDCast - &copy; 2025 Project Event. Todos los derechos reservados.
      </Typography>
    </Paper>
  );
}
