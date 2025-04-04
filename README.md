# AP Exam Study Helper

A web application to help students prepare for AP exams by generating practice questions using AI.

## Features

- Select AP classes you're studying for
- Choose specific chapters to focus on
- Generate AI-powered practice questions
- Interactive question interface with explanations
- Mobile-responsive design

## Project Structure

```
frontend/
├── index.html              # Landing page
├── select-classes.html     # Class selection page
├── select-chapters.html    # Chapter selection page
├── generate-questions.html # Question generation page
├── css/
│   ├── styles.css
│   ├── select-classes.css
│   ├── select-chapters.css
│   └── generate-questions.css
└── js/
    ├── classes-data.js
    ├── select-classes.js
    ├── select-chapters.js
    └── generate-questions.js

backend/
├── server.js              # Node.js/Express server
├── package.json
└── .env                  # Environment variables (not in repo)
```

## Setup

1. Frontend (GitHub Pages):
   - Visit: [https://your-username.github.io/ap-exam-study-helper](https://your-username.github.io/ap-exam-study-helper)

2. Backend (Local Development):
   ```bash
   cd backend
   npm install
   npm start
   ```

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI: Hugging Face Inference API
- Hosting: GitHub Pages (Frontend), Your choice of hosting (Backend)

## Contributing

Feel free to submit issues and enhancement requests! 