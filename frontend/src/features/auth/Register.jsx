import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import useRegister from "./useRegister";

function Register() {
  const { register: signup, isPending: isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  async function onSubmit(data) {
    signup(data, { onSettled: () => reset() });
  }

  return (
    <section className="flex flex-col items-center justify-center w-full h-[100vh]">
      <h1 className=" mb-4 text-2xl">Create your account</h1>

      <form
        className="flex flex-col gap-4  border-2 border-black p-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow label="Nombre" error={errors?.name?.message}>
          <input
            type="text"
            id="name"
            placeholder="Introduce tu nombre"
            disabled={isLoading}
            {...register("name", {
              required: "Este campo es obligatorio",
            })}
          />
        </FormRow>

        <FormRow label="Apellido" error={errors?.lastname?.message}>
          <input
            type="text"
            id="lastname"
            placeholder="Introduce tu nombre"
            disabled={isLoading}
            {...register("lastname", {
              required: "Este campo es obligatorio",
            })}
          />
        </FormRow>

        <FormRow label="DNI" error={errors?.dni?.message}>
          <input
            type="number"
            id="dni"
            placeholder="Introduce tu DNI"
            disabled={isLoading}
            {...register("dni", {
              required: "Este campo es obligatorio",
              min: {
                value: 8,
                message: "El DNI debe tener al menos 8 dígitos",
              },
            })}
          />
        </FormRow>

        <FormRow label="Correo electrónico" error={errors?.email?.message}>
          <input
            type="email"
            id="email"
            placeholder="Ingresa tu correo electrónico"
            disabled={isLoading}
            {...register("email", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message:
                  "Proporcione una dirección de correo electrónico válida",
              },
            })}
          />
        </FormRow>

        <FormRow label="Contraseña" error={errors?.password?.message}>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", {
              required: "Este campo es obligatorio",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres.",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                message:
                  "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Repeat password"
          error={errors?.confirmPassword?.message}
        >
          <input
            type="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            disabled={isLoading}
            {...register("confirmPassword", {
              required: "Este campo es obligatorio",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </FormRow>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "enviar"}
        </button>
      </form>
    </section>
  );
}

export default Register;
