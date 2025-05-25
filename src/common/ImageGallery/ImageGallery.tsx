import React, { useState } from "react";
import classes from "./style.module.scss";
import { ImageModal } from "../components/ImageModal/ImageModal";
import CloseIcon from "@/assets/close.svg?react";

type Props = {
  images: string[];
};

const ImageGallery: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className={classes.gallery}>
        {images.map((src, index) => (
          <img
            key={index} // Используем индекс как ключ
            src={src}
            alt={`Image ${index + 1}`} // Генерируем alt автоматически
            onClick={() => openModal(src)}
          />
        ))}
      </div>
      {selectedImage && (
        <ImageModal onClose={closeModal}>
          <img
            className={classes.img}
            src={selectedImage}
            alt="Full-size preview"
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на изображение
          />
          <button className={classes["close-button"]} onClick={closeModal}>
            <CloseIcon width={24} height={24} />
          </button>
        </ImageModal>
      )}
    </>
  );
};

export default ImageGallery;
