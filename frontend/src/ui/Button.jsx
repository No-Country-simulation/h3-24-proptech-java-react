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
    primary: `px-4 py-2 font-medium border border-primary rounded-[10px] text-primary bg-transparent text-light ${extraClass}`,
    secondary: `px-4 py-2 text-lg text-light font-medium bg-primary rounded-lg  ${extraClass}`,
    greenColor: `px-4 py-2 text-lg text-light font-medium bg-[#22C55E] rounded-lg  ${extraClass}`,
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
