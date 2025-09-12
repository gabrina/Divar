import Styles from "./Header.module.css";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={Styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={Styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <Link to="/auth">
          <span>
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
        </Link>
        <Link to="/dashboard" className={Styles.button}>ثبت آگهی</Link>
      </div>
    </header>
  );
}

export default Header;
