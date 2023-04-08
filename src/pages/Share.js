import React,{ useState, useRef, useEffect } from 'react'
import styles from "../styles/share.module.css"

function Share() {
const [eml, seteml] = useState(1)
  return (
    <>
    <div className={styles.body}>
    <strong>Best First-Person Shooters</strong>

<ol className={styles.alternatingcolors}>
  <li>
    <strong>Half-Life 2</strong>
    <p>Fight aliens, wear a head crab, learn about gravity</p>
  </li>
  <li>
    <strong>Halo: Combat Evolved</strong>
    <p>Fight aliens, wear an AI, learn about screen peeking siblings</p>
  </li>
  <li>
    <strong>Team Fortress 2</strong>
    <p>Fight non-alien residents, wear hats, learn about teamwork</p>
  </li>
  <li>
    <strong>Tribes</strong>
    <p>Ski, slip, and slide your way to victory</p>
  </li>
</ol>
</div>
    </>
  )
}

export default Share