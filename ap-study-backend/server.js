// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

// Initialize express app
const app = express();
const port = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request parsing middleware
app.use(express.json());

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/generate-question', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Question generation endpoint
app.post('/generate-question', async (req, res) => {
    try {
        const { subject, chapter } = req.body;
        console.log(`Generating question for ${subject} - ${chapter}`);

        // Validate request body
        if (!subject || !chapter) {
            return res.status(400).json({
                error: 'Missing required fields: subject and chapter are required'
            });
        }

        // Construct the prompt
        const prompt = `You are an expert AP ${subject} teacher. Generate a multiple choice question about ${chapter}.
The response must be in this exact JSON format and nothing else:
{
    "question": "Write a clear, concise AP-level question here",
    "options": ["First option", "Second option", "Third option", "Fourth option"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of why this is the correct answer"
}`;

        console.log('Making request to Hugging Face API...');
        
        // Make request to Hugging Face API
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
            {
                inputs: prompt,
                parameters: {
                    max_new_tokens: 1000,
                    temperature: 0.7,
                    top_p: 0.95,
                    return_full_text: false,
                    stop: ["}"]
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Received response from API');

        // Extract the generated text from the response
        const generatedText = response.data[0]?.generated_text || '';
        console.log('Generated text:', generatedText);
        
        // Try to find JSON in the response
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error('No JSON found in response:', generatedText);
            return res.status(500).json({
                error: 'Failed to generate a valid question. Please try again.'
            });
        }

        // Parse the JSON
        let questionData;
        try {
            const jsonStr = jsonMatch[0] + (jsonMatch[0].endsWith('}') ? '' : '}');
            questionData = JSON.parse(jsonStr);
            
            // Validate response structure
            if (!questionData.question || 
                !Array.isArray(questionData.options) || 
                questionData.options.length !== 4 || 
                typeof questionData.correctAnswer !== 'number' ||
                !questionData.explanation) {
                console.error('Invalid response format:', questionData);
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error parsing AI response:', error);
            console.error('Raw response:', generatedText);
            return res.status(500).json({
                error: 'Failed to generate a valid question. Please try again.'
            });
        }

        console.log('Successfully generated question');
        // Return the generated question
        res.json(questionData);

    } catch (error) {
        console.error('Error generating question:', error.response?.data || error.message);
        
        // Handle different types of errors
        if (error.response?.status === 429) {
            return res.status(429).json({
                error: 'Rate limit exceeded for AI API. Please try again later.'
            });
        }
        if (error.response?.status === 401) {
            return res.status(500).json({
                error: 'API authentication failed. Please check API key configuration.'
            });
        }
        
        res.status(500).json({
            error: 'An error occurred while generating the question.'
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 