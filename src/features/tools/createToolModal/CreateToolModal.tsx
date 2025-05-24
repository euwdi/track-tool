import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { useToolsStore } from "@/stores/toolsStore";
import { PickStorageIdComponent } from "@/common/PickStorageIdComponent/PickStorageIdComponent";
import { useNotifications } from "@/stores/notificationsStore";
import Dropdown from "@/common/components/DropDown/Dropdown";
import { Modal } from "@/common/components/Modal/Modal";
import EditSpecList from "@/common/EditSpecList/EditSpecList";
import { photosService } from "@/network/photosService";

type Props = {
  onCloseModal: () => void;
};

type UploadedPhoto = {
  id: string;
  url: string;
  file: File;
};

const CreateToolModal: FC<Props> = ({ onCloseModal }) => {
  const { addNotification } = useNotifications();
  const { types, getToolTypes, createTool, createToolType } = useToolsStore();

  const onClickCreateTool = () => {
    if (!name || !storageId) {
      addNotification({
        message: "Задайте имя и выберите склад",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    if (!type) {
      addNotification({
        message: "Выберите тип инструмента",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    createTool({ name, description, typeId: type, storageId })
      .then(() => {
        addNotification({
          message: `Инструмент успешно создан`,
          type: "success",
          duration: 3000,
        });
        onCloseModal();
      })
      .catch((e) => {
        addNotification({
          message: `Ошибка при создании инструмента: ${e.message}`,
          type: "error",
          duration: 3000,
        });
      });
    onCloseModal();
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [storageId, setStorageId] = useState("");

  const [openSpecsModal, setOpenSpecsModal] = useState<"type" | "">("");

  useEffect(() => {
    getToolTypes();
  }, [getToolTypes]);

  const options = useMemo(() => {
    return types.map((type) => {
      return {
        label: type.description,
        value: type.id,
      };
    });
  }, [types]);

  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (files.length + photos.length > 5) {
      addNotification({
        message: "Максимальное кол-во фотографий - 5",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    setIsUploading(true);
    try {
      const newPhotos: UploadedPhoto[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const response = await photosService.postPhoto({ photo: file });

        newPhotos.push({
          id: response.photoId,
          url: URL.createObjectURL(file),
          file,
        });
      }

      setPhotos([...photos, ...newPhotos]);
      addNotification({
        message: "Фотографии успешно загружены",
        type: "success",
        duration: 3000,
      });
    } catch (e) {
      addNotification({
        message: `Ошибка при загрузке фотографий: ${e.message}`,
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoDelete = async (photoId: string) => {
    try {
      await photosService.deletePhotoById({ photoId });
      setPhotos(photos.filter((photo) => photo.id !== photoId));
      if (currentPhotoIndex >= photos.length - 1) {
        setCurrentPhotoIndex(Math.max(0, photos.length - 2));
      }
      addNotification({
        message: "Фотография удалена",
        type: "success",
        duration: 3000,
      });
    } catch (e) {
      addNotification({
        message: `Ошибка при загрузке фотографий: ${e.message}`,
        type: "error",
        duration: 3000,
      });
    }
  };

  const onCancel = () => {
    photos.map((photo) => handlePhotoDelete(photo.id));
    onCloseModal();
  };

  return (
    <div className={classes.container}>
      <span className={classes.title}>Добавление оборудования</span>
      <div className={classes.specItem}>
        Название оборудования*
        <Input
          placeholder="Введите название"
          inputType="outline"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Описание оборудования
        <Input
          placeholder="Введите описание"
          inputType="outline"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Тип инструмента*
        <Dropdown
          options={options}
          placeholder="Выберите тип"
          onSelect={(typeId) => {
            setType(typeId);
          }}
          onClickEdit={() => {
            setOpenSpecsModal("type");
          }}
        />
      </div>

      <div className={classes.specItem}>
        Местоположение*
        <PickStorageIdComponent onChange={setStorageId} />
      </div>

      <Modal
        isOpen={!!openSpecsModal}
        onClose={() => {
          setOpenSpecsModal("");
        }}
      >
        <EditSpecList
          title={"Типы инструментов"}
          onAdd={({ name }: { name: string }) => {
            createToolType({ name });
          }}
          onRefresh={getToolTypes}
          items={types.map((type) => {
            return {
              name: type.description,
              id: type.id,
            };
          })}
          onEdit={function ({ id, name }: { id: string; name: string }): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Modal>

      <div className={classes.specItem}>
        Фотографии оборудования
        <div className={classes.photoUploader}>
          {photos.length > 0 ? (
            <div className={classes.photoViewer}>
              <div className={classes.photoCounter}>
                {currentPhotoIndex + 1} / {photos.length}
              </div>
              <img
                src={photos[currentPhotoIndex].url}
                alt="Оборудование"
                className={classes.photo}
              />
              <div className={classes.photoControls}>
                <button
                  onClick={() =>
                    setCurrentPhotoIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentPhotoIndex === 0}
                >
                  &lt;
                </button>
                <button
                  onClick={() =>
                    setCurrentPhotoIndex((prev) =>
                      Math.min(photos.length - 1, prev + 1)
                    )
                  }
                  disabled={currentPhotoIndex === photos.length - 1}
                >
                  &gt;
                </button>
              </div>
              <button
                className={classes.deletePhotoButton}
                onClick={() => handlePhotoDelete(photos[currentPhotoIndex].id)}
              >
                Удалить
              </button>
            </div>
          ) : (
            <div className={classes.photoPlaceholder}>
              Нет загруженных фотографий
            </div>
          )}

          <label className={classes.uploadButton}>
            {isUploading ? "Загрузка..." : "Загрузить фотографии"}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handlePhotoUpload(e.target.files)}
              style={{ display: "none" }}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      <div className={classes.row}>
        <Button fullWidth onClick={onCancel} variant="outline">
          Отменить
        </Button>

        <Button
          fullWidth
          onClick={() => {
            onClickCreateTool();
          }}
        >
          Создать
        </Button>
      </div>
    </div>
  );
};

export { CreateToolModal };
