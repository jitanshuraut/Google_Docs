import React, { useState } from 'react'
import styles from "../styles/navbar.module.css"
import { Link, useNavigate } from "react-router-dom";
function Navbar(props) {

    const handleKeyDown = event => {
        console.log('User pressed: ', event.key);

        if (event.key === 'Enter') {
            // 👇️ your logic here
            console.log('Enter key pressed ✅');

        }
    };

    return (
        <>
            <div className={styles.nav} >
                <div className={styles.head_box}>
                    <Link to="/" style={{ "textDecoration": "none", "color": "black", "display": "flex", "alignItems": "center" }}>
                        <img src="gd.png" alt="" className={styles.logo} />
                        <h1 className={styles.heading}>Google Docs</h1></Link>

                </div>
                {
                    props.yes == "yes" ? (<div className={styles.search_box}>

                        <input class={styles.search__input} type="text" placeholder="Search" onKeyDown={handleKeyDown} />

                    </div>) : (<div></div>)
                }
                <Link to="/profile">
                    <img src={sessionStorage.getItem("url")} alt="" className={styles.profile} />
                </Link>
            </div>
        </>
    )
}

export default Navbar