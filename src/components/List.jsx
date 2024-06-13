import useSWR from "swr";
import axios from "axios";
import styles from "../styles/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

const getWikiSearchResults = async (searchTerm) => {
  let USER_ID = sessionStorage.getItem("User_ID");
  const response = await axios.get(
    `http://localhost:5001/doc/Search/?User_ID=${USER_ID}&query=${searchTerm}`
  );

  return response.data;
};

const List = ({ searchTerm }) => {
  const { isLoading, error, data } = useSWR(
    searchTerm ? searchTerm : null,
    getWikiSearchResults
  );
  const navigate = useNavigate();
  const handel_event = (Doc_Id, Doc_Name, Doc_cont) => {
    const data_trans = {
      Socket_id: Doc_Id,
      DOC_NAME: Doc_Name,
      DOC_CONTENT: Doc_cont,
    };
    navigate("edit", { state: data_trans });
  };

  let content;
  if (isLoading) content = <p>Loading...</p>;
  else if (error) content = <p>{error.message}</p>;
  else if (data) {
    const results = data;
    content = (
      <div className={styles.search_list}>
        {results.map((result) => {
          return (
            <ul
              className={styles.search_items}
              onClick={() => {
                handel_event(
                  result.Doc_Id,
                  result.DOC_name,
                  result.DOC_Content
                );
              }}
            >
              {result.DOC_name}
            </ul>
          );
        })}
      </div>
    );
  }

  return content;
};
export default List;
