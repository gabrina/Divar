import { useState } from "react";
import Styles from "./Header.module.css";

import { Link, useNavigate } from "react-router-dom";
import { clearCookie } from "../utils/cookie";
import { toast } from "react-toastify";

function Header() {
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = () => {
    clearCookie();
    navigate("/", { replace: true });
    toast.success("شما با موفقیت خارج شدید");
  };

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
        <div className={Styles.menu} style={{ border: "1px solid red" }}>
          <span
            onClick={() => {
              setIsShown((prev) => !prev);
            }}
          >
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
          <ul className={isShown ? "" : Styles.hidden}>
            <li>
              <Link to="/auth">آگهی های من</Link>
            </li>
            <li onClick={logoutHandler}>
              خروج
            </li>
          </ul>
        </div>
        <Link to="/dashboard" className={Styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
