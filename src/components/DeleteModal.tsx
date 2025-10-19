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

interface ModleProps {
  open: boolean;
  closeModle: () => void;
  title: string;
  saveFunc: () => void;
}

const DeleteModal = ({ open, closeModle, title, saveFunc }: ModleProps) => {
  return (
    <Dialog open={open} onOpenChange={closeModle}>
      <DialogContent>
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        are you sure you want to delete this Item
        <DialogFooter>
          <Button onClick={closeModle} className="me-2">{t("common.cancel")}</Button>
          <Button type="submit" onClick={saveFunc} variant="destructive">
            {t("common.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
