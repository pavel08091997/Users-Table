import styles from "./UserItem.module.css";

export const UserItem = ({
  firstName,
  lastName,
  maidenName,
  age,
  gender,
  email,
  city,
  country,
  handleClickUser,
  image,
  height,
  weight,
  phone,
  address,
}) => {
  return (
    <div
      onClick={() =>
        handleClickUser({
          firstName,
          lastName,
          maidenName,
          age,
          email,
          image,
          height,
          weight,
          address,
          phone,
        })
      }
      className={styles.UserTable}
    >
      <div> {firstName}</div>
      <div> {lastName}</div>
      <div> {maidenName}</div>
      <div> {age}</div>
      <div> {gender}</div>
      <div> {email}</div>
      <div> {phone}</div>
      <div> {city}</div>
      <div> {country}</div>
    </div>
  );
};
