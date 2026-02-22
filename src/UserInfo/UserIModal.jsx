import styles from './UserModal.module.css'
export const UserModal = ({ userModal, closeModal }) => {
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Дополнительная информация</h3>
            <button onClick={closeModal} className={styles.closeBtn}>
              &times;
            </button>
          </div>
          <div className={styles.modalBody}>
            <p>
              {" "}
              ФИО: {userModal.firstName} {userModal.lastName}{" "}
              {userModal.maidenName}
            </p>
            <p> Возраст: {userModal.age}</p>
            <p> Адрес: {userModal.address}</p>
            <p> Рост: {userModal.height}</p>
            <p> Вес: {userModal.weight}</p>
            <p> Рост: {userModal.phone}</p>
            <p> Рост: {userModal.email}</p>
            <img src={userModal.image} alt="аватар" />
          </div>
        </div>
      </div>
    </>
  );
};
