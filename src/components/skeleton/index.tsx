import styles from './skeleton.module.scss';

interface SkeletonProps {
  isInput?: boolean;
}

const Skeleton = ({ isInput = false }: SkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${isInput && styles['skeleton-input']}`}
    />
  );
};

export default Skeleton;
