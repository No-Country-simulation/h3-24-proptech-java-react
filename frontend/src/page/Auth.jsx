import { useState } from "react";
import Register from "../features/auth/Register";
import Login from "../features/auth/login";
import Logo from "../ui/Logo";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="">
      <div className="text-center p-4">
        <Logo />
      </div>

      {isLogin ? (
        <Login>
          <p className="text-center mb-3">
            No tenes cuenta?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Registrate
            </span>
          </p>
        </Login>
      ) : (
        <Register>
          <p className="text-center mb-3">
            ¿Ya tienes una cuenta?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Iniciar sesión
            </span>
          </p>
        </Register>
      )}
    </section>
  );
}

export default Auth;
