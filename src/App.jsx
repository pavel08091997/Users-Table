import { useEffect, useState } from "react";
import "./App.css";
import { UserTable } from "./UserTable";

function App() {
  const [dataUser, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUserData(data.users))
  }, []);

  return (
    <>
      <UserTable dataUser={dataUser} />
    </>
  );
}

export default App;
