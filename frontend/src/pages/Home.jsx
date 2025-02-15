import { Paper } from "@mui/material";
import Gallery from "../components/Gallery";

export default function Home() {
  
  return (
    <Paper
    elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        placeContent: "center",
        placeItems: "center",
        height: 1,
        width: 1,
        minHeight: "90vh",
        borderRadius: 0
      }}
    >
    <Gallery/>
    </Paper>
  );
}
