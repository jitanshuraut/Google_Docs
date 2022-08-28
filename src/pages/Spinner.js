import React from 'react'
import styles from "../styles/spiner.module.css"
import { useNavigate } from "react-router-dom";


function Spinner() {
    let navigate = useNavigate();
setTimeout(() => {
    navigate("../extra")
}, 10000);

  return (
    <>
    <div className={styles.spiner}>
    <div className={styles.loader}></div>
    </div>
    </>
  )
}

export default Spinner