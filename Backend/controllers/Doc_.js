import user from "../models/User.js";
import DOCS from "../models/DOCS.js";
import { v4 as uuidv4 } from "uuid";
import { getSizeOfText } from "./Functions/Text_Size.js";
import DOCS_Log from "../models/DOC_Log.js";
import { checker } from "./Functions/DOC_permissions_checker.js";
import dotenv from "dotenv";
import { Resend } from "resend";
import { client } from "./../index.js";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

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
  const { User_name, Email } = req.body;
  let user_id = uuidv4();
  console.log(user_id);

  try {
    const user_ = await user.create({
      User_ID: user_id,
      User_name: User_name,
      Email: Email,
    });
    res.status(200).json(user_);
    console.log("User added successfully", user_);
  } catch (error) {
    console.log(error.code);
    if (error.code == 11000) {
      const user_Ext = await user.findOne({ Email: Email });
      res.status(200).json(user_Ext);
    } else {
      res.status(503).json("Error");
      console.error("Error adding user", error);
    }
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
  var Doc_Id_V4 = uuidv4();
  try {
    const { USER_ID, DOC_CONTENT, DOC_NAME } = req.body;
    const redisData = await client.hGet("User_ID:Get_All_Docs", USER_ID);

    let parsedData = [];
    if (redisData) {
      parsedData = JSON.parse(redisData);
    }

    const DOC_ = await DOCS.create({
      Doc_Id: Doc_Id_V4,
      User_ID: USER_ID,
      DOC_name: DOC_NAME,
      DOC_Content: DOC_CONTENT,
      DOC_Size: getSizeOfText(DOC_CONTENT),
      DOC_Time_Update: new Date().toString(),
      DOC_Update_ID: uuidv4(),
      Socket_ID: Doc_Id_V4,
    });

    const DOC_permissions = await DOCS.findOneAndUpdate(
      { Doc_Id: Doc_Id_V4 },
      {
        $push: {
          Permissions: {
            User_ID: USER_ID,
            Permission: "all",
          },
        },
      },
      { new: true }
    );
    console.log(DOC_permissions);
    parsedData.push(DOC_);

    await client.hSet(
      "User_ID:Get_All_Docs",
      USER_ID,
      JSON.stringify(parsedData),
      "EX",
      600
    );

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
    const { Rec_Email, Doc_Id, Sed_User_Id } = req.body;

    const user_ = await user.findOne({ Email: Rec_Email });
    const doc = await DOCS.findOne({ Doc_Id: Doc_Id });
    console.log(user_);

    if (user_ && doc.User_ID == Sed_User_Id) {
      console.log("User_ID:", user_.User_ID);
      const user_sender = await user.findOne({ User_ID: Sed_User_Id });
      // return user.User_ID;

      const DOC_permissions = await DOCS.findOneAndUpdate(
        { Doc_Id: Doc_Id },
        {
          $push: {
            Permissions: {
              User_ID: user_.User_ID,
              Permission: "edit",
            },
          },
        },
        { new: true }
      );
      const doc_name_email = doc.DOC_name;
      const sender_email = user_sender.Email;
      const html_cont = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Collaboration Invitation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; }
        .header { background-color: #0073e6; color: white; padding: 10px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; }
        .footer { padding: 10px; text-align: center; color: #555; font-size: 0.9em; }
        .button { 
       display: inline-block; 
       padding: 10px 20px; 
       margin-top: 20px; 
       background-color: #0073e6; 
       color: white; 
       text-decoration: none; 
       border-radius: 5px; 
    }
    .button:hover {
      background-color: #005aa8; /* Darker shade on hover */
    }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Google Docs Collaboration!</h1>
        </div>
        <div class="content">
          <p>Hi ,</p>
          <p>We're excited to inform you that <strong>${sender_email}</strong> has added you as a collaborator on the document titled <strong>"${doc_name_email}"</strong>.</p>
          <p>This means you can now work together in real-time to create and edit content seamlessly.</p>
          <p>To get started, simply click the button below to open the document and begin collaborating:</p>
          <p style="text-align: center; ">
            <a href="http://localhost:3000" class="button">Open Document</a>
          </p>
          <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
          <p>Happy collaborating!</p>
          <p>Best regards,</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>`;
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: Rec_Email,
        subject: `Document ${DOC_permissions.DOC_name}  Share with you`,
        html: html_cont,
      });
      console.log("Resend");
      console.log(data);
      console.log(error);

      res.status(200).json({ success: true });
      console.log("DOC_permissions added successfully", DOC_permissions);
    } else {
      console.log("User not found");
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(503).json("Server Error");
    console.error("Error adding user", error);
  }
};

export const Get_DOC = async (req, res) => {
  try {
    const { Doc_Id } = req.params;
    const Get_DOC = await DOCS.findOne({ Doc_Id: Doc_Id });
    console.log(Get_DOC);

    const filteredDocs = {
      Doc_Id: Get_DOC.Doc_Id,
      Socket_ID: Get_DOC.Socket_ID,
      DOC_name: Get_DOC.DOC_name,
      DOC_Time_Update: Get_DOC.DOC_Time_Update,
      DOC_Content: Get_DOC.DOC_Content,
    };

    res.status(200).json(filteredDocs);
    console.log("successfully", Get_DOC);
  } catch (error) {
    console.error("Error adding user", error);
    res.status(503).json("Server Error");
  }
};

export const Get_All_DOC = async (req, res) => {
  try {
    const { User_ID } = req.params;
    console.log(User_ID);
    const redisData = await client.hGet("User_ID:Get_All_Docs", User_ID);

    let parsedData;
    if (redisData) {
      parsedData = JSON.parse(redisData);
      return res.status(200).json(parsedData);
    }
    const Get_DOC = await DOCS.find({ User_ID });

    const Share_doc = await DOCS.find({
      "Permissions.User_ID": User_ID,
      "Permissions.Permission": "edit",
    });

    const shareDocsArray = Share_doc.map((shareDoc) => ({
      Doc_Id: shareDoc.Doc_Id,
      Socket_ID: shareDoc.Socket_ID,
      DOC_name: shareDoc.DOC_name,
      DOC_Time_Update: shareDoc.DOC_Time_Update,
      DOC_Content: shareDoc.DOC_Content,
    }));

    const filteredDocs = Get_DOC.map((doc) => ({
      Doc_Id: doc.Doc_Id,
      Socket_ID: doc.Socket_ID,
      DOC_name: doc.DOC_name,
      DOC_Time_Update: doc.DOC_Time_Update,
      DOC_Content: doc.DOC_Content,
    }));
    filteredDocs.push(...shareDocsArray);
    filteredDocs.sort((a, b) => {
      const dateA = new Date(a.DOC_Time_Update);
      const dateB = new Date(b.DOC_Time_Update);
      return dateB - dateA;
    });
    const filteredDocsJSON = JSON.stringify(filteredDocs);
    await client.hSet(
      "User_ID:Get_All_Docs",
      User_ID,
      filteredDocsJSON,
      "EX",
      600
    );
    res.status(200).json(filteredDocs);
    console.log("Successfully retrieved documents", Get_DOC);
  } catch (error) {
    console.error("Error retrieving documents", error);
    res.status(503).json("Server Error");
  }
};

export const Update_DOC_Name = async (req, res) => {
  const { Doc_Id, User_ID, newDocName } = req.body;

  try {
    const updatedDoc = await DOCS.findOneAndUpdate(
      { Doc_Id, User_ID },
      { DOC_name: newDocName, DOC_Time_Update: new Date().toString() },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const redisData = await client.hGet("User_ID:Get_All_Docs", User_ID);

    let parsedData = [];
    if (redisData) {
      parsedData = JSON.parse(redisData);
      const index = parsedData.findIndex(
        (doc) => doc.Doc_Id === updatedDoc.Doc_Id
      );
      if (index !== -1) {
        parsedData[index] = updatedDoc;
      }
    }

    await client.hSet(
      "User_ID:Get_All_Docs",
      User_ID,
      JSON.stringify(parsedData)
    );
    res.status(200).json("updated name");
  } catch (error) {
    console.error("Error updating document name", error);
    res.status(503).json({ message: "Server Error" });
  }
};

export const Update_DOC = async (req, res) => {
  try {
    const { USER_ID, Doc_Id, DOC_CONTENT } = req.body;
    console.log(USER_ID, Doc_Id, DOC_CONTENT);
    const Get_DOC = await DOCS.findOne({ Doc_Id: Doc_Id });

    if (Get_DOC !== null) {
      const permissions_ = checker(Get_DOC.Permissions, USER_ID);
      console.log(permissions_);
      if (permissions_ == "all") {
        const DOC_Update = await DOCS.findOneAndUpdate(
          { Doc_Id: Doc_Id },
          { DOC_Content: DOC_CONTENT }
        );
        console.log(DOC_Update);

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

export const Query_Doc = async (req, res) => {
  const { User_ID, query } = req.query;

  if (!User_ID || !query) {
    return res.status(400).send("UserId and query are required");
  }

  try {
    const redisKey = `UserDocs:${User_ID}:${query}`;
    const cachedData = await client.get(redisKey);

    if (cachedData) {
      const documents = JSON.parse(cachedData);
      return res.status(200).json(documents);
    }

    const documents = await DOCS.find({
      User_ID: User_ID,
      DOC_name: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    const shareDocsArray = documents.map((shareDoc) => ({
      Doc_Id: shareDoc.Doc_Id,
      DOC_name: shareDoc.DOC_name,
      DOC_Content: shareDoc.DOC_Content,
    }));

    await client.set(redisKey, JSON.stringify(shareDocsArray), "EX", 60);

    res.send(shareDocsArray);
  } catch (err) {
    res.status(500).send("Error searching documents");
  }
};
