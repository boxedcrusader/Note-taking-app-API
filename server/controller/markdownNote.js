import pool from '../database/db.js';
import { marked } from 'marked';
import checkGrammarWithTrinka from './grammarChecker.js'; // Import the grammar checker

export const saveNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    try {
        // Check grammar before rendering
        const grammarCheckResult = await checkGrammarWithTrinka(content);

        // If there are grammar issues, return them
        if (grammarCheckResult && grammarCheckResult.errors && grammarCheckResult.errors.length > 0) {
            return res.status(400).json({ 
                message: "Grammar issues found", 
                errors: grammarCheckResult.errors 
            });
        }

        // Proceed to render Markdown to HTML only if no grammar issues
        const htmlContent = marked(content);

        const result = await pool.query(
            "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
            [title, htmlContent]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving note" });
    }
};
