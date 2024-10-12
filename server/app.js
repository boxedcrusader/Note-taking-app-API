import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import checkGrammarWithTrinka from "./controller/grammarChecker.js";
import { saveNote } from "./controller/markdownNote.js";
import renderMarkdown from "./controller/renderMarkdown.js";

dotenv.config()
const app = express();
const upload = multer({ dest: "uploads/" });
app.use(express.json());

app.post("/check-grammar", async (req, res) => {
    const { text } = req.body;
    const result = await checkGrammarWithTrinka(text);
    res.json(result);
});
app.post("/api/upload", upload.single("file"), saveNote);
app.post("/render", renderMarkdown)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});