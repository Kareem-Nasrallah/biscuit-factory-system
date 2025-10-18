import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormikProps } from "formik";

interface InputFieldProp {
  id: string;
  type: "text" | "number" | "password" | "email";
  name: string;
  formik: FormikProps<any>;
  label: string;
  className?: string;
}
const InputField = ({
  id,
  type,
  name,
  formik,
  label,
  className,
}: InputFieldProp) => {
  const value = formik.values[name];
  const hasValue = value !== "" && value !== null && value !== undefined;
  return (
    <div className={`relative group ${className}`}>
      <Label
        htmlFor={id}
        className={`p-1 cursor-text transition-all duration-300 text-base absolute top-2 start-3 text-slate-400 group-focus-within:-top-4 group-focus-within:text-sm group-focus-within:text-indigo-500 group-focus-within:bg-slate-900 ${
          hasValue && "-top-4 text-sm text-indigo-600 bg-slate-900"
        }`}
      >
        {label}
      </Label>
      <Input
        className={`h-12 px-4 ${
          type === "number" &&
          "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        }`}
        type={type}
        id={id}
        name={name}
        {...formik.getFieldProps(name)}
      />
    </div>
  );
};

export default InputField;
