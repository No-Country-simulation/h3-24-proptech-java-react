import { useEffect, useState } from 'react';
import Register from '../features/auth/Register';

import Login from '../features/auth/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useUser();
  useEffect(() => {
    console.log(user);
    // if (user) navigate('/home');
  }, [user]);
  const location = useLocation();
  useEffect(() => {
    const response = location.state;
    if (response) {
      setIsLogin(response === 'login');
    }
  }, [location.state]);
  return (
    <section className='w-full'>
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
