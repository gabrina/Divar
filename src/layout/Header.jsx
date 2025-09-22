import { useEffect, useState } from "react";
import Styles from "./Header.module.css";

import { Link, useNavigate } from "react-router-dom";
import { clearCookie, isCookieEmpty } from "../utils/cookie";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "../services/user";

function Header() {
  const [isShown, setIsShown] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const navigate = useNavigate();
  const QueryClient = useQueryClient();

  const logoutHandler = () => {
    if (isCookieEmpty()) {
      //the user hi snot logged in yet
      toast.warn("شما هنوز وارد نشده اید!");
      navigate("/auth", { replace: true });
      return;
    } else {
      //the user is logged in
      clearCookie();
      navigate("/", { replace: true });
      QueryClient.invalidateQueries(["profile"]);
      toast.success("شما با موفقیت خارج شدید");
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id === "menu" || event.target.closest("#menu")) {
        return;
      }
      setIsShown(false);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

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
        <div className={Styles.menu} id="menu">
          <span
            onClick={() => {
              setIsShown((prev) => !prev);
            }}
          >
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
          <ul className={isShown ? "" : Styles.hidden}>
            {isCookieEmpty() ? (
              <li>
                <Link to="/auth">ورود به حساب کاربری</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/auth">آگهی های من</Link>
                </li>
                <hr />
              </>
            )}

            {data && data.data.role === "ADMIN" ? (
              <>
                <li>
                  <Link to="/admin">پنل ادمین</Link>
                </li>
                <hr />
              </>
            ) : (
              ""
            )}

            {!isCookieEmpty() ? <li onClick={logoutHandler}>خروج</li> : ""}
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
