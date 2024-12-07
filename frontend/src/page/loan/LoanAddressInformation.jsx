import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import SubmitButton from "../../ui/SubmitButton";

import useLoanApplication from "../../features/loan/useLoanApplication";
import useCurrentUser from "../../features/user/useCurrentUser";
import useUserProfile from "../../features/user/useUserProfile";

function LoanAddressInformation() {
  const navigate = useNavigate();

  const { user } = useCurrentUser();
  const { userProfile } = useUserProfile(user?.user?.dni);
  const { addLoanData, loanResults } = useLoanApplication();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: userProfile?.country || loanResults?.country || "",
      state: userProfile?.state || loanResults?.state || "",
      city: userProfile?.city || loanResults?.city || "",
      zipCode: loanResults?.zipCode || "",
      road: userProfile?.road || loanResults?.road || "",
      houseNumber: userProfile?.houseNumber || loanResults?.houseNumber || "",
    },
  });

  ////////////////////////

  async function onSubmit(data) {
    addLoanData("loan-address-info", data);

    navigate("/loan/data-summary", {
      replace: true,
    });
  }

  ////////////////////////

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto  min-h-[75vh]  flex flex-col gap-5"
    >
      <h1 className="text-2xl font-semibold mb-3">Datos sobre su domicilio</h1>

      <FormRow
        label="En que país vive actualmente?"
        error={errors?.country?.message}
      >
        <input
          type="text"
          placeholder=""
          {...register("country", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow
        label="Cual es tu estado o provincia?"
        error={errors?.state?.message}
      >
        <input
          type="text"
          placeholder=""
          {...register("state", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Ciudad o municipio" error={errors?.city?.message}>
        <input
          type="text"
          placeholder="Ingrese un nombre"
          {...register("city", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Código postal" error={errors?.zipCode?.message}>
        <input
          type="number"
          placeholder="Ingrese un numero"
          {...register("zipCode", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Nombre de la calle" error={errors?.road?.message}>
        <input
          type="text"
          placeholder="Ingrese un nombre"
          {...register("road", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow
        label="Altura del domicilio"
        error={errors?.houseNumber?.message}
      >
        <input
          type="number"
          placeholder="Ingrese un numero"
          {...register("houseNumber", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <div className="ml-auto mt-3">
        <SubmitButton>Continuar</SubmitButton>
      </div>
    </form>
  );
}

export default LoanAddressInformation;
