import { UserItem } from "./UserItem";
import { UserList } from "./UserList";

export const UserTable = ({ dataUser = [] }) => {
  return (
    <>
      <div>
        <UserList dataUser={dataUser} />
      </div>
    </>
  );
};
