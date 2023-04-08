import React, { useState, useRef, useEffect } from 'react'
import JoditEditor from "jodit-react";
import styles from "../styles/docs.module.css"
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-con"
import { collection, query, doc, updateDoc, deleteDoc, } from "firebase/firestore"
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%'
  },
};

function EDocs() {

  const location = useLocation();
  const [content, setContent] = useState('')
  const [name, setname] = useState("")
  let navigate = useNavigate();
  const editor = useRef(null)
  const [shr, setshr] = useState(false)
const [new_eml, setnew_eml] = useState("")

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
function openModal_sr(){
  setshr(true);
}
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setshr(false)
  }

  const clicked = async (id) => {
    const new_ = { text: content, name: name }
    const doc_ = doc(db, "content", id)
    await updateDoc(doc_, new_)
    navigate("/docs")
  }

  const clicked_shr = async (id) => {
    const new_ = { text: content, name: name }
    const doc_ = doc(db, "content", id)
    await addDoc(ref, { name: name, text: content, time: date, email:new_eml })
    navigate("/docs")
  }

  useEffect(() => {
    setContent(location.state.text)
    setname(location.state.name)
  }, [])

  const delet = async (id) => {
    const det = doc(db, "content", id);
    await deleteDoc(det)
    setIsOpen(false)
    navigate("/docs")
  }
  const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    uploader: {
      insertImageAsBase64URI: true
    },
    width: window.innerWidth,
    height: (window.innerHeight) / 1.5
  };





  return (
    <>
      <div className={styles.nav} >
        <div className={styles.head_box}>
          <Link to="/docs" style={{ "textDecoration": "none", "color": "black", "display": "flex", "alignItems": "center", "width": "70%" }}>
            <img src="/gd.png" alt="" className={styles.logo} />
            <h1 className={styles.heading}>Google Docs /</h1></Link>
          <input type="text" value={name} className={styles.input} onChange={(e) => {
            setname(e.target.value)
          }} />
          <div className={styles.save_changes}
            onClick={() => {
              clicked(location.state.id)
            }} >
            Save
          </div>
        </div>

        <div className={styles.ext_img_}>
          <i class="fa-solid fa-share-from-square fa-xl" id={styles.ico} onClick={openModal_sr}></i>
          <i class="fa-sharp fa-solid fa-trash fa-xl" id={styles.ic} onClick={openModal} ></i>
          <Link to="/profile">
            <img src={sessionStorage.getItem("url")} alt="" className={styles.profile} />
          </Link>
        </div>

      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div className={styles.delet}  >
          <h1 className={styles.d_text}>Do you want to delet this Document </h1>
          <div className={styles.d_button}>
            <h3 className={styles.yes} onClick={() => { delet(location.state.id) }}>Yes</h3>
            <h3 className={styles.no} onClick={() => {
              setno("none")
              setIsOpen(false)
            }}>No</h3>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={shr}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div className={styles.delet}  >
          <h3 className={styles.yes_} >Email</h3>
        <input type="text" value={new_eml} className={styles.input} onChange={(e) => {
            setnew_eml(e.target.value)
          }} />
          <div className={styles.d_button}>
            <h3 className={styles.yes} onClick={() => { clicked_shr(location.state.id) }}>Yes</h3>
            <h3 className={styles.no} onClick={() => {
              setno("none")
              setshr(false)
            }}>No</h3>
          </div>
        </div>
      </Modal>





      <div className={styles.docs} >
        <JoditEditor
          config={editorConfig}
          value={content}
          tabIndex={5} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => { }}
        />
      </div>

    </>
  )
}

export default EDocs