// Configuration for the Gemini API
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = 'AIzaSyD_cNfRm7aP13asPjDwk16i6X1TvVu7-No';

class QuestionGenerator {
    constructor() {
        // No need to pass API key in constructor anymore
    }

    async generateQuestion(subject, chapter) {
        const prompt = `Generate an AP-level multiple choice question for ${subject}, chapter: ${chapter}.
        Format your response EXACTLY as a JSON object with this structure:
        {
            "question": "The question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0,
            "explanation": "Detailed explanation of why this is the correct answer"
        }
        Make sure to escape any quotes in the text and ensure the response is valid JSON.`;

        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to generate question');
            }

            const data = await response.json();
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
                throw new Error('Invalid response format from API');
            }

            const generatedText = data.candidates[0].content.parts[0].text;
            
            // Extract JSON from the response text
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in response');
            }

            const questionData = JSON.parse(jsonMatch[0]);
            
            // Validate the question data structure
            if (!questionData.question || !Array.isArray(questionData.options) || 
                questionData.options.length !== 4 || typeof questionData.correctAnswer !== 'number' ||
                !questionData.explanation) {
                throw new Error('Invalid question data format');
            }

            return questionData;
        } catch (error) {
            console.error('Error generating question:', error);
            throw error;
        }
    }
}

// Function to initialize the question generator
async function initQuestionGenerator() {
    return new QuestionGenerator();
}

// Function to display a question
function displayQuestion(questionData, container) {
    container.innerHTML = `
        <div class="question-container">
            <h3 class="question-text">${questionData.question}</h3>
            <div class="options-container">
                ${questionData.options.map((option, index) => `
                    <div class="option">
                        <input type="radio" name="answer" id="option${index}" value="${index}">
                        <label for="option${index}">${option}</label>
                    </div>
                `).join('')}
            </div>
            <button id="check-answer" class="primary-btn">Check Answer</button>
            <div id="explanation" class="explanation hidden"></div>
        </div>
    `;

    // Add event listener for the check answer button
    const checkButton = container.querySelector('#check-answer');
    const explanationDiv = container.querySelector('#explanation');
    
    checkButton.addEventListener('click', () => {
        const selectedAnswer = container.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            alert('Please select an answer');
            return;
        }

        const selectedIndex = parseInt(selectedAnswer.value);
        const isCorrect = selectedIndex === questionData.correctAnswer;
        
        // Show the explanation
        explanationDiv.innerHTML = `
            <div class="${isCorrect ? 'correct' : 'incorrect'}">
                <h4>${isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                <p>${questionData.explanation}</p>
            </div>
        `;
        explanationDiv.classList.remove('hidden');
        
        // Disable further selections
        container.querySelectorAll('input[name="answer"]').forEach(input => {
            input.disabled = true;
        });
        checkButton.disabled = true;

        // Add visual feedback to options
        container.querySelectorAll('.option').forEach((option, index) => {
            if (index === questionData.correctAnswer) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
    });
} 