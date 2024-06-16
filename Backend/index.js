import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import Doc_ from "./routes/Doc_.js";
import { Viewer } from "./controllers/Doc_Viewer.js";
import { Server } from "socket.io";
import { createServer } from "http";
import DOCS from "./models/DOCS.js";
import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await client.connect();
})();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* MONGOOSE SETUP */
app.use("/doc", Doc_);
app.use("/viewer", Viewer);

const documents = {};
const userChanges = {};
const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", async ({ roomId, userId }) => {
    console.log(`User ${userId} joined room: ${roomId}`);
    const doc = await DOCS.findOne({
      "Permissions.User_ID": userId,
      "Permissions.Permission": { $in: ["edit", "all"] },
    });
    if (doc) {
      socket.join(roomId);

      // Fetch document data from database
      let documentData = await DOCS.findOne({ Socket_ID: roomId });

      if (!documentData) {
        documentData = await DOCS.create({
          Socket_ID: roomId,
          DOC_Content: "",
          DOC_Size: "0",
          DOC_Time_Update: new Date().toISOString(),
          DOC_Update_ID: uuidv4(),
        });
      }

      documents[roomId] = documentData.DOC_Content;
      console.log(" documents[roomId] ");
      console.log(documents[roomId]);

      if (!userChanges[roomId]) {
        userChanges[roomId] = {};
      }

      if (!userChanges[roomId][userId]) {
        userChanges[roomId][userId] = [];
      }

      connectedUsers[socket.id] = { userId, roomId };

      socket.emit("documentState", { content: documents[roomId] });
      socket.emit("roomJoined", {
        roomId,
        message: `You have joined room ${roomId}`,
      });
    }
  });

  socket.on("documentChange", (data) => {
    const { roomId, userId, newContent } = data;

    console.log(
      `Document change in room ${roomId} by user ${userId}: ${newContent}`
    );

    documents[roomId] = newContent;

    if (!userChanges[roomId]) {
      userChanges[roomId] = {};
    }
    if (!userChanges[roomId][userId]) {
      userChanges[roomId][userId] = [];
    }

    userChanges[roomId][userId].push({
      content: newContent,
      timestamp: new Date(),
    });

    io.to(roomId).emit("documentUpdate", { newContent });
  });

  socket.on("disconnect", async () => {
    const { userId, roomId } = connectedUsers[socket.id] || {};

    console.log(
      "--------------------------------------------------------------------"
    );
    console.log("Document :");
    console.log(documents);
    console.log("UserChange: ");
    console.log(userChanges);
    console.log("connectedUsers :");
    console.log(connectedUsers);
    console.log(
      "--------------------------------------------------------------------"
    );

    if (userId && roomId) {
      console.log(`User ${userId} disconnected from room ${roomId}`);

      // Save document data to database when user disconnects
      const exists = await client.hExists("User_ID:Get_All_Docs", userId);

      if (exists) {
        await client.hDel("User_ID:Get_All_Docs", userId);
      }
      await DOCS.findOneAndUpdate(
        { Socket_ID: roomId },
        {
          DOC_Content: documents[roomId],
          DOC_Size: documents[roomId].length.toString(),
          DOC_Time_Update: new Date().toISOString(),
        }
      );

      const userChangesForRoom = userChanges[roomId][userId] || [];
      let finalMergedChanges = [
        {
          content: userChangesForRoom[0]?.content,
          timestamp: userChangesForRoom[0]?.timestamp,
        },
      ];
      let mergedChangesFirst = userChangesForRoom[0]?.timestamp;
      let mergedChanges = userChangesForRoom[0]?.content;

      for (let i = 1; i < userChangesForRoom.length; i++) {
        const { content, timestamp } = userChangesForRoom[i];

        // If the change occurred within 10 seconds of the last merge, merge it
        if (timestamp - mergedChangesFirst <= 10000) {
          mergedChanges = content;
        } else {
          // Otherwise, treat the change as a separate version
          finalMergedChanges.push({
            content: mergedChanges,
            timestamp: timestamp,
          });
          mergedChangesFirst = timestamp;
          mergedChanges = content;
        }
      }

      console.log("------------------NEW");
      console.log(finalMergedChanges);

      // Update the global document for the room with the latest merged changes
      documents[roomId] = mergedChanges;
      console.log(
        `Storing final document state for room ${roomId}:`,
        documents[roomId]
      );
      console.log(
        `Storing changes for user ${userId} in room ${roomId}:`,
        userChangesForRoom
      );

      // Clear the user's changes for the room
      userChanges[roomId][userId] = [];
    }

    delete connectedUsers[socket.id];
  });
});

/* CONFIGURATION */

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

export { client };
