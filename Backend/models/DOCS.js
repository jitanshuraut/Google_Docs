import mongoose from "mongoose";
const { Schema } = mongoose;
const DOCSSchema = new Schema(
  {
    Doc_Id: {
      type: String,
      required: true,
    },

    User_ID: {
      type: String,
      required: true,
    },
    DOC_name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    DOC_Content: String,
    DOC_Size: String,
    DOC_Time_Update: String,
    DOC_Update_ID: {
      type: String,
      required: true,
      unique: true,
    },
    Socket_ID: String,

    Permissions: [
      {
        User_ID: {
          type: String,
          required: true,
        },
        Permission: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const DOCS = mongoose.model("DOCS", DOCSSchema);
export default DOCS;
