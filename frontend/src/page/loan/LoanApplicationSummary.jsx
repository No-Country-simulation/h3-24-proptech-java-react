import { useEffect } from "react";
import useLoanApplication from "../../features/loan/useLoanApplication";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import Button from "../../ui/Button";

//const sameStyle = "";

function LoanApplicationSummary() {
  const { loanResults: loan, submitLoanData } = useLoanApplication();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (Object.keys(loan).length === 0)
        navigate("/loan/personal-information", { replace: true });
    },
    [loan, navigate]
  );

  const {
    economicActivity,
    monthlyIncome,
    CBU,
    name,
    lastname,
    birthdate,
    countryOfBirth,
    province,
    city,
    street,
    zipCode,
    currentCountry,
    domicilio,
    gender,
    phone,
    landlineTelephonee,
    education,
  } = loan;

  console.log("Resumen de datos", loan);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3 text-center">
        Resumen de datos
      </h1>
      <p className="mb-4">
        Por favor, revise sus datos ingresados para evitar rechazos por datos no
        coincidentes.
      </p>

      <div className="border-t-2 border-lightGrey py-4 mb-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold mb-3 text-center">
          Datos del prestamo
        </h2>

        <p className="flex items-center justify-between gap-1 ">
          Principal actividad económica
          <span className=" font-medium">{economicActivity}</span>
        </p>

        <p className="flex items-center justify-between  gap-1 ">
          Ingresos mensuales
          <span className=" font-medium">{monthlyIncome}</span>
        </p>

        <p className="flex items-center justify-between  gap-1">
          CBU / CVU
          <span className=" font-medium">{CBU}</span>
        </p>

        <div className="flex items-center gap-3">
          <div className=" p-2  bg-dark rounded-xl">
            <CirclePlus className=" text-light w-[25px] h-[25px]" />
          </div>

          <div>
            <p className="  text-xs">Adjunte 3 documentos de:</p>
            <p className="  font-medium text-base">Recibos de sueldos</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className=" p-2  bg-dark rounded-xl">
            <CirclePlus className=" text-light w-[25px] h-[25px]" />
          </div>

          <div>
            <p className="  text-xs">Adjunte 1 documento de:</p>
            <p className="  font-medium text-base">Factura de servicios</p>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-lightGrey py-4 mb-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold mb-3 text-center">
          Datos de tu domicilio
        </h2>
        <p className="flex items-center justify-between  gap-1">
          País
          <span className=" font-medium">{currentCountry}</span>
        </p>
        <p className="flex items-center justify-between  gap-1">
          Provincia
          <span className=" font-medium">{province}</span>
        </p>

        <p className="flex items-center justify-between  gap-1 ">
          Ciudad
          <span className=" font-medium">{city}</span>
        </p>

        <p className="flex items-center justify-between  gap-1 ">
          Código postal
          <span className=" font-medium">{zipCode}</span>
        </p>

        <p className="flex items-center justify-between  gap-2">
          Calle
          <span className="text-center bg-lime-40  font-medium">{street}</span>
        </p>

        <p className="flex items-center justify-between gap-1 ">
          Altura
          <span className=" font-medium">{domicilio}</span>
        </p>
      </div>

      <div className="border-t-2 border-lightGrey py-4 mb-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold mb-3 text-center">
          Datos personales
        </h2>
        <p className="flex items-center justify-between  gap-1 ">
          Nombre(s)
          <span className=" font-medium">{name}</span>
        </p>
        <p className="flex items-center justify-between  gap-1 ">
          Apellidos(s)
          <span className=" font-medium">{lastname}</span>
        </p>

        <p className="flex items-center justify-between   gap-1">
          Género
          <span className=" font-medium">{gender}</span>
        </p>

        <p className="flex items-center justify-between  gap-1 ">
          Fecha de nacimiento
          <span className=" font-medium">{birthdate}</span>
        </p>

        <p className="flex items-center justify-between  gap-1 ">
          País de nacimiento
          <span className=" font-medium">{countryOfBirth}</span>
        </p>

        <p className="flex items-center justify-between  gap-1 ">
          Nivel de estudios
          <span className=" font-medium">{education}</span>
        </p>

        <p className="flex items-center justify-between  gap-1 ">
          Teléfono celular
          <span className=" font-medium">{phone}</span>
        </p>

        <p className="flex items-center justify-between   gap-1">
          Teléfono fijo
          <span className=" font-medium">{landlineTelephonee}</span>
        </p>
      </div>

      <div className="border-t-2 border-lightGrey py-4  flex gap-7 items-center  justify-center">
        <Button type="secondary" to="/loan/personal-information">
          Modificar datos
        </Button>
        <Button type="secondary" onClick={() => submitLoanData()}>
          Continuar
        </Button>
      </div>
    </div>
  );
}

export default LoanApplicationSummary;
