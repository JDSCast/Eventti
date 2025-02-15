import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { ThemeProvider, Stack, Container } from "@mui/material";
import { customTheme } from "./styles/customTheme";
import Footer from "./components/Footer";
import EventActions from "./pages/EventActions";
import Events from "./pages/Events";
import AuthProvider from "./hooks/AuthProvider";
import RouteGuard from "./hooks/RouteGuard";

function App() {
  return (
    <>
      <ThemeProvider theme={customTheme} noSsr>
        <Container
          disableGutters
          sx={{
            bgcolor: "#061621",
            minHeight: "100vh",
            minWidth: "100%",
            m: 0,
          }}
        >
          <AuthProvider>
            <Header />
            <Stack spacing={0} sx={{ m: 0, p: 0 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/events" element={<Events />} />
                <Route element={<RouteGuard />} >
                <Route path="/events/create" element={<EventActions action={"create"} />} />
                <Route path="/events/:eventId" element={<EventActions  action={"edit"} />} />
                </Route>
              </Routes>
              {/* <Clock /> */}
            </Stack>
            <Footer />
          </AuthProvider>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
