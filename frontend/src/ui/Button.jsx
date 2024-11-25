import { Link } from "react-router-dom";

const style =
  "px-4 py-2 font-medium border border-primary rounded-[10px] text-primary bg-transparent text-light";

function Button({ to, disabled, onClick, children }) {
  if (to)
    return (
      <Link to={to} disabled={disabled} className={style}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={style}
      >
        {children}
      </button>
    );

  return (
    <button type="button" disabled={disabled} className={style}>
      {children}
    </button>
  );
}

export default Button;
