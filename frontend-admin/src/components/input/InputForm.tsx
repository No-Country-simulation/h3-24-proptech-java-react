import { UseFormRegister } from 'react-hook-form';
import ErrorInput from '../ErrorInput';

type InputFormProps = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
  classname?: string; // Prop para estilos adicionales
  classNameInput?: string; // Prop para estilos adicionales
};

export default function InputForm({
  label,
  id,
  type,
  placeholder,
  register,
  validation,
  errors,
  classname,
  classNameInput,
}: InputFormProps) {
  return (
    <div className={`relative flex flex-col w-full ${classname}`}>
      <label htmlFor={id} className=' text-sm font-semibold mb-1'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full h-[3rem] p-2 rounded-md  border border-[#E2E8F0] outline-none ${classNameInput} `}
        placeholder={placeholder}
        {...register(id, validation)}
      />
      {errors[id] && <ErrorInput>{errors[id].message}</ErrorInput>}
    </div>
  );
}
