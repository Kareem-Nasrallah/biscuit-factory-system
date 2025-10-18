import React, { useRef, useState } from "react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "./ui/select";
import { FormikProps } from "formik";
import { Label } from "./ui/label";

interface SelectFieldProp {
  id: string;
  name: string;
  formik: FormikProps<any>;
  label: string;
  options: ({ value: string; label: string } | string)[];
  className?: string;
}
const SelectField = ({
  id,
  name,
  formik,
  label,
  className,
  options,
}: SelectFieldProp) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const value = formik.values[name];
  const hasValue = value !== "" && value !== null && value !== undefined;

  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => {
        formik.setFieldValue(name, value);
        setIsFocused(false);
      }}
      onOpenChange={(open) => {
        setIsFocused(open);
        if (!open) formik.setFieldTouched(name, true);
      }}
    >
      <SelectGroup className="relative group">
        <label
          htmlFor={id}
          onClick={() => triggerRef.current?.click()}
          className={`p-1 transition-all duration-300 absolute start-3 ${
            hasValue || isFocused ? "-top-4 text-sm bg-slate-900" : "top-2"
          } ${
            isFocused
              ? "text-indigo-500"
              : hasValue
              ? "text-indigo-600"
              : "text-slate-400"
          }`}
        >
          {label}
        </label>
        <SelectTrigger
          ref={triggerRef}
          id={id}
          className={`h-12 px-4 ${
            isFocused ? `outline-none ring-2 ring-ring ring-offset-2` : ""
          } ${className}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) =>
            typeof option === "string" ? (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ) : (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default SelectField;
