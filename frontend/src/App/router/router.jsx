import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import NotFound404 from "../views/NotFound404/NotFound404.jsx";
import { LOGIN, SIGN_UP, INICIO } from "./children.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound404 />,
    children: [
      SIGN_UP, // Ruta: /registro
      INICIO,  // Ruta: /
      LOGIN,   // Ruta: /login
    ],
  },
]);

