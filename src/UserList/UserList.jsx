import { UserItem } from "./UserItem";
import styles from "./UserList.module.css";

export const UserList = ({
  users = [],
  handleClickUser,
  sortConfig,
  ChangeSort,
}) => {
  const columns = [
    { key: "lastName", label: "Фамилия" },
    { key: "firstName", label: "Имя" },
    { key: "maidenName", label: "Отчество" },
    { key: "age", label: "Возраст" },
    { key: "gender", label: "Пол" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Телефон" },
    { key: "city", label: "Город" },
    { key: "country", label: "Страна" },
  ];

  const SortIcon = (key) => {
    if (key === "email") return " ";
    if (key === "country") return "";
    if (key === "city") return " ";
    if (sortConfig.key !== key) return "↕️";
    if (sortConfig.change === "asc") return "↑";
    if (sortConfig.change === "desc") return "↓";
    return "↕️";
  };

  return (
    <div className={styles.UserList}>
      <div className={styles.headerRow}>
        {columns.map((col) => (
          <div
            key={col.key}
            className={styles.headerCell}
            onClick={() => {
              if (col.key !== "email") {
                ChangeSort(col.key);
              }
            }}
          >
            {col.label} {SortIcon(col.key)}
          </div>
        ))}
      </div>
      {users.map((user) => (
        <UserItem
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          maidenName={user.maidenName}
          age={user.age}
          gender={user.gender}
          email={user.email}
          phone={user.phone}
          city={user.address.city}
          country={user.address.country}
          address={user.address.address}
          image={user.image}
          height={user.height}
          weight={user.weight}
          handleClickUser={handleClickUser}
        />
      ))}
    </div>
  );
};
