import { useEffect, useState } from "react";
import "./App.css";
import { UserModal } from "./UserInfo/UserIModal";
import { UserList } from "./UserList/UserList";
import { Loading } from "./UserList/loading";

function App() {
  const [dataUser, setUserData] = useState([]);
  const [userModal, setUserModal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClickUser = (user) => {
    setUserModal(user);
  };

  const closeModal = () => {
    setUserModal(null);
  };

  useEffect(() => {
    let monted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);
    setLoading(true);

    const promisMonted = new Promise((resolve) => {
      setTimeout(() => {
        if (monted) resolve("timer");
      }, 1000);
    });

    const fetchPromise= fetch("https://dummyjson.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Данные получены");
        if (monted) setUserData(data.users);
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
        <UserList dataUser={dataUser} handleClickUser={handleClickUser} />
      )}
      {userModal && <UserModal userModal={userModal} closeModal={closeModal} />}
    </>
  );
}

export default App;
