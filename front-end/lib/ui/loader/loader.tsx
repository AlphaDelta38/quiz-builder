import { LoaderCircle } from 'lucide-react';
import styles from './index.module.scss';

function InfiniteLoader() {
  return (
    <div className={styles.loader}>
      <LoaderCircle className={styles.spin} />
    </div>
  );
}

export default InfiniteLoader;
