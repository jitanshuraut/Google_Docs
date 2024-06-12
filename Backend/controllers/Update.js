import DOCS from "../models/DOCS.js";

export const Get_Doc_Based_on_Socket = async (socket_Id) => {
  try {
    const Document = await DOCS.findOne({ Socket_ID: socket_Id });
    return Document;
  } catch (error) {
    return null;
  }
};


export const update_Doc_Based_On_Socket = async (socketId, content) => {
  try {
    const Document = await DOCS.findOneAndUpdate(
      { Socket_ID: socketId },  // Query object to find the document
      { DOC_Content: content }, // Update object to update the document
      { new: true } // Option to return the updated document
    );
    return Document;
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return null;
  }
};
