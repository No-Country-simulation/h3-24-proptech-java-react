interface ButtonProps {
  // El texto o valor que se muestra en el botón
  onClick?: () => void; // La función que se ejecutará al hacer click (es opcional)
  type?: 'button' | 'submit' | 'reset'; // Tipo de botón, por defecto "button"
  className?: string; // Clase CSS adicional para personalización
  children: React.ReactNode;
}

export const Button = ({
  type = 'button',

  className,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={` px-4 py-4 bg-[#2962FF] text-white text-xl font-semibold rounded-xl w-[90%] cursor-pointer max-w-[300px] ${className}`}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
};
