import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import SubmitButton from "../../ui/SubmitButton";
import FormRow from "../../ui/FormRow";
import { BigLogo } from "../../ui/Logo";

import { baseURL } from "../../utils/constants";
import toast from "react-hot-toast";
function RecoverPasswordForm() {
  const [email, setEmail] = useState(true);
  const location = useLocation();

  const getQueryParams = (query) => {
    const urlParams = new URLSearchParams(query);
    return urlParams.get("token");
  };

  const token = getQueryParams(location.search);

  console.log("token:", token, email);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  async function onSubmit(data) {
    if (data?.email && email) {
      console.log("email", data.email, baseURL);

      await axios
        .post(`${baseURL}/api/forgot-password`, { email: data.email })
        .then(() => {
          setEmail(false);
          toast.success("Correo enviado");
        })
        .catch((err) => {
          toast.error("Algo salio mal!");
          console.log(err);
        })
        .finally(() => {
          reset();
        });
    }

    if (data.password && data.confirmPassword && token) {
      console.log("pass", data.password);

      await axios
        .post(`${baseURL}/api/reset-password`, {
          token: token,
          password: data.password,
        })
        .then(() => {
          toast.success("Contraseña cambiada");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Algo salio mal!");
        })
        .finally(() => {
          reset();
        });
    }
  }

  return (
    <>
      {email && !token ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col min-h-[90vh] p-5 "
        >
          <div className="flex-grow flex flex-col gap-7 justify-center mb-5">
            <div className="mx-auto ">
              <BigLogo />
            </div>

            <FormRow label="Email" error={errors?.email?.message}>
              <input
                type="email"
                id="email"
                placeholder="Email"
                // disabled={isLoading}
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
          </div>

          <SubmitButton>Continuar</SubmitButton>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col min-h-[90vh] p-5 "
        >
          <div className="flex-grow flex flex-col gap-7 justify-center mb-5">
            <div className="mx-auto ">
              <BigLogo />
            </div>

            <FormRow label="Contraseña" error={errors?.password?.message}>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
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
              label="Repetir contraseña"
              error={errors?.confirmPassword?.message}
            >
              <input
                type="confirmPassword"
                id="confirmPassword"
                placeholder="Repetir contraseña"
                //  disabled={isLoading}
                {...register("confirmPassword", {
                  required: "Este campo es obligatorio",
                  validate: (value) =>
                    value === getValues().password || "Passwords need to match",
                })}
              />
            </FormRow>
          </div>

          <SubmitButton>Confirmar</SubmitButton>
        </form>
      )}
    </>
  );
}

export default RecoverPasswordForm;
