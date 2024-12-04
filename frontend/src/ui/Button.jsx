import { Link } from "react-router-dom";

const style =
  "px-4 py-2 font-medium border border-primary rounded-[10px] text-primary bg-transparent text-light";

function Button({
  to,
  disabled,
  onClick,
  children,
  extraClass,
  type = "primary",
}) {
  const styles = {
    primary: `text-center px-4 py-2 font-medium border border-primary rounded-[10px] text-primary bg-transparent text-light ${extraClass}`,
    secondary: `text-center px-4 py-2 text-lg text-light font-medium bg-primary rounded-lg  ${extraClass}`,
    greenColor: `text-center px-4 py-2 text-lg text-light font-medium bg-[#22C55E] rounded-lg  ${extraClass}`,
    logOut: `text-center font-medium  border-none text-[#EF4444] bg-transparent text-light ${extraClass}`,
  };

  if (to)
    return (
      <Link to={to} disabled={disabled} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  );
}

export default Button;
