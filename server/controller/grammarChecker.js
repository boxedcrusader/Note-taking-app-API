import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
async function checkGrammarWithTrinka(text) {
    try {

        const response = await axios.post('https://api-platform.trinka.ai/api/v2/plugin/check/paragraph', {
            paragraph: text,
            pipeline: "panini2"
        }, {
            headers: {
            'x-api-key': process.env.TRINKA_KEY
            }
        });

        return response.data;

    } catch (err) {
        console.log(err)
    }

};

export default checkGrammarWithTrinka;