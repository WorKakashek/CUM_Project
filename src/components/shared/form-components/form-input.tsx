import { Input } from "@/components/ui";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  placeholder,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };
  return (
    <div className={className}>
      {label && (
        <p>
          {label}
          {required && <span>*</span>}
        </p>
      )}
      <div className=" relative">
        <Input
          placeholder={placeholder}
          className="h-12 text-md"
          {...props}
          {...register(name)}
        />
        {value && (
          <button
            onClick={onClickClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
          >
            <X />
          </button>
        )}
      </div>
      {errorText && <div className="text-red-500">Required</div>}
    </div>
  );
};
