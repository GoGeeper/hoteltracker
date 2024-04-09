import { lazy } from "react";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ManageHotel = lazy(() => import("../pages/ManageHotel"));
const ListProperty = lazy(() => import("../pages/ListProperty"));
const ChainDetails = lazy(() => import("../pages/ChainDetails"));
const PropertyDetails = lazy(() => import("../pages/PropertyDetails"));
const EditProperty = lazy(() => import("../pages/EditProperty"));
const GeolocationMain = lazy(() => import("../pages/GeolocationMain"));

const routePath = () => {
  const routeData: {
    path: string;
    component: React.LazyExoticComponent<() => JSX.Element>;
    isProtected?: boolean;
  }[] = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/manage-hotel",
      component: ManageHotel,
      isProtected: true,
    },
    {
      path: "/chain/:type",
      component: ChainDetails,
    },
    {
      path: "/:type/:id",
      component: PropertyDetails,
    },
    {
      path: "/geolocation",
      component: GeolocationMain,
      isProtected: false,
    },
    {
      path: "/:type/edit/:id",
      component: EditProperty,
      isProtected: true,
    },
    {
      path: "/list-property/:type",
      component: ListProperty,
      isProtected: true,
    },

    // {
    //   path: "*",
    //   component: NotFound,
    // },
  ];
  return routeData;
};
export default routePath;
