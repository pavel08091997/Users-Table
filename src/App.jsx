import { useEffect, useState, useMemo } from "react";
import "./App.css";
import { UserModal } from "./UserInfo/UserIModal";
import { UserList } from "./UserList/UserList";
import { Loading } from "./UserList/loading";

function App() {
  const [userModal, setUserModal] = useState(null);
  const [setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, change: null });
  const [users, setUsers] = useState([]);

  const ChangeSort = (key) => {
    let change = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.change === "asc") {
        change = "desc";
      } else if (sortConfig.change === "desc") {
        change = null;
      }
    }
      setSortConfig({ key, change });
  };

 // eslint-disable-next-line react-hooks/exhaustive-deps
 const SorteredUsers = useMemo(() => {
    if (!sortConfig.key || !sortConfig.change) return users;

    return [...users].sort(
      (a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.key === "age") {
          return sortConfig.change === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        const comprare = String(aValue).localeCompare(String(bValue));
        return sortConfig.change === "asc" ? comprare : -comprare;
      },
      [ users, sortConfig],
    );
  });

  const handleClickUser = (user) => {
    setUserModal(user);
  };

  const closeModal = () => {
    setUserModal(null);
  };

  useEffect(() => {
    let monted = true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    const promisMonted = new Promise((resolve) => {
      setTimeout(() => {
        if (monted) resolve("timer");
      }, 1000);
    });

    const fetchPromise = fetch("https://dummyjson.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Данные получены");
        if (monted) setUsers(data.users);
      })
      .catch((error) => {
        if (monted) setError(error.message);
      });

    Promise.all([promisMonted, fetchPromise]).finally(() => {
      if (monted) setLoading(false);
    });

    return () => {
      monted = false;
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <UserList
          users={SorteredUsers}
          handleClickUser={handleClickUser}
          sortConfig={sortConfig}
          ChangeSort={ChangeSort}
        />
      )}
      {userModal && <UserModal userModal={userModal} closeModal={closeModal} />}
    </>
  );
}

export default App;
