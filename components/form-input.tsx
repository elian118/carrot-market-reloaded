type FormInputProps = {
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  errors?: string[];
};

const FormInput = ({
  name,
  type,
  placeholder,
  required,
  errors = [],
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 outline-none ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors?.map((err, idx) => (
        <span key={idx} className="text-red-500 font-medium">
          {err}
        </span>
      ))}
    </div>
  );
};

export default FormInput;
