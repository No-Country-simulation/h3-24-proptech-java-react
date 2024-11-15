import React from 'react'
/* import { SIGN_UP } from '../../router/children' */

const LogIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <form className="bg-white p-6 rounded shadow-md">
        <label className="block mb-2">Usuario</label>
        <input type="text" className="border p-2 mb-4 w-full" />
        <label className="block mb-2">Contraseña</label>
        <input type="password" className="border p-2 mb-4 w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Ingresar</button>
      </form>
    </div>
  );
};

export default LogIn