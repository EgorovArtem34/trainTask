import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineComputer } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./aside.module.scss";
import { Button } from "../../ui/Button/Button";

export const Aside = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <aside className={styles.aside}>
      <Link to="/" className={styles.mainLink}>
        <AiOutlineHome className={styles.icon} />
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Button
              variant="toggleMenu"
              onClick={toggleDropdown}
              aria-label="открыть меню CMDB"
            >
              <MdOutlineComputer className={styles.computerIcon} />
              CMDB
            </Button>
            <ul className={`${styles.dropDownMenu} ${isDropdownVisible ? styles.show : ''}`}>
              <li>
                <Link to="/cmdb" className={styles.link}>Компьютеры и ПК</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
