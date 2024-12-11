import Button from '../ui/Button';

function PasswordChangeMessage() {
  return (
    <section className='flex  flex-col  min-h-[95vh] md:min-h-0 md:h-[70vh]   p-5 md:w-[60%] m-auto lg:w-[50%] max-w-[600px]  mt-5 '>
      <div className='flex-grow flex flex-col  '>
        <h1 className='mb-5 text-xl font-bold'>
          Tu contraseña se cambió correctamente.
        </h1>
        <p>
          Ahora puedes iniciar sesión con tu nueva contraseña. Si no realizaste
          este cambio, por favor contáctanos de inmediato para proteger tu
          cuenta.
        </p>
      </div>

      <Button to='/home'>Volver a la página principal</Button>
    </section>
  );
}

export default PasswordChangeMessage;
