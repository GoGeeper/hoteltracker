import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./components/theme";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterContextProvider from "./contextApi/RegisterContext.tsx";
import AuthContextProvider from "./contextApi/AuthProvider.tsx";
import PropertyProvider from "./contextApi/PropertyProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthContextProvider>
          <RegisterContextProvider>
            <PropertyProvider>
              <App />
            </PropertyProvider>
          </RegisterContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
