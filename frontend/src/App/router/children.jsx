import Inicio from "../views/Inicio/Index.jsx";
import LogIn from "../views/Login/log_in.jsx";  
import SignUp from "../views/SignUp/sign_up.jsx";

export const SIGN_UP = {
  path: "/registro",
  element: <SignUp />,
};

export const INICIO = {
  path: "/",
  element: <Inicio />,
};

export const LOGIN = {
  path: "/login",
  element: <LogIn />,
};

