import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import List from "./List";
import useDebounce from "../hooks/useDebounce";

function Navbar(props) {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const handleKeyDown = (event) => {
    console.log("User pressed: ", event.key);

    if (event.key === "Enter") {
      // 👇️ your logic here
      console.log("Enter key pressed ✅");
    }
  };

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.head_box}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src="gd.png" alt="" className={styles.logo} />
            <h1 className={styles.heading}>Google Docs</h1>
          </Link>
        </div>
        {props.yes == "yes" ? (
          <div className={styles.search_box}>
            <SearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <List searchTerm={debouncedSearchValue}/>
          </div>
        ) : (
          <div></div>
        )}
        <Link to="/profile">
          <img
            src={sessionStorage.getItem("url")}
            alt=""
            className={styles.profile}
          />
        </Link>
      </div>
    </>
  );
}

export default Navbar;
