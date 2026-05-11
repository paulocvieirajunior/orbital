import { Input } from "../ui/input"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field"
import {
  FieldError as RHFFieldError,
  FieldValues,
  get,
  Path,
  useFormContext,
} from "react-hook-form"

type FieldInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  description?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function FieldInput<T extends FieldValues>({
  name,
  label,
  description,
  ...rest
}: FieldInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const fieldError = get(errors, name) as RHFFieldError | undefined
  const errorMessage = fieldError?.message

  return (
    <Field>
      {label && <FieldLabel>{label}</FieldLabel>}
      <FieldContent>
        <Input id={name} {...rest} {...register(name)} />
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  )
}
