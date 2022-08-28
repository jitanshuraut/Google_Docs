import React,{useState} from 'react'
import styles from "../styles/navbar.module.css"
import { Link } from "react-router-dom";
function Navbar() {
    const [boxsh, setboxsh] = useState("")

    
    return (
        <>
            <div className={styles.nav} >
                <div className={styles.head_box}>
                <Link to="/" style={{"textDecoration":"none","color":"black","display":"flex","alignItems":"center"}}>
                    <img src="gd.png" alt="" className={styles.logo} />
                   <h1 className={styles.heading}>Google Docs</h1></Link>
                </div>
                <img src={sessionStorage.getItem("url")} alt="" className={styles.profile} />

            </div>
        </>
    )
}

export default Navbar