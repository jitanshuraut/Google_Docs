import DOCS from "../models/DOCS.js";
import { checker } from "./Functions/DOC_permissions_checker.js";

export const Viewer = async (req, res) => {
  try {
    const { USER_ID, Doc_Id } = req.body;
    const Get_DOC = await DOCS.findOne({ Doc_Id: Doc_Id });
    if (Get_DOC !== null) {
    }
    // console.log("successfully", Get_DOC);
  } catch (error) {
    console.error("Error adding user", error);
    res.status(503).json("Server Error");
  }
};
