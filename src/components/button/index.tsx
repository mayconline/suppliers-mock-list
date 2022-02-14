import { memo } from 'react';
import { IconType } from 'react-icons';
import Loading from '../loading';
import styles from './button.module.scss';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: IconType;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  icon: Icon,
  children,
  disabled = false,
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={disabled} {...props}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {Icon && <Icon className={styles.icon} />}
            {children}
          </>
        )}
      </button>
    </div>
  );
};

export default memo(Button);
