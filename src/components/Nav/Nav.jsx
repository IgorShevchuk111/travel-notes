import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import Logo from "../Logo/Logo";
import { useAuth } from "../../contexts/FakeAuthContext";

function Nav() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
