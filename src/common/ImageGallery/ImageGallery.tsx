import React, { useState } from "react";
import classes from "./style.module.scss";
import { Modal } from "../components/Modal/Modal";

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
    <div className={classes.gallery}>
      <div className={classes.previewContainer}>
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
        <Modal isOpen={!!selectedImage} onClose={closeModal}>
          <div
            className={classes.fullContainer} // Контейнер для модального окна
            onClick={closeModal} // Закрытие по клику на фон
          >
            <img
              src={selectedImage}
              alt="Full-size preview"
              onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на изображение
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageGallery;
