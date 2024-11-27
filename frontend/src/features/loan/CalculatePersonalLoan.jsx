import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useLoanSimulation } from "./useLoanSimulation";
import SubmitButton from "../../ui/SubmitButton";

const months = [
  "6 Meses",
  "9 Meses",
  "12 Meses",
  "18 Meses",
  "24 Meses",
  "30 Meses",
  "36 Meses",
  "48 Meses",
  "60 Meses",
  "72 Meses",
  "84 Meses",
  "96 Meses",
  "120 Meses",
  "150 Meses",
  "180 Meses",
];

function CalculatePersonalLoan() {
  const { loanSimulation, isPending } = useLoanSimulation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    const loan = {
      ...data,
      requestedAmount: +data.requestedAmount,
      termMonths: +data.termMonths,
    };

    console.log(data, loan);
    loanSimulation(loan, { onSettled: () => reset() });
  }

  return (
    <section>
      <h1 className=" text-2xl font-semibold mb-5">
        Calcula tu préstamo personal
      </h1>

      <p className="mb-7">
        Completa los campos para simular tu préstamo y elegir el financiamiento
        que necesitas.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormRow
          label="Cuanto dinero necesitas?"
          error={errors?.requestedAmount?.message}
        >
          <input
            type="number"
            placeholder="5.000$ - 50.000$"
            disabled={isPending}
            {...register("requestedAmount", {
              required: "Este campo es obligatorio",
            })}
          />
        </FormRow>

        <FormRow
          label="En cuantos meses te gustaría pagar?"
          error={errors?.termMonths?.message}
        >
          <select
            id="mesSelect"
            className=""
            disabled={isPending}
            {...register("termMonths", {
              required: "Este campo es obligatorio",
            })}
          >
            <option value="">Meses</option>

            {months.map((month, index) => {
              const num = month.slice(0, month.indexOf(" "));

              return (
                <option key={index} value={num}>
                  {month}
                </option>
              );
            })}
          </select>
        </FormRow>

        <FormRow
          label="Cual es tu motivo del prestamo?"
          error={errors?.reason?.message}
        >
          <textarea
            disabled={isPending}
            placeholder="Motivo"
            {...register("reason")}
          ></textarea>
        </FormRow>

        <div className="mt-7">
          <SubmitButton isPending={isPending}>Ver resultados</SubmitButton>
        </div>
      </form>
    </section>
  );
}

export default CalculatePersonalLoan;
