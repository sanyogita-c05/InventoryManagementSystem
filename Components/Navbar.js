import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../Assets/Logo.svg"; // Your logo
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import "./Navbar.css";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "About", icon: <InfoIcon />, path: "/about" },
    { text: "Testimonials", icon: <CommentRoundedIcon />, path: "/testimonials" },
    { text: "Contact", icon: <PhoneRoundedIcon />, path: "/contact" },
  ];

  useEffect(() => {
    setUsername(localStorage.getItem('username') || null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY < 50); // show only near top
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginLogout = () => {
    if (username) {
      localStorage.removeItem('username');
      setUsername(null);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className={`navbar ${showNavbar ? "visible" : "hidden"}`}>
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" onClick={() => navigate('/')} />
      </div>

      <div className="navbar-links-container">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/testimonials" className="navbar-link">Testimonials</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>

        <button onClick={handleLoginLogout} className="login-logout-button">
          {username ? 'Logout' : 'Login'}
        </button>
      </div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <ListItem>
            <ListItemButton onClick={handleLoginLogout}>
              <ListItemText primary={username ? 'Logout' : 'Login'} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
