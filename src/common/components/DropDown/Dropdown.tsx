import React, { useState } from "react";
import styles from "./style.module.scss";

interface Option {
  label: string;
  value: string;
  avatar?: string;
}

// Определяем типы для props
interface DropdownProps {
  options: Option[]; // Массив строк для опций
  onSelect?: (option: string) => void; // Callback-функция при выборе опции
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder,
}) => {
  // Состояния
  const [isOpen, setIsOpen] = useState<boolean>(false); // Открыт/закрыт выпадающий список
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Выбранная опция

  // Обработчик открытия/закрытия выпадающего списка
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  // Обработчик выбора опции
  const handleOptionClick = (option: Option): void => {
    setSelectedOption(option.label); // Устанавливаем выбранную опцию
    setIsOpen(false); // Закрываем выпадающий список
    if (onSelect) onSelect(option.value); // Вызываем callback, если он передан
  };

  const lplaceholder = placeholder || "Выберите опцию";

  return (
    <div className={styles.dropdown}>
      {/* Кнопка для открытия/закрытия */}
      <button onClick={toggleDropdown}>
        {selectedOption || lplaceholder}
      </button>

      {/* Список опций */}
      {isOpen && (
        <ul>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
