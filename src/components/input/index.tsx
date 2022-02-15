import { memo } from 'react';
import { IconType } from 'react-icons';
import Skeleton from '../skeleton';
import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType;
  loading?: boolean;
}

const Input = ({ icon: Icon, name, loading = false, ...props }: InputProps) => {
  return (
    <div className={styles.container}>
      {Icon && (
        <label id={name} htmlFor={name} title={name}>
          <Icon />
        </label>
      )}
      {loading ? (
        <Skeleton isInput />
      ) : (
        <input id={name} aria-labelledby={name} name={name} {...props} />
      )}
    </div>
  );
};

export default memo(Input);
