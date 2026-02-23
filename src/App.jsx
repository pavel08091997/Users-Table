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
  const [filters, setFilters] = useState({
    lastName: "",
    firstName: "",
    maidenName: "",
    age: "",
    gender: "", 
    phone: "",
    email: "",
    city: "",
    country: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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
  const FiltredAndSorteredUsers = useMemo(() => {
    // 1. Фильтрация
    let result = users.filter((user) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        if (!filterValue) return true;

        let userValue;
        if (key === "city" || key === "country") {
          userValue = user.address?.[key] || "";
        } else {
          userValue = user[key];
        }

        const strValue = String(userValue).toLowerCase();
        const strFilter = String(filterValue).toLowerCase();

        if (key === "gender") {
          return strValue === strFilter; // точное совпадение
        }
        return strValue.includes(strFilter); // частичное совпадение
      });
    });

    
    if (sortConfig.key && sortConfig.change) {
      result = [...result].sort((a, b) => {
        
        const getValue = (obj, key) => {
          if (key === "city" || key === "country") {
            return obj.address?.[key] || "";
          }
          return obj[key];
        };

        const aValue = getValue(a, sortConfig.key);
        const bValue = getValue(b, sortConfig.key);

        if (sortConfig.key === "age") {
          return sortConfig.change === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        const compare = String(aValue).localeCompare(String(bValue));
        return sortConfig.change === "asc" ? compare : -compare;
      });
    }

    return result; 
  }, [users, filters, sortConfig]); 

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
          users={FiltredAndSorteredUsers}
          handleClickUser={handleClickUser}
          sortConfig={sortConfig}
          ChangeSort={ChangeSort}
          handleFilterChange={handleFilterChange}
          filters={filters}

        />
      )}
      {userModal && <UserModal userModal={userModal} closeModal={closeModal} />}
    </>
  );
}

export default App;
