import React from 'react'
import style from "../styles/footer.module.css"

function Footer() {
  return (
    <>
    <div className={style.footer}>
        <img src="google_logo.png" alt="" className={style.footer_logo}  />
        <div className={style.extra_box}>
        <h3 className={style.footer_text}>About Google</h3>
        <h3 className={style.footer_text}>Google products</h3>
        <h3 className={style.footer_text}>Privacy</h3>
        <h3 className={style.footer_text}>Terms</h3>
        </div>

    </div>
    </>
  )
}

export default Footer