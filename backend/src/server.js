import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`App is running on PORT : ${PORT}`);
});
