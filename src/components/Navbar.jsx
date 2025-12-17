import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
