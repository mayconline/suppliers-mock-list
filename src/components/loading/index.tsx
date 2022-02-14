import { memo } from 'react';
import styles from './loading.module.scss';

const Loading = () => {
  return <span className={styles.loading} />;
};

export default memo(Loading);
