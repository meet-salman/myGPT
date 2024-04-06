import { OpenAIApi, Configuration } from "openai";

export default async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: "Prompt Required!" })
    }

    const configuration = new Configuration({
        apiKey: process.env.API
    })

    const openai = new OpenAIApi(configuration)
    try {
        const result = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: question,
            max_tokens: 500
        })
        return res.json({ answer: result.data.choices[0].text })
    } catch (error) {
        return res.status(500).json({ error: "Error Fetching!" })
    }

}