import styles from "./header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "../link/link";

export function Header() {

  const icons = {
    burger: {
      normal: <BurgerIcon type="primary" />,
      inactive: <BurgerIcon type="secondary" />,
    },
    list: {
      normal: <ListIcon type="primary" />,
      inactive: <ListIcon type="secondary" />
    },
    profile: {
      normal: <ProfileIcon type="primary" />,
      inactive: <ProfileIcon type="secondary" />
    }
  }

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul className={styles.list}>

            <li className={styles.listItem}>
              <Link link="#" addStyle={'text_type_main-default'} image={ icons.burger.normal }>Конструктор</Link>
            </li>

            <li className={styles.listItem}>
              <Link link="#" addStyle={'text_type_main-default text_color_inactive'} image={ icons.list.inactive }>Лента заказов</Link>
            </li>

            <li className={styles.listItem}>
              <Link link="#" addStyle={'text_type_main-default text_color_inactive'} image={ icons.profile.inactive }>Личный кабинет</Link>
            </li>

          </ul>
        </nav>

        <div className={styles.logo}>
          <Logo />
        </div>
      </div>
    </header>
  );
}
