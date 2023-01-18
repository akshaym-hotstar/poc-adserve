import { DialogProps } from "@mui/material";
import { useState } from "react";

export function useDialog(isOpened = false) {
  const [open, setOpen] = useState(isOpened);

  const handleOpen = () => setOpen(true);

  const handleClose = (evt: {}, reason?: "backdropClick" | "escapeKeyDown") =>
    setOpen(false);

  const handleToggle = () => setOpen((prev) => !prev);

  return {
    open,
    handleOpen,
    handleClose,
    handleToggle,
  };
}
