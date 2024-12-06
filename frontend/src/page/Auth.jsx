import { useState } from 'react';
import Register from '../features/auth/Register';

import Login from '../features/auth/Login';
import { LogoSvg } from '../ui/LogoSvg';
import TextLogo from '../ui/TextLogo';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className='pt-8'>
      <div className='text-center mb-8 flex items-center gap-1 justify-center'>
        <LogoSvg />
        <TextLogo />
      </div>

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
