// Configuration for the Gemini API
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = 'AIzaSyD_cNfRm7aP13asPjDwk16i6X1TvVu7-No';

class QuestionGenerator {
    constructor() {
        // No need to pass API key in constructor anymore
    }

    async generateQuestion(subject, chapter) {
        const prompt = `Generate an AP-level multiple choice question for ${subject} - ${chapter}.
        Format your response as a JSON object with this structure:
        {
            "question": "The question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0,  // Index of the correct answer (0-3)
            "explanation": "Detailed explanation of why this is the correct answer"
        }`;

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
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to generate question');
            }

            const data = await response.json();
            const generatedText = data.candidates[0].content.parts[0].text;
            return JSON.parse(generatedText);
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
    });
} 