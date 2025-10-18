import InputField from "../InputField";
import { FormikProps } from "formik";
import { formikEmployeesType } from "@/pages/Employees";
import SelectField from "../SelectField";

const EmployeesForm = ({
  formik,
}: {
  formik: FormikProps<formikEmployeesType>;
}) => {
  const roleOptions = ["Owner", "Supervisor", "Worker"];
  const shiftOptions = ["Morning", "Evening", "Night"];
  const attendanceOptions = ["Present", "Absent"];
  return (
    <form className="flex flex-col gap-6 my-4">
      <InputField
        id="name"
        label="English Name"
        name="name"
        type="text"
        formik={formik}
      />
      <InputField
        id="nameAr"
        label="Arabic Name"
        name="nameAr"
        type="text"
        formik={formik}
      />
      <div className="flex gap-6">
        <InputField
          id="department"
          label="Department By English"
          name="department"
          type="text"
          className="w-1/2"
          formik={formik}
        />
        <InputField
          id="departmentAr"
          label="Department By Arabic"
          name="departmentAr"
          type="text"
          className="w-1/2"
          formik={formik}
        />
      </div>
      <InputField
        id="phone"
        label="Phone Number"
        name="phone"
        type="text"
        formik={formik}
      />
      <InputField
        id="email"
        label="Email"
        name="email"
        type="text"
        formik={formik}
      />
      <SelectField
        id="role"
        label="Employee's Role"
        name="role"
        formik={formik}
        options={roleOptions}
      />
      <SelectField
        id="shift"
        label="Employee's shift"
        name="shift"
        formik={formik}
        options={shiftOptions}
      />
      <SelectField
        id="attendance"
        label="Employee's attendance today"
        name="attendance"
        formik={formik}
        options={attendanceOptions}
      />
    </form>
  );
};

export default EmployeesForm;
