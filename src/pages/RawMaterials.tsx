import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import Modle from "@/components/Modal";
import MaterialForm from "@/components/forms/MaterialForm";
import { useFormik } from "formik";
import {
  addMaterial,
  deleteMaterial,
  RawMaterial,
  updateMaterial,
} from "@/store/slices/rawMaterialsSlice";
import useModalControl from "@/hooks/useModalControl";
import DeleteModal from "@/components/DeleteModal";
import { rawMaterialsSchema } from "@/validations/schemas/rawMaterialsSchema";

export interface formikMaterialsType {
  name: string;
  nameAr: string;
  quantity: string | number;
  minStock: string | number;
  unit: string;
  supplier: string;
  supplierAr: string;
  costPerUnit: string | number;
  price: string | number;
}

const RawMaterials = () => {
  const { t, i18n } = useTranslation();
  const materials = useSelector(
    (state: RootState) => state.rawMaterials.materials
  );
  const {
    open,
    selectedItem,
    setOpen,
    setSelectedItem,
    closeModle,
    openDeleteModal,
    setopenDeleteModal,
  } = useModalControl<RawMaterial>();

  const [searchTerm, setSearchTerm] = useState("");
  const [operationType, setOperationType] = useState<"creat" | "update">();

  const dispatch = useDispatch();

  const filteredMaterials = materials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.nameAr.includes(searchTerm)
  );

  const isLowStock = (material: (typeof materials)[0]) =>
    material.quantity < material.minStock;

  const date = new Date();
  const now = date.toLocaleString();

  const formik = useFormik<formikMaterialsType>({
    initialValues: {
      name: selectedItem?.name ?? "",
      nameAr: selectedItem?.nameAr ?? "",
      quantity: selectedItem?.quantity ?? "",
      minStock: selectedItem?.minStock ?? "",
      unit: selectedItem?.unit ?? "",
      supplier: selectedItem?.supplier ?? "",
      supplierAr: selectedItem?.supplierAr ?? "",
      costPerUnit: selectedItem?.costPerUnit ?? "",
      price: selectedItem?.price ?? "",
    },
    validationSchema: rawMaterialsSchema,
    enableReinitialize: true,
    onSubmit(values, formikHelpers) {
      if (operationType === "creat") {
        dispatch(
          addMaterial({
            id: `${values.name}-${now}`,
            name: values.name,
            nameAr: values.nameAr,
            quantity: values.quantity as number,
            minStock: values.minStock as number,
            unit: values.unit,
            supplier: values.supplier,
            supplierAr: values.supplierAr,
            price: values.price as number,
            costPerUnit: (values.price as number) / (values.quantity as number),
            createdAt: `${now}`,
            lastUpdated: "",
          })
        );
      } else {
        dispatch(
          updateMaterial({
            id: selectedItem.id,
            name: values.name,
            nameAr: values.nameAr,
            quantity: values.quantity as number,
            minStock: values.minStock as number,
            unit: values.unit,
            supplier: values.supplier,
            supplierAr: values.supplierAr,
            costPerUnit: values.costPerUnit as number,
            price: values.price as number,
            createdAt: selectedItem.createdAt,
            lastUpdated: `${now}`,
          })
        );
      }
      setOpen(false);
      formikHelpers.resetForm();
    },
  });

  const DeleteMaterial = () => {
    setopenDeleteModal(false);
    dispatch(deleteMaterial(selectedItem.id));
    setSelectedItem(null);
  };

  return (
    <DashboardLayout>
      <DeleteModal
        open={openDeleteModal}
        closeModle={() => setopenDeleteModal(false)}
        title="Delete"
        saveFunc={DeleteMaterial}
      />
      <Modle
        open={open}
        closeModle={closeModle}
        title={
          operationType === "creat"
            ? t("inventory.addMaterial")
            : t("inventory.materialsForm.updateMaterial")
        }
        saveFunc={formik.handleSubmit}
        resetFunc={formik.resetForm}
      >
        <MaterialForm formik={formik} />
      </Modle>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t("inventory.title")}</h1>
            <p className="text-muted-foreground">
              {t("inventory.description")}
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => {
              setSelectedItem(null);
              setOpen(true);
              setOperationType("creat");
            }}
          >
            <Plus className="h-4 w-4" />
            {t("inventory.addMaterial")}
          </Button>
        </div>

        {/* Low Stock Alert */}
        {materials.some(isLowStock) && (
          <Card className="border-l-4 border-l-warning bg-warning/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <CardTitle className="text-warning">
                  {t("inventory.lowStockAlert")}
                </CardTitle>
              </div>
              <CardDescription>
                {materials.filter(isLowStock).length} items need restocking
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t("common.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("inventory.name")}</TableHead>
                    <TableHead>{t("inventory.quantity")}</TableHead>
                    <TableHead>{t("inventory.minStock")}</TableHead>
                    <TableHead>{t("inventory.supplier")}</TableHead>
                    <TableHead>{t("inventory.status")}</TableHead>
                    <TableHead className="w-32 text-center">
                      {t("common.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        {t("common.noData")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMaterials.map((material) => (
                      <TableRow
                        key={material.id}
                        className="hover:bg-primary/10"
                      >
                        <TableCell className="font-medium">
                          {i18n.language === "ar"
                            ? material.nameAr
                            : material.name}
                        </TableCell>
                        <TableCell>
                          {material.quantity?.toLocaleString()} {material.unit}
                        </TableCell>
                        <TableCell>
                          {material.minStock?.toLocaleString()} {material.unit}
                        </TableCell>
                        <TableCell>
                          {i18n.language === "ar"
                            ? material.supplierAr
                            : material.supplier}
                        </TableCell>
                        <TableCell>
                          {isLowStock(material) ? (
                            <Badge
                              variant="outline"
                              className="border-warning text-warning"
                            >
                              {t("inventory.low")}
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-success text-success"
                            >
                              {t("inventory.normal")}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setOperationType("update");
                                setSelectedItem(material);
                                setOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedItem(material);
                                setopenDeleteModal(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RawMaterials;
