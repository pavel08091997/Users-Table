import React from "react";
import styles from "./UserFilter.module.css";

export const UserFilter = ({ handleFilterChange, filters, columns }) => {
  return (
    <>
      <div className={styles.filterRow}>
        {columns.map((col) => (
          <div key={`filter-${col.key}`} className={styles.filterCell}>
            {col.key === "gender" ? (
              <select
                value={filters[col.key] || ""}
                onChange={(e) => handleFilterChange(col.key, e.target.value)}
                
              >
                <option value="">Все</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>
            ) : (
              <input
                type="text"
                value={filters[col.key] || ""}
                onChange={(e) => handleFilterChange(col.key, e.target.value)}
                placeholder="Фильтр..."
                className={styles.filterInput}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
