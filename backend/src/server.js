import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectionDB } from "./db/database.js";

const PORT = process.env.PORT || 8080;


connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`SERVER CONNECTION ERROR: ${error.message}`);
  });
