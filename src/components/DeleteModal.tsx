import React, { Dispatch, SetStateAction } from "react";
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
}

const DeleteModal = ({ open, closeModal, title, saveFunc }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        are you sure you want to delete this Item
        <DialogFooter>
          <Button onClick={closeModal} className="me-2">
            {t("common.cancel")}
          </Button>
          <Button type="submit" onClick={saveFunc} variant="destructive">
            {t("common.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
