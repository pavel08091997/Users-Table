import styles from './UserItem.module.css'

export const UserItem = ({
  firstName,
  lastName,
  maidenName,
  age,
  gender,
  email,
  phone,
  city,
  country,
}) => {
  return (
    <div className={styles.UserTable}>
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
