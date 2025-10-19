import InputField from "../InputField";
import { FormikProps } from "formik";
import { formikMaterialsType } from "@/pages/RawMaterials";
import SelectField from "../SelectField";
import { useTranslation } from "react-i18next";

const MaterialForm = ({
  formik,
}: {
  formik: FormikProps<formikMaterialsType>;
}) => {
  const { t } = useTranslation();
  const tw = (key: string) => t(`inventory.materialsForm.${key}`);

  const measurementUnits = [
    "g",
    "kg",
    "t",
    "lb",
    "oz",

    "L",
    "m³",
    "fl oz",
    "gal",

    "pcs",
    "dz",
    "pk",
    "bag",
    "box",

    "m",
    "cm",
    "sht",
    "rl",
    "btl",
    "jar",
    "can",
  ];

  return (
    <form className="flex flex-col gap-6 my-4">
      <InputField
        id="name"
        label={tw("name")}
        name="name"
        type="text"
        formik={formik}
      />
      <InputField
        id="nameAr"
        label={tw("nameAr")}
        name="nameAr"
        type="text"
        formik={formik}
      />
      <div className="flex gap-6 w-full">
        <InputField
          id="quantity"
          label={tw("quantity")}
          name="quantity"
          type="number"
          className="w-1/2"
          formik={formik}
        />
        <InputField
          id="minStock"
          label={tw("minStock")}
          name="minStock"
          type="number"
          className="w-1/2"
          formik={formik}
        />
      </div>
      <SelectField
        id="unit"
        label={tw("unit")}
        name="unit"
        formik={formik}
        options={measurementUnits}
      />
      <InputField
        id="supplier"
        label={tw("supplier")}
        name={"supplier"}
        type="text"
        formik={formik}
      />
      <InputField
        id="supplierAr"
        label={tw("supplierAr")}
        name="supplierAr"
        type="text"
        formik={formik}
      />
      <div className="flex gap-6 w-full">
        <InputField
          id="price"
          label={tw("price")}
          name="price"
          type="number"
          className="w-1/2"
          formik={formik}
        />
        <InputField
          id="costPerUnit"
          label={tw("costPerUnit")}
          name="costPerUnit"
          type="number"
          disabled={true}
          className="w-1/2"
          formik={formik}
          value={
            (formik.values.price as number) / (formik.values.quantity as number)
          }
        />
      </div>
    </form>
  );
};

export default MaterialForm;
