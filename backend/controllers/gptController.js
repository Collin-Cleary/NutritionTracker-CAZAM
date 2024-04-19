require('dotenv').config();
const OpenAI = require('openai');
const gptController = {};

openAiApiKey = process.env.OPENAI_API_KEY
gptController.generateDiet = async (req, res) => {
    const { currentWeight, goalWeight, dietType, healthConditions, misc } = req.body;

    const prompt = `Generate a diet plan for a person with the following details: Current Weight: ${currentWeight}, Goal Weight: ${goalWeight}, Diet Type: ${dietType}, Health Conditions: ${healthConditions}, Miscellaneous: ${misc}`;

    try {
        // Initialize OpenAI API client
        const openai = new OpenAI({apiKey: openAiApiKey}); 

        // Generate diet plan using GPT-3
        const response = await openai.chat.completions.create({
            messages: [{"role": "system", "content": prompt}],
            model: "gpt-3.5-turbo",
        });

        // Extract generated diet plan from GPT-3 response
        const dietPlan = response.choices[0].message.content;
        console.log(dietPlan);

        // Send generated diet plan as response
        res.json({ dietPlan });
    } catch (error) {
        console.error('Error generating diet plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = gptController;