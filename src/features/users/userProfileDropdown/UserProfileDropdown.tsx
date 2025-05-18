import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import { useUserStore } from "@/stores/userStore";
import { Routes } from "@/router/router";
import { useNavigate } from "react-router";
import { formatFullName } from "../utils";

const UserProfileDropdown: React.FC = () => {
  const { profile, logout } = useUserStore();
  const navigator = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onLogout = () => {
    navigator(`/${Routes.LOGIN}`);
    logout();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.profileButton} onClick={toggleDropdown}>
        <img className={styles.actionIcon} src="../images.jpg" />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} ref={dropdownRef}>
          <div className={styles.profileInfo}>
            <div className={styles.userMainInfo}>
              <div className={styles.spec}>
                {formatFullName({
                  lastName: profile.lastName,
                  firstName: profile.firstName,
                  middleName: profile.middleName,
                })}
              </div>

              <span className={styles.roles}>{profile.roleName}</span>
            </div>

            <button
              className={`${styles.menuItem} ${styles.exit}`}
              onClick={onLogout}
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
