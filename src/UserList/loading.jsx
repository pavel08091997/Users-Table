import styles from './loading.module.css'

export const Loading = () => {
  return (
    <div className={styles.loader}>
      <p>Идёт загрузка...</p>
    </div>
  );
};

