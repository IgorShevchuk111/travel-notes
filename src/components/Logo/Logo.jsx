import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logoContainer}>
      <img src="/icon.png" alt="WorldWise logo" className={styles.logo} />
      <span className={styles.logoText}>TravelNotes</span>
    </Link>
  );
}

export default Logo;
