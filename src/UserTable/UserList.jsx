import { UserItem } from "./UserItem";
import styles from './UserList.module.css'


export const UserList = ({ dataUser = [] }) => {

const columns = ['Фамилия', 'Имя', 'Отчество', 'Возраст', 'Пол', 'Email', 'Телефон', 'Страна', 'Город'];


  return (
    <div className={styles.UserList}>
      <div className={styles.headerRow}>
      {columns.map((col,index) => <div key={index} className={styles.headerCell}>{col}</div>)}
      </div>
      {dataUser.map((user) => (
        <UserItem key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          maidenName={user.maidenName}
          age={user.age}
          gender={user.gender}
          email={user.email}
          phone={user.phone}
          city={user.address.city}
          country={user.address.country}
        />
      ))}
    </div>
  );
};
