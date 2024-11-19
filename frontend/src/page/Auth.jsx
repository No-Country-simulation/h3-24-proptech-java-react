import { useState } from "react";
import Register from "../components/auth/Register";
import LogIn from "../components/auth/log_in";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section>
      <h1>HOLA</h1>

      {isLogin ? <LogIn /> : <Register />}

      <div>
        {isLogin ? (
          <p
            className="p-3 w-36 bg-red-400 cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            Crear una cuenta
          </p>
        ) : (
          <p
            className="p-3 w-36 bg-red-400 cursor-pointer"
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesión
          </p>
        )}
      </div>
    </section>
  );
}

export default Auth;
