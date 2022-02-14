import styles from './header.module.scss';
import { FaClipboardList, FaMoon, FaSignOutAlt, FaSun } from 'react-icons/fa';
import Button from '../button';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import { memo } from 'react';

const Header = () => {
  const { theme, handleToggleTheme } = useTheme();
  const { handleLogout } = useAuth();

  return (
    <header className={styles.container}>
      <main className={styles.row}>
        <FaClipboardList className={styles.icon} title="suppliers logo" />
        <h1>Mock Suppliers</h1>
      </main>
      <aside className={styles.row}>
        <Button
          icon={theme === 'LIGHT' ? FaMoon : FaSun}
          onClick={handleToggleTheme}
        >
          Theme
        </Button>

        <Button icon={FaSignOutAlt} onClick={handleLogout}>
          Sign Out
        </Button>
      </aside>
    </header>
  );
};

export default memo(Header);
