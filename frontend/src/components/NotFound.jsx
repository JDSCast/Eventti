import { PsychologyAlt } from "@mui/icons-material";
import { Box, Card, Fade, Paper, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Paper
      sx={{
        display: "flex",
        placeContent: "center",
        placeItems: "center",
        width: "inherit",
        height: "90vh",
        bgcolor: "primary.dark",
      }}
    >
      <Fade in={true}>
        <Card
          sx={{
            width: "80%",
            height: "60%",
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          elevation={5}
        >
          <Typography variant="h3" sx={{my: 2 }}>Página no encontrada.</Typography>
          <PsychologyAlt sx={{ fontSize: "clamp(10rem, 100%, 20rem)" }} />
        </Card>
      </Fade>
    </Paper>
  );
}
