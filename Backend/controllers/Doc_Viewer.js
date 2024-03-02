import DOCS from "../models/DOCS.js";
import { checker } from "./Functions/DOC_permissions_checker.js";

export const Viewer = async (req, res) => {
  try {
    const { USER_ID, Doc_Id } = req.body;
    const Get_DOC = await DOCS.findOne({ Doc_Id: Doc_Id });
    if (Get_DOC !== null) {
      if (USER_ID !== "all") {
        const permissions_ = checker(Get_DOC.Permissions, USER_ID);
        console.log(permissions_);
        if (permissions_ !== "none") {
          res.status(200).json(Get_DOC.DOC_Content);
        } else {
          res.status(403).json({ error: "not Permission" });
        }
      } else {
      }
    }
    // console.log("successfully", Get_DOC);
  } catch (error) {
    console.error("Error adding user", error);
    res.status(503).json("Server Error");
  }
};
