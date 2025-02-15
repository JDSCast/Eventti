import { createTheme } from "@mui/material/styles";
import { esES } from "@mui/material/locale";

export const customTheme = createTheme(
  {
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: "#1b595e",
          },
          secondary: {
            main: "#1ee594",
          },
          background: {
            default: "#f9f9f9",
          },
          warning: {
            main: "#edbf02",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: "#4be0ef",
          },
          secondary: {
            main: "#1ee594",
          },
          background: {
            default: "#101010",
          },
        },
      },
    },
  },
  esES
);
