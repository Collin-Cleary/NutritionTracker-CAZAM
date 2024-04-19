const OpenAI = require('openai'); // Assuming you have a library for GPT-3 integration

const gptInterator = {};

gptInterator.generateDiet = async (req, res) => {
    const { currentWeight, goalWeight, dietType, healthConditions } = req.body;

    const prompt = `Generate a diet plan for a person with the following details:\n
        Current Weight: ${currentWeight}\n
        Goal Weight: ${goalWeight}\n
        Diet Type: ${dietType}\n
        Health Conditions: ${healthConditions}`;

    try {
        // Initialize OpenAI API client
        const openai = new OpenAI('your-api-key'); // Replace 'your-api-key' with your actual API key

        // Generate diet plan using GPT-3
        const response = await openai.complete({
            engine: 'text-davinci-003', // Choose appropriate GPT-3 engine
            prompt,
            maxTokens: 200, // Adjust as needed
            temperature: 0.7, // Adjust as needed
            stop: ['\n'], // Stop generation at new line
        });

        // Extract generated diet plan from GPT-3 response
        const dietPlan = response.data.choices[0].text.trim();

        // Send generated diet plan as response
        res.json({ dietPlan });
    } catch (error) {
        console.error('Error generating diet plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = gptInterator;
