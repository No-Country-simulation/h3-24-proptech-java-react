import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const options = [
  { id: "1", label: "Datos personales", to: "" },
  { id: "2", label: "Panel de inversion", to: "/investmentPanel" },
  { id: "3", label: "Datos de garantes", to: "" },
  { id: "4", label: "Resumen de tu préstamo", to: "/loan/data-summary" },
  { id: "5", label: "Cuotas a pagar", to: "/paymentQuotas" },
  { id: "6", label: "Ajustes personales", to: "/personalSettings" },
];

function ProfileMenu() {
  return (
    <ul className="flex-grow flex flex-col gap-5">
      {options.map((option) => (
        <li key={option.id}>
          <Link
            to={option.to}
            className="bg-[#F8FAFC] flex justify-between p-4 rounded-xl transition  hover:bg-primary hover:text-light"
          >
            {option.label}
            <ChevronRight />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ProfileMenu;
