import { useState } from "react";

function useModalControl<itemType>() {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<itemType | null>(null);

  const closeModal = () => {
    setSelectedItem(null);
    setOpen(false);
  };
  return {
    open,
    setOpen,
    openDeleteModal,
    setopenDeleteModal,
    selectedItem,
    setSelectedItem,
    closeModal,
  };
}

export default useModalControl;
