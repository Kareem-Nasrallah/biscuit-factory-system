import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, Plus, UserCheck, UserX, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Modal from "@/components/Modal";
import useModalControl from "@/hooks/useModalControl";
import {
  addEmployee,
  deleteEmployee,
  Employee,
  updateEmployee,
} from "@/store/slices/employeesSlice";
import EmployeesForm from "@/components/forms/EmployeesForm";
import { useFormik } from "formik";
import DeleteModal from "@/components/DeleteModal";
import { employeesSchema } from "../validations/schemas/employeesSchema";

export interface formikEmployeesType {
  name: string;
  nameAr: string;
  role: "Owner" | "Supervisor" | "Worker";
  shift: "Morning" | "Evening" | "Night";
  department: string;
  departmentAr: string;
  phone: string;
  email: string;
  attendance: "Present" | "Absent";
}

const Employees = () => {
  const { t, i18n } = useTranslation();
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [operationType, setOperationType] = useState<"creat" | "update">();

  const dispatch = useDispatch();

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.nameAr.includes(searchTerm)
  );

  const {
    open,
    selectedItem,
    setOpen,
    setSelectedItem,
    closeModal,
    openDeleteModal,
    setopenDeleteModal,
  } = useModalControl<Employee>();

  const getShiftEmployees = (shift: string) =>
    filteredEmployees.filter((emp) => emp.shift === shift);

  const date = new Date();
  const now = date.toLocaleString();

  const formik = useFormik<formikEmployeesType>({
    initialValues: {
      name: selectedItem?.name ?? "",
      nameAr: selectedItem?.nameAr ?? "",
      role: (selectedItem?.role ?? "") as "Owner" | "Supervisor" | "Worker",
      shift: (selectedItem?.shift ?? "") as "Morning" | "Evening" | "Night",
      department: selectedItem?.department ?? "",
      departmentAr: selectedItem?.departmentAr ?? "",
      phone: selectedItem?.phone ?? "",
      email: selectedItem?.email ?? "",
      attendance: (selectedItem?.attendance ?? "") as "Present" | "Absent",
    },
    validationSchema: employeesSchema,
    enableReinitialize: true,
    onSubmit: (values, formikHelpers) => {
      if (operationType === "creat") {
        dispatch(
          addEmployee({
            id: `${values.name}-${now}`,
            name: values.name,
            nameAr: values.nameAr,
            role: values.role,
            shift: values.shift,
            department: values.department,
            departmentAr: values.departmentAr,
            phone: values.phone,
            email: values.email,
            hireDate: now,
            lastUpdated: null,
            attendance: values.attendance,
          })
        );
      } else {
        dispatch(
          updateEmployee({
            id: selectedItem?.id,
            name: values.name,
            nameAr: values.nameAr,
            role: values.role,
            shift: values.shift,
            department: values.department,
            departmentAr: values.departmentAr,
            phone: values.phone,
            email: values.email,
            hireDate: selectedItem?.hireDate,
            lastUpdated: now,
            attendance: values.attendance,
          })
        );
      }
      setOpen(false);
      formikHelpers.resetForm();
    },
  });

  const deleteEmployeeFun = () => {
    setopenDeleteModal(false);
    dispatch(deleteEmployee(selectedItem?.id));
    setSelectedItem(null);
  };

  const getAttendanceBadge = (attendance: string) => {
    if (attendance === "Present") {
      return (
        <Badge variant="outline" className="border-success text-success gap-1">
          <UserCheck className="h-3 w-3" />
          {t("employees.present")}
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="border-destructive text-destructive gap-1"
      >
        <UserX className="h-3 w-3" />
        {t("employees.absent")}
      </Badge>
    );
  };

  const EmployeeTable = ({
    employees,
  }: {
    employees: typeof filteredEmployees;
  }) => (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("employees.name")}</TableHead>
            <TableHead>{t("employees.role")}</TableHead>
            <TableHead>{t("employees.department")}</TableHead>
            <TableHead>{t("employees.attendance")}</TableHead>
            <TableHead className="w-32 text-center">
              {t("common.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                {t("common.noData")}
              </TableCell>
            </TableRow>
          ) : (
            employees.map((emp) => (
              <TableRow key={emp.id} className="hover:bg-primary/30">
                <TableCell className="font-medium">
                  {i18n.language === "ar" ? emp.nameAr : emp.name}
                </TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>
                  {i18n.language === "ar" ? emp.departmentAr : emp.department}
                </TableCell>
                <TableCell>{getAttendanceBadge(emp.attendance)}</TableCell>
                <TableCell>
                  <div className="flex justify-start gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setOperationType("update");
                        setSelectedItem(emp);
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedItem(emp);
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
  );

  return (
    <DashboardLayout>
      <DeleteModal
        open={openDeleteModal}
        closeModal={() => setopenDeleteModal(false)}
        title="Delete"
        saveFunc={deleteEmployeeFun}
      />
      <Modal
        open={open}
        closeModal={() => {
          closeModal();
          formik.setErrors({});
        }}
        title={
          operationType === "creat" ? t("employees.addEmployee") : "update"
        }
        saveFunc={formik.handleSubmit}
        resetFunc={formik.resetForm}
      >
        <EmployeesForm formik={formik} />
      </Modal>
      <div className="space-y-6">
        <div className="flex flex-col xs:flex-row gap-4 items-start xs:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t("employees.title")}</h1>
            <p className="text-muted-foreground">
              {t("employees.description")}
            </p>
          </div>
          <Button
            className="gap-2 w-full xs:w-auto"
            onClick={() => {
              setOpen(true);
              setOperationType("creat");
            }}
          >
            <Plus className="h-4 w-4" />
            {t("employees.addEmployee")}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t("common.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ps-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="flex gap-1 justify-evenly overflow-x-auto overflow-y-hidden scrollbar-hide">
                <TabsTrigger className="flex-1 px-4" value="all">All Employees</TabsTrigger>
                <TabsTrigger className="flex-1 px-4" value="morning">
                  {t("employees.morning")}
                </TabsTrigger>
                <TabsTrigger className="flex-1 px-4" value="evening">
                  {t("employees.evening")}
                </TabsTrigger>
                <TabsTrigger className="flex-1 px-4" value="night">{t("employees.night")}</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <EmployeeTable employees={filteredEmployees} />
              </TabsContent>
              <TabsContent value="morning">
                <EmployeeTable employees={getShiftEmployees("Morning")} />
              </TabsContent>
              <TabsContent value="evening">
                <EmployeeTable employees={getShiftEmployees("Evening")} />
              </TabsContent>
              <TabsContent value="night">
                <EmployeeTable employees={getShiftEmployees("Night")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
