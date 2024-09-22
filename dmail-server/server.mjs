import express, { json } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Voting App API");
});

app.get("/communicate", (req, res) => {
  const user = req.query.userAddress;

  const folderPath = `public/${user}`; // replace with your folder name

  // Read the directory
  fs.readdir(folderPath, async (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.send([]);
    }
    const fileContentsPromises = files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      const content = await fs.promises.readFile(filePath, "utf-8"); // Read file contents

      return content;
    });

    // Wait for all promises to resolve
    const fileObjects = await Promise.all(fileContentsPromises);

    // Send the list of files as JSON
    res.json(fileObjects);
  });
});

// Example route for user registration
app.post("/communicate", (req, res) => {
  const mail = JSON.stringify(req.body);
  console.log(mail);
  const user = req.query.userAddress;

  fs.mkdir(`public/${user}`, (err) => {
    if (err) console.log(err);
  });

  fs.writeFile(`public/${user}/${Date.now()}.json`, mail, (err) => {
    if (err) console.log(err);
  });

  res.status(200).json({ message: "sent!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
