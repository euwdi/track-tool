import React, { FC, PropsWithChildren } from "react";
import classes from "./style.module.scss";

type Props = {
  onClose: () => void;
  isOpen?: boolean;
};

const Modal: FC<PropsWithChildren<Props>> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={classes["modal"]}>
        {/* <button className={classes["close-button"]} onClick={onClose}>
          &times;
        </button> */}
        {children}
      </div>
    </div>
  );
};

export { Modal };
