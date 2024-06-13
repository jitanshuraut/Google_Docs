import styles from "../styles/navbar.module.css";

const SearchInput = ({ searchValue, setSearchValue }) => {
  return (
    <input
      className={styles.search__input}
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search"
      autoFocus
    />
  );
};
export default SearchInput;
