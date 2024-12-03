import Button from "../../ui/Button";

function StartLoanRequest() {
  return (
    <div className="flex flex-col  min-h-[90vh]">
      <div className="flex-grow px-5  py-8 ">
        <h1 className=" text-2xl font-semibold mb-5">
          ¡Genial! Estamos listos para avanzar
        </h1>
        <p className="mb-3">
          Para continuar con tu solicitud de préstamo, necesitamos que completes
          algunos datos adicionales.
        </p>
        <p>
          Esto nos permitirá evaluar tu solicitud de forma rápida y precisa.
        </p>
      </div>

      <div className="w-full flex justify-end  ml-auto mt-10 p-5 border-t-2 border-lightGrey ">
        <Button type="secondary" to="/loan/veriff">
          Iniciar solicitud
        </Button>
      </div>
    </div>
  );
}

export default StartLoanRequest;
