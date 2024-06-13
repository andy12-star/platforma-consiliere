/* import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";

const pages_p = ["Notite"];
const pages_c = ["Programari"];
const pages_med = ["Rapoarte", "Pacienti"];
const settings = ["Profil", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElDosar, setAnchorElDosar] = React.useState(null);
  const [anchorElTest, setAnchorElTest] = React.useState(null);

  const handleNavItemClick = (page) => {
    navigate(`/${page.toLowerCase()}`);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenDosarMenu = (event) => {
    setAnchorElDosar(event.currentTarget);
  };

  const handleOpenTestMenu = (event) => {
    setAnchorElTest(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseDosarMenu = () => {
    setAnchorElDosar(null);
  };

  const handleCloseTestMenu = (event) => {
    setAnchorElTest(null);
  };

  const clientName = "John Doe";

  return (
    <AppBar
      position="static"
      sx={{
        height: "80px",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: "80px" }}>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ fontSize: "34px" }}
            >
              <MenuIcon fontSize="inherit" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages_p.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleNavItemClick(page);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center" sx={{ fontSize: "20px" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            <Button
              onClick={handleOpenDosarMenu}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                my: 2,
                color: "black",
                display: "flex",
                fontSize: "20px",
              }}
            >
              Dosar medical
            </Button>
            <Menu
              id="menu-dosar"
              anchorEl={anchorElDosar}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElDosar)}
              onClose={handleCloseDosarMenu}
              PaperProps={{
                sx: {
                  padding: "20px",
                  minWidth: "250px",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleNavItemClick("RapoarteConsultatie");
                  handleCloseDosarMenu();
                }}
                sx={{ fontSize: "20px", py: 2 }}
              >
                <ListItemIcon>
                  <DescriptionIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "20px" }}
                  primary="Rapoarte consultatii"
                />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleNavItemClick("RezultateTeste");
                  handleCloseDosarMenu();
                }}
                sx={{ fontSize: "20px", py: 2 }}
              >
                <ListItemIcon>
                  <AssignmentIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "20px" }}
                  primary="Rezultate teste"
                />
              </MenuItem>
            </Menu>
            {pages_p.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavItemClick(page)}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "20px",
                  ml: 2,
                }}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={handleOpenTestMenu}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                my: 2,
                color: "black",
                display: "flex",
                fontSize: "20px",
              }}
            >
              Teste
            </Button>
            <Menu
              id="menu-test"
              anchorEl={anchorElTest}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElTest)}
              onClose={handleCloseTestMenu}
              PaperProps={{
                sx: {
                  padding: "20px",
                  minWidth: "250px",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleNavItemClick("Testpersonalitate");
                  handleCloseTestMenu();
                }}
                sx={{ fontSize: "20px", py: 2 }}
              >
                <ListItemText
                  primaryTypographyProps={{ fontSize: "20px" }}
                  primary="Test personalitate"
                />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleNavItemClick("TestSMI");
                  handleCloseTestMenu();
                }}
                sx={{ fontSize: "20px", py: 2 }}
              >
                <ListItemText
                  primaryTypographyProps={{ fontSize: "20px" }}
                  primary="Test SMI"
                />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleNavItemClick("TestYSQ");
                  handleCloseTestMenu();
                }}
                sx={{ fontSize: "20px", py: 2 }}
              >
                <ListItemText
                  primaryTypographyProps={{ fontSize: "20px" }}
                  primary="Test YSQ"
                />
              </MenuItem>
            </Menu>
            {pages_c.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavItemClick(page)}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "20px",
                  ml: 2,
                }}
              >
                {page}
              </Button>
            ))}
            {pages_med.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavItemClick(page)}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "20px",
                  ml: 2,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              {clientName}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    width: 56,
                    height: 56,
                  }}
                >
                  <AccountCircle sx={{ fontSize: 40 }} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleNavItemClick(setting);
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center" sx={{ fontSize: "18px" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar; */

import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function UserNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/dosarmedical">Dosar Medical</NavLink>
        </li>
        <li>
          <NavLink to="/notite">Notite</NavLink>
        </li>
        <li>
          <NavLink to="/teste">Teste</NavLink>
        </li>
        <li>
          <NavLink to="/programari">Programari</NavLink>
        </li>
        <li>
          <NavLink to="/rapoarte">Rapoarte</NavLink>
        </li>
        <li>
          <NavLink to="/pacienti">Pacienti</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;

/* import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import styles from "./PageNav.module.css";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const pages = [
  "Dosar Medical",
  "Notite",
  "Teste",
  "Programari",
  "Rapoarte",
  "Pacienti",
];
const settings = ["Profil", "Logout"];
const dosarMedicalPages = ["RapoarteConsultatie", "RezultateTeste"];
const testPages = ["Testpersonalitate", "TestSMI", "TestYSQ"];

function UserNav() {
  const navigate = useNavigate();
  const [anchorElDosar, setAnchorElDosar] = useState(null);
  const [anchorElTest, setAnchorElTest] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleNavItemClick = (page) => {
    navigate(`/${page.toLowerCase().replace(" ", "")}`);
  };

  const handleOpenDosarMenu = (event) => {
    setAnchorElDosar(event.currentTarget);
  };

  const handleOpenTestMenu = (event) => {
    setAnchorElTest(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseDosarMenu = () => {
    setAnchorElDosar(null);
  };

  const handleCloseTestMenu = () => {
    setAnchorElTest(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const clientName = "John Doe";

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavLink to="#" onClick={handleOpenDosarMenu}>
              Dosar Medical <ArrowDropDownIcon />
            </NavLink>
            <Menu
              id="menu-dosar"
              anchorEl={anchorElDosar}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElDosar)}
              onClose={handleCloseDosarMenu}
              PaperProps={{
                sx: {
                  padding: "20px",
                  minWidth: "250px",
                },
              }}
            >
              {dosarMedicalPages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleNavItemClick(page);
                    handleCloseDosarMenu();
                  }}
                  sx={{ fontSize: "20px", py: 2 }}
                >
                  <ListItemIcon>
                    {page === "RapoarteConsultatie" ? (
                      <DescriptionIcon fontSize="large" />
                    ) : (
                      <AssignmentIcon fontSize="large" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "20px" }}
                    primary={
                      page === "RapoarteConsultatie"
                        ? "Rapoarte consultatii"
                        : "Rezultate teste"
                    }
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </li>
        <li>
          <NavLink to="/notite">Notite</NavLink>
        </li>
        <li>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavLink to="#" onClick={handleOpenTestMenu}>
              Teste <ArrowDropDownIcon />
            </NavLink>
            <Menu
              id="menu-test"
              anchorEl={anchorElTest}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElTest)}
              onClose={handleCloseTestMenu}
              PaperProps={{
                sx: {
                  padding: "20px",
                  minWidth: "250px",
                },
              }}
            >
              {testPages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleNavItemClick(page);
                    handleCloseTestMenu();
                  }}
                  sx={{ fontSize: "20px", py: 2 }}
                >
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "20px" }}
                    primary={page}
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </li>
        <li>
          <NavLink to="/programari">Programari</NavLink>
        </li>
        <li>
          <NavLink to="/rapoarte">Rapoarte</NavLink>
        </li>
        <li>
          <NavLink to="/pacienti">Pacienti</NavLink>
        </li>
        <li>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              {clientName}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    width: 56,
                    height: 56,
                  }}
                >
                  <AccountCircle sx={{ fontSize: 40 }} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleNavItemClick(setting);
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center" sx={{ fontSize: "18px" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
*/
