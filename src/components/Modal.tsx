import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { t } from "i18next";

interface ModleProps {
  open: boolean;
  closeModle: () => void;
  title: string;
  saveFunc: () => void;
  resetFunc: () => void;
  children: React.ReactNode;
}

const Modle = ({
  open,
  closeModle,
  title,
  saveFunc,
  resetFunc,
  children,
}: ModleProps) => {
  return (
    <Dialog open={open} onOpenChange={closeModle}>
      <DialogContent className=" overflow-auto max-h-[80vh]">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button
            type="reset"
            className="me-2"
            variant="destructive"
            onClick={resetFunc}
          >
            {t("common.reset")}
          </Button>
          <Button type="submit" onClick={saveFunc}>
            {t("common.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modle;
