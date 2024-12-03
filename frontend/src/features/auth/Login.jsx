import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useLogin } from "./useLogin";
import SubmitButton from "../../ui/SubmitButton";

const Login = ({ children }) => {
  const { login, isPending: isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    login(data, { onSettled: () => reset() });
  }

  return (
    <div className=" min-h-[90vh] flex flex-col m-auto ">
      <h1 className=" text-3xl font-semibold mb-6 px-7">Iniciar sesión</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-grow flex-col"
      >
        <div className="px-7  flex flex-col gap-5">
          <FormRow label="Email" error={errors?.email?.message}>
            <input
              type="email"
              id="email"
              placeholder="Email"
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
                  message: "Contraseña",
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

          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <input
                className=" w-4 h-4"
                type="checkbox"
                id="Recordarme"
                name="Recordarme"
              />
              <label htmlFor="Recordarme">Recordarme</label>
            </div>

            <p className=" underline">Olvide mi contraseña</p>
          </div>
        </div>

        <div className="mt-[auto]">{children}</div>

        <div className="border-t-[1px] border-lightGrey p-4">
          <SubmitButton isPending={isLoading}>Iniciar sesión</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
