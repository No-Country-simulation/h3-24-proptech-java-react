import { useState } from "react";
import Register from "../features/auth/Register";
import Login from "../features/auth/login";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section>
      <h1>HOLA</h1>

      {isLogin ? <Login /> : <Register />}

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
