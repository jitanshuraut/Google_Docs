import mongoose from "mongoose";

const Permissions_Schema = new mongoose.Schema(
  {
    User_ID: {
      type: String,
      required: true,
      unique: true,
    },
    Permissions: String,
  },
  { timestamps: true }
);

const Permissions = mongoose.model(" Permissions", Permissions_Schema);
export default Permissions;
