import { Aside } from "../../components/Aside/Aside";
import styles from "./mainPage.module.scss";

export const MainPage = () => {
  return (
    <>
      <Aside />
      <main className={styles.main}>
        <p>Здесь пусто, нужно перейти по вкладке</p>
      </main>
    </>
  );
};
