import { useEffect, useState } from 'react';
import Register from '../features/auth/Register';

import Login from '../features/auth/Login';
import { useLocation } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const response = location.state;
    console.log(response);
    if (response) {
      setIsLogin(response === 'login');
    }
  }, [location.state]);
  return (
    <section className='pt-8 w-full mb-4 '>
      {isLogin ? (
        <Login>
          <p className='text-center mb-3'>
            No tenes cuenta?{' '}
            <span
              className='underline cursor-pointer'
              onClick={() => setIsLogin(false)}>
              Registrate
            </span>
          </p>
        </Login>
      ) : (
        <Register>
          <p className='text-center mb-3'>
            ¿Ya tienes una cuenta?{' '}
            <span
              className='underline cursor-pointer'
              onClick={() => setIsLogin(true)}>
              Iniciar sesión
            </span>
          </p>
        </Register>
      )}
    </section>
  );
}

export default Auth;
