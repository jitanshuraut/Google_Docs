import React from 'react'
import styles from "../styles/extra.module.css"
import { Link } from "react-router-dom";

function Extra() {
    return (
        <>
       
            <div className={styles.box_aut}>
                <div className={styles.logo_box}>
                    <img src="gd.png" alt="" className={styles.logo} />
                    <h3 className={styles.logo_text}>Google Docs</h3>
                </div>

                <hr />
                <div className={styles.auth_box}>
                    <h3 className={styles.email}>Email:  {sessionStorage.getItem("email")}</h3>
                    <h3 className={styles.email}>Name: {sessionStorage.getItem("name")}</h3>
                </div>
                <div className={styles.auth_btn}>
                    <h3 className={styles.auth_text}>
                    <Link to="../docs" style={{ "textDecoration": "none", "color": "white" }}> Get Started</Link>
                    </h3>
                </div>
            </div>
        </>
    )
}

export default Extra