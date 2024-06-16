import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography,} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import styles from "./PageNav.module.css";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useAuth} from "../services/context/AuthContext";

const dosarMedicalPages = ["RapoarteConsultatie", "RezultateTeste"];
const testPages = ["Test personalitate", "Test SMI", "Test YSQ"];

function UserNav() {
  const navigate = useNavigate();
  const [anchorElDosar, setAnchorElDosar] = useState(null);
  const [anchorElTest, setAnchorElTest] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleNavItemClick = (page) => {
    navigate(`/${page.toLowerCase().replace(" ", "")}`);
  };

  const {user, logout} = useAuth();

  const handleLogout = () => {
    logout();
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
  console.log("UserNav user: ");
  console.log(user);
  const clientName = user.firstName + " " + user.lastName;

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <NavLink to="#" onClick={handleOpenDosarMenu}>
              Dosar Medical <ArrowDropDownIcon/>
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
                  sx={{fontSize: "20px", py: 2}}
                >
                  <ListItemIcon>
                    {page === "RapoarteConsultatie" ? (
                      <DescriptionIcon fontSize="large"/>
                    ) : (
                      <AssignmentIcon fontSize="large"/>
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{fontSize: "20px"}}
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
          <Box sx={{display: "flex", alignItems: "center"}}>
            <NavLink to="#" onClick={handleOpenTestMenu}>
              Teste <ArrowDropDownIcon/>
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
                  sx={{fontSize: "20px", py: 2}}
                >
                  <ListItemText
                    primaryTypographyProps={{fontSize: "20px"}}
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
          <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
            <Typography variant="h6" component="div" sx={{color: "black"}}>
              {clientName}
            </Typography>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    width: 56,
                    height: 56,
                  }}
                >
                  <AccountCircle sx={{fontSize: 40}}/>
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: "45px"}}
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
              <MenuItem
                onClick={() => {
                  handleNavItemClick("profil");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center" sx={{fontSize: "18px"}}>
                  Profil
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center" sx={{fontSize: "18px"}}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
