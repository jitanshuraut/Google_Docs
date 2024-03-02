import user from "../models/User.js";
import DOCS from "../models/DOCS.js";
import { v4 as uuidv4 } from "uuid";
import { getSizeOfText } from "./Functions/Text_Size.js";
import DOCS_Log from "../models/DOC_Log.js";
import { checker } from "./Functions/DOC_permissions_checker.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { encp } from "./Functions/Encp.js";
dotenv.config();

/**
 * Test_User function to add a user to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is added successfully.
 */
export const Test_User = async (req, res) => {
  try {
    const user_ = await user.create({
      User_ID: "5e1a0651741b255ddda996c4",
      User_name: "John",
      Email: "John@example.",
    });
    res.status(200).json(user_);
    console.log("User added successfully", user_);
  } catch (error) {
    console.error("Error adding user", error);
  }
};

/**
 * Adds a user to the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The added user object.
 */
export const Add_User = async (req, res) => {
  try {
    const { User_name, Email } = req.body;
    const user_ = await user.create({
      User_ID: uuidv4(),
      User_name: User_name,
      Email: Email,
    });
    res.status(200).json(user_);
    console.log("User added successfully", user_);
  } catch (error) {
    res.status(403).json("credential error");
    console.error("Error adding user", error);
  }
};

/**
 * Adds a new document to the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The newly created document.
 */
export const Add_DOC = async (req, res) => {
  try {
    const { USER_ID, DOC_CONTENT, DOC_NAME } = req.body;
    const DOC_ = await DOCS.create({
      Doc_Id: uuidv4(),
      User_ID: USER_ID,
      DOC_name: DOC_NAME,
      DOC_Content: DOC_CONTENT,
      DOC_Size: getSizeOfText(DOC_CONTENT),
      DOC_Time_Update: new Date().toString(),
      DOC_Update_ID: uuidv4(),
    });

    res.status(200).json(DOC_);
    console.log("DOC_ added successfully", DOC_);
  } catch (error) {
    res.status(503).json("Server Error");
    console.error("Error adding user", error);
  }
};

/**
 * Add document permissions to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated document permissions.
 */
export const Add_DOC_permissions = async (req, res) => {
  try {
    const { USER_ID, Permissions, Doc_Id } = req.body;
    const DOC_permissions = await DOCS.findOneAndUpdate(
      { Doc_Id: Doc_Id },
      {
        $push: {
          Permissions: {
            User_ID: USER_ID,
            User_ID_hash: encp(USER_ID),
            Permission: Permissions,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(DOC_permissions);
    console.log("DOC_permissions added successfully", DOC_permissions);
  } catch (error) {
    res.status(503).json("Server Error");
    console.error("Error adding user", error);
  }
};

export const Get_DOC = async (req, res) => {
  try {
    const { Doc_Id } = req.body;
    const Get_DOC = await DOCS.findOne({ Doc_Id: Doc_Id });
    res.status(200).json(Get_DOC.DOC_Content);
    console.log("successfully", Get_DOC);
  } catch (error) {
    console.error("Error adding user", error);
    res.status(503).json("Server Error");
  }
};

/**
 * Update a document.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated document log.
 */
export const Update_DOC = async (req, res) => {
  try {
    const { USER_ID, Doc_Id, DOC_CONTENT } = req.body;
    const Get_DOC = await DOCS.findOne({ Doc_Id: Doc_Id });
    if (Get_DOC !== null) {
      const permissions_ = checker(Get_DOC.Permissions, USER_ID);
      console.log(permissions_);
      if (permissions_ === "all") {
        const DOC_Update = await DOCS.findOneAndUpdate(
          { Doc_Id: Doc_Id },
          { DOC_Content: DOC_CONTENT }
        );

        const Log__ = await DOCS_Log.findOne({ Doc_Id: Doc_Id });
        if (Log__ == null) {
          const New_Log__ = await DOCS_Log.create({
            Doc_Id: Doc_Id,
            Updates_Verion: [
              {
                User_ID: USER_ID,
                DOC_Content: DOC_CONTENT,
                Time_Log: new Date().toString(),
              },
            ],
            Time_Log_last: new Date().toString(),
          });
          res.status(200).json(New_Log__);
        } else {
          console.log("uphit");
          const Update_Log__ = await DOCS_Log.findOneAndUpdate(
            { Doc_Id: Doc_Id },
            {
              $push: {
                Updates_Verion: {
                  User_ID: USER_ID,
                  DOC_Content: DOC_CONTENT,
                  Time_Log: new Date().toString(),
                },
              },
            },
            { new: true }
          );
          res.status(200).json(Update_Log__);
        }
      } else {
        res.status(403).json({ error: "not Permission" });
      }
    }
    // console.log("successfully", Get_DOC);
  } catch (error) {
    console.error("Error adding user", error);
    res.status(503).json("Server Error");
  }
};

/**
 * Deletes a document from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the document is deleted.
 */
export const Delete_DOC = async (req, res) => {
  try {
    const { Doc_Id } = req.body;

    const Get_DOC = await DOCS.deleteMany({ Doc_Id: Doc_Id });
    res.status(200).json({ status: "OK" });
    console.log("successfully", Get_DOC);
  } catch (error) {
    console.error("Error adding user", error);
    res.status(503).json("Server Error");
  }
};

export const Encrypt = async (req, res) => {
  try {
    const { User_Id } = req.body;
    res.status(200).json({ hash_: encp(User_Id) });
  } catch (error) {
    console.error("Error adding user", error);
    res.status(503).json("Server Error");
  }
};
