import React, { FC, PropsWithChildren, useEffect } from "react";
import classes from "./style.module.scss";

type Props = {
  onClose: () => void;
  isOpen?: boolean;
};

const ImageModal: FC<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={classes["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={classes["modal"]}>{children}</div>
    </div>
  );
};

export { ImageModal };
