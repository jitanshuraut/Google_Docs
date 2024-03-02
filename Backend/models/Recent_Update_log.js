import mongoose from "mongoose";

const Recent_Update_log_Schema = new mongoose.Schema(
  {
    User_ID: {
      type: ID,
      required: true,
    },
    Update_Time: String,
    Update: String,
  },
  { timestamps: true }
);

const Recent_Update_log = mongoose.model(
  "Recent_Update_log",
  Recent_Update_log_Schema
);
export default Recent_Update_log;
