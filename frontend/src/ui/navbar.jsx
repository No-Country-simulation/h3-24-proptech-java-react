import { AlignJustify } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b-2 border-lightGrey p-4">
      <ul className="flex items-center gap-2">
        <li>
          <AlignJustify className=" text-[dark]" />
        </li>

        <li className="px-4 py-1 font-medium bg-grey">
          <Link to="/home">Logo</Link>
        </li>

        <li className="ml-[auto]  ">
          <Button to="/auth">Iniciar sesión</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
