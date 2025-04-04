document.addEventListener('DOMContentLoaded', () => {
    const selectedChaptersList = document.getElementById('selected-chapters-list');
    const backBtn = document.getElementById('back-btn');
    const generateBtn = document.getElementById('generate-btn');

    // Get selected chapters from localStorage
    const selectedChapters = JSON.parse(localStorage.getItem('selectedChapters') || '[]');
    
    // Display selected chapters
    const displaySelectedChapters = () => {
        // Clear existing content
        selectedChaptersList.innerHTML = '';
        
        // Group chapters by subject
        const chaptersBySubject = {};
        
        selectedChapters.forEach(chapterId => {
            const [subjectId, , index] = chapterId.split('-');
            const subject = classChapters[subjectId];
            
            if (subject) {
                if (!chaptersBySubject[subject.name]) {
                    chaptersBySubject[subject.name] = [];
                }
                chaptersBySubject[subject.name].push({
                    name: subject.chapters[index],
                    id: chapterId
                });
            }
        });

        // Create chapter cards grouped by subject
        Object.entries(chaptersBySubject).forEach(([subjectName, chapters]) => {
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'chapter-card';
            
            const subjectContent = `
                <h3>${subjectName}</h3>
                <p>${chapters.map(chapter => chapter.name).join(', ')}</p>
            `;
            
            subjectDiv.innerHTML = subjectContent;
            selectedChaptersList.appendChild(subjectDiv);
        });
    };

    // Initialize the page
    displaySelectedChapters();

    // Handle back button click
    backBtn.addEventListener('click', () => {
        window.location.href = 'select-chapters.html';
    });

    // Handle generate button click
    generateBtn.addEventListener('click', () => {
        const settings = {
            questionCount: document.getElementById('question-count').value,
            difficulty: document.getElementById('difficulty').value,
            questionType: document.getElementById('question-type').value
        };
        
        // Store settings in localStorage
        localStorage.setItem('questionSettings', JSON.stringify(settings));
        
        // Redirect to the practice page
        window.location.href = 'practice.html';
    });
});

// Configuration object for API endpoints
const config = {
    development: {
        apiUrl: 'http://localhost:3000/api'
    },
    production: {
        apiUrl: 'https://your-backend-url.com/api' // Replace with your hosted backend URL
    }
};

const API_BASE_URL = config.development.apiUrl; // Change to production when deploying

async function generateQuestion(subject, chapter) {
    try {
        const response = await fetch(`${API_BASE_URL}/generate-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject, chapter })
        });

        if (!response.ok) {
            throw new Error('Failed to generate question');
        }

        const questionData = await response.json();
        displayQuestion(questionData);
    } catch (error) {
        console.error('Error generating question:', error);
        // Show error message to user
        document.getElementById('question-container').innerHTML = `
            <div class="error-message">
                Failed to generate question. Please try again later.
            </div>
        `;
    }
}

function displayQuestion(questionData) {
    const container = document.getElementById('question-container');
    container.innerHTML = `
        <div class="question">
            <h3>${questionData.question}</h3>
            <div class="options">
                ${questionData.options.map(option => `
                    <div class="option">
                        <input type="radio" name="answer" value="${option[0]}">
                        <label>${option}</label>
                    </div>
                `).join('')}
            </div>
            <button id="submit-answer" class="cta-button">Submit Answer</button>
            <div id="explanation" class="hidden"></div>
        </div>
    `;

    // Add submit handler
    document.getElementById('submit-answer').addEventListener('click', () => {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            alert('Please select an answer');
            return;
        }

        const explanation = document.getElementById('explanation');
        explanation.classList.remove('hidden');
        if (selectedAnswer.value === questionData.correctAnswer) {
            explanation.innerHTML = `
                <div class="correct">Correct! ✓</div>
                <p>${questionData.explanation}</p>
            `;
        } else {
            explanation.innerHTML = `
                <div class="incorrect">Incorrect ✗</div>
                <p>The correct answer is ${questionData.correctAnswer}.</p>
                <p>${questionData.explanation}</p>
            `;
        }
    });
} 