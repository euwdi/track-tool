import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

interface Option {
  label: string;
  value: string;
  avatar?: string;
}

interface DropdownProps {
  options: Option[];
  onSelect?: (option: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">(
    "down"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = (): void => {
    if (!isOpen) {
      calculateDropdownDirection();
    }
    setIsOpen(!isOpen);
  };

  const calculateDropdownDirection = () => {
    if (buttonRef.current && listRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const listHeight = listRef.current.offsetHeight;

      if (spaceBelow < listHeight && spaceAbove > spaceBelow) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection("down");
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: Option): void => {
    setSelectedOption(option.label);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculateDropdownDirection();
      }
    };

    if (isOpen) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const lplaceholder = placeholder || "Выберите опцию";

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button ref={buttonRef} onClick={toggleDropdown}>
        {selectedOption || lplaceholder}
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          className={`${styles.list} ${
            dropdownDirection === "up" ? styles.up : ""
          }`}
        >
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
