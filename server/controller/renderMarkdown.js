import { marked } from 'marked';

const renderMarkdown = (req, res) => {
    const { markdown } = req.body;
    const html = marked(markdown);
    res.json({ html });
}

export default renderMarkdown;