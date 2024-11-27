import { AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "./Button";
import UserPhoto from "../features/user/UserPhoto";
import useCurrentUser from "../features/user/useCurrentUser";

const Nav = () => {
  const { user } = useCurrentUser();

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
          {user ? <UserPhoto /> : <Button to="/auth">Iniciar sesión</Button>}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
