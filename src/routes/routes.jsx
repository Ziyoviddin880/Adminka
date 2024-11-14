import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import HomePage from "../pages/homePage/HomePage";
import NotFoundPae from "../pages/notFoundPage/NotFoundPae";
import RootLayouts from "../layouts/rootLayout/RootLayouts";
import SettingsPage from "../pages/settingsPage/SettingsPage";
import BrandsPage from "../pages/brandsPage/BrandsPage";
import CarPage from "../pages/carPage/CarPage";
import ModelsPage from "../pages/ModelsPage/ModelsPage";
import LocationPage from "../pages/locationPage/LocationPage";
import CityPage from "../pages/cityPage/CityPage";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "/brands",
        element: <BrandsPage />,
      },
      {
        path: "/cars",
        element: <CarPage />,
      },
      {
        path: "/models",
        element: <ModelsPage />,
      },
      {
        path: "/location",
        element: <LocationPage />,
      },
      ,
      {
        path: "/cities",
        element: <CityPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPae />,
  },
]);
