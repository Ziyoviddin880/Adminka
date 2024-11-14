import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import BrandIcon from "../../icons/BrandIcon";
import CarIcon from "../../icons/CarIcon";
import CityIcon from "../../icons/CityIcon";
import HomeIcon from "../../icons/HomeIcon";
import LocationIcon from "../../icons/LocationIcon";
import ModelIcon from "../../icons/ModelIcon";
import NextPrev from "../../icons/NextPrev";
import UserIcon from "../../icons/UserIcon";
import "./rootLayout.scss";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";

const RootLayouts = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [shortMenu, setShortMenu] = useState(false);

  return token ? (
    <>
      <div className="window-box">
        <div className={shortMenu ? "menu-side menu-side-short" : "menu-side"}>
          <h1>
            <NavLink to="/">
              {shortMenu ? (
                <img
                  height={26}
                  src="https://autozoom-admin-nine.vercel.app/assets/autozoom-CM99tOti.svg"
                  alt="LOGO"
                />
              ) : (
                "AvtozoomAdmin"
              )}
            </NavLink>
          </h1>

          <ul>
            <NavLink to="/">
              <li>
                <HomeIcon />
                {shortMenu ? "" : <span>Dashboard</span>}
              </li>
            </NavLink>

            <NavLink to="/brands">
              <li>
                <BrandIcon />
                {shortMenu ? "" : <span>Brands</span>}
              </li>
            </NavLink>
            <NavLink to="/models">
              <li>
                <ModelIcon />
                {shortMenu ? "" : <span>Models</span>}
              </li>
            </NavLink>
            <NavLink to="/location">
              <li>
                <LocationIcon />
                {shortMenu ? "" : <span>Locations</span>}
              </li>
            </NavLink>
            <NavLink to="/cities">
              <li>
                <CityIcon />
                {shortMenu ? "" : <span>Cities</span>}
              </li>
            </NavLink>
            <NavLink to="/cars">
              <li>
                <CarIcon />
                {shortMenu ? "" : <span>Cars</span>}
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="right-side">
          <header>
            <div className="header-button">
              <Button onClick={() => setShortMenu(!shortMenu)} success={true}>
                <NextPrev />
              </Button>
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  toast.success("LogOut Success");
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                }}
                success={false}
              >
                <UserIcon />
                Log Out
              </Button>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
          <footer></footer>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default RootLayouts;
