import InputField from "../InputField";
import { FormikProps } from "formik";
import { formikEmployeesType } from "@/pages/Employees";
import SelectField from "../SelectField";
import { useTranslation } from "react-i18next";

const EmployeesForm = ({
  formik,
}: {
  formik: FormikProps<formikEmployeesType>;
}) => {
  const { t } = useTranslation();
  const tw = (key: string) => t(`employees.employeesForm.${key}`);

  const roleOptions = [
    { label: tw("roles.Owner"), value: "Owner" },
    { label: tw("roles.Supervisor"), value: "Supervisor" },
    { label: tw("roles.Worker"), value: "Worker" },
  ];
  const shiftOptions = [
    { label: tw("shifts.Evening"), value: "Evening" },
    { label: tw("shifts.Morning"), value: "Morning" },
    { label: tw("shifts.Night"), value: "Night" },
  ];
  const attendanceOptions = [
    { label: tw("attendanceOptions.Absent"), value: "Absent" },
    { label: tw("attendanceOptions.Present"), value: "Present" },
  ];
  return (
    <form className="flex flex-col gap-6 my-4">
      <InputField
        id="name"
        label={tw("fields.name")}
        name="name"
        type="text"
        formik={formik}
      />
      <InputField
        id="nameAr"
        label={tw("fields.nameAr")}
        name="nameAr"
        type="text"
        formik={formik}
      />
      <div className="flex gap-6">
        <InputField
          id="department"
          label={tw("fields.department")}
          name="department"
          type="text"
          className="w-1/2"
          formik={formik}
        />
        <InputField
          id="departmentAr"
          label={tw("fields.departmentAr")}
          name="departmentAr"
          type="text"
          className="w-1/2"
          formik={formik}
        />
      </div>
      <InputField
        id="phone"
        label={tw("fields.phone")}
        name="phone"
        type="text"
        formik={formik}
      />
      <InputField
        id="email"
        label={tw("fields.email")}
        name="email"
        type="text"
        formik={formik}
      />
      <SelectField
        id="role"
        label={tw("fields.role")}
        name="role"
        formik={formik}
        options={roleOptions}
      />
      <SelectField
        id="shift"
        label={tw("fields.shift")}
        name="shift"
        formik={formik}
        options={shiftOptions}
      />
      <SelectField
        id="attendance"
        label={tw("fields.attendance")}
        name="attendance"
        formik={formik}
        options={attendanceOptions}
      />
    </form>
  );
};

export default EmployeesForm;
