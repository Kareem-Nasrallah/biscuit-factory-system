import InputField from "../InputField";
import { FormikProps } from "formik";
import { formikMaterialsType } from "@/pages/RawMaterials";

const MaterialForm = ({
  formik,
}: {
  formik: FormikProps<formikMaterialsType>;
}) => {
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
      <div className="flex gap-6 w-full">
        <InputField
          id="quantity"
          label="Quantity"
          name="quantity"
          type="number"
          className="w-1/2"
          formik={formik}
        />
        <InputField
          id="minStock"
          label="Min Stock"
          name="minStock"
          type="number"
          className="w-1/2"
          formik={formik}
        />
      </div>
      <InputField
        id="unit"
        label="Unit"
        name="unit"
        type="text"
        formik={formik}
      />
      <InputField
        id="supplier"
        label="Supplier by English"
        name="supplier"
        type="text"
        formik={formik}
      />
      <InputField
        id="supplierAr"
        label="Supplier by Arabic"
        name="supplierAr"
        type="text"
        formik={formik}
      />
      <div className="flex gap-6 w-full">
        <InputField
          id="price"
          label="Price"
          name="price"
          type="number"
          className="w-1/2"
          formik={formik}
        />
        <InputField
          id="costPerUnit"
          label="Cost Per Unit"
          name="costPerUnit"
          type="number"
          className="w-1/2"
          formik={formik}
        />
      </div>
    </form>
  );
};

export default MaterialForm;
