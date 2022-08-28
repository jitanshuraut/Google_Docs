import React, { useState, useRef, useEffect } from 'react'
import JoditEditor from "jodit-react";
import styles from "../styles/docs.module.css"
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-con"
import { collection, query, where, doc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, FieldValue } from "firebase/firestore"
import { useLocation } from 'react-router-dom';


function EDocs() {

  const location = useLocation();
  const [content, setContent] = useState('')
  const [name, setname] = useState("")
  const [fetch, setfetch] = useState([])
  let navigate = useNavigate();
  const editor = useRef(null)
  const ref = collection(db, "content");

  const [no, setno] = useState("flex")






  const clicked = async (id) => {
    const new_ = { text: content, name: name }
    const doc_ = doc(db, "content", id)
    await updateDoc(doc_, new_)
    navigate("/docs")
  }

  useEffect(() => {
    setContent(location.state.text)
    setname(location.state.name)
  }, [])

  const delet= async(id)=>{
    const det=doc(db,"content",id);
    await deleteDoc(det)
    navigate("/docs")
  }



  return (
    <>
      <div className={styles.delet} style={{ "display": `${no}` }} >
        <h1 className={styles.d_text}>Do you want to delet this Document </h1>
        <div className={styles.d_button}>
          <h3 className={styles.yes} onClick={()=>{delet(location.state.id)}}>Yes</h3>
          <h3 className={styles.no} onClick={() => { setno("none") }}>No</h3>
        </div>
      </div>
     
      {
        content.length == 0 ? console.log("hiii") : <div> <h2 className={styles.changes}>Do you want to save changes?</h2>
          <div className={styles.save_changes}
            onClick={() => {
              clicked(location.state.id)
            }} >
            Save
          </div>
        </div>
      }

      <div className={styles.input_name}>
        <h2 className={styles.name}>File Name:</h2>
        <input type="text" value={name} className={styles.input} onChange={(e) => {
          setname(e.target.value)
        }} />
      </div>

      <div className={styles.docs} >
        <JoditEditor
          ref={editor}

          value={content}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => { }}
        />

      </div>

    </>
  )
}

export default EDocs