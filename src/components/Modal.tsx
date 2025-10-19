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

interface ModalProps {
  open: boolean;
  closeModal: () => void;
  title: string;
  saveFunc: () => void;
  resetFunc: () => void;
  children: React.ReactNode;
}

const Modal = ({
  open,
  closeModal,
  title,
  saveFunc,
  resetFunc,
  children,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={closeModal}>
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

export default Modal;
