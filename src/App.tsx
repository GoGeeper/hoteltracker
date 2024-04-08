import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import Preloader from "./components/Preloader";
import ProtectedRoute from "./Utils/ProtectedRoute";
import routePath from "./Utils/route";

export default function App() {
  const routeData = routePath();

  return (
    <>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
        {routeData.map(
          ({ path, component: Component, isProtected = false }, index) => {
            if (isProtected) {
              return (
                <Route key={index} element={<ProtectedRoute />}>
                  <Route
                    path={path}
                    element={
                      <Suspense fallback={<>loading....</>}>
                        <Component />
                      </Suspense>
                    }
                  />
                </Route>
              );
            } else {
              return (
                <Route
                  path={path}
                  key={index}
                  element={
                    <Suspense fallback={<>loading....</>}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            }
          }
        )}
      </Routes>
    </>
  );
}
