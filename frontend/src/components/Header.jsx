import { useState } from "react";
import {
  AppBar,
  Box,
  Fade,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Home, AccountCircle, Logout, Person, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleHome = () => {
    navigate("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseOut = async () => {
    setAnchorEl(null);
    await auth.logOut();
  };

  return (
    <Box>
      <Box sx={{ height: "0.5rem", bgcolor: "secondary.main" }}></Box>
      <AppBar position="static">
        <Toolbar>
        {auth.token === "admin"? (
          <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu admin"
          sx={{ mr: 2 }}
          onClick={handleHome}
        >
          <MenuIcon />
        </IconButton>) : ""
        }
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleHome}
          >
            <Home />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontFamily: 'Righteous' }}>
            Eventti
          </Typography>
          {auth.token ? (
            <div>
              <Fade in={auth.token? true: false}>
                <IconButton
                  size="large"
                  aria-label={`${auth.user.username}`}
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Fade>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  divider
                  disableRipple
                  sx={{
                    "&:hover": {
                      background: "none",
                      cursor: "default"
                    },
                  }}
                >
                  Hola, {auth.user.username}!
                </MenuItem>
                <MenuItem disabled onClick={handleClose}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Perfil
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="contained" color="secondary" disableElevation>
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
