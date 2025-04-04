document.addEventListener('DOMContentLoaded', () => {
    const subjectsContainer = document.getElementById('subjects-container');
    const selectedCount = document.getElementById('selected-count');
    const continueBtn = document.getElementById('continue-btn');
    const selectAllBtn = document.getElementById('select-all');
    const deselectAllBtn = document.getElementById('deselect-all');
    const selectedClassHeader = document.getElementById('selected-class');

    // Define the order of subjects as they appear in the selection page
    const subjectOrder = [
        // Mathematics
        "calculus-ab", "calculus-bc", "statistics", "precalculus",
        // Science
        "biology", "chemistry", "environmental-science", 
        "physics-1", "physics-2", "physics-c-mechanics", "physics-c-em",
        // Computer Science
        "computer-science-a", "computer-science-principles",
        // English
        "english-language", "english-literature",
        // Social Sciences
        "psychology", "human-geography",
        // History and Government
        "us-history", "world-history", "european-history",
        "gov-politics-us", "gov-politics-comp",
        // Economics
        "macroeconomics", "microeconomics",
        // Capstone
        "seminar", "research"
    ];

    // Get selected classes from localStorage
    const selectedClasses = JSON.parse(localStorage.getItem('selectedClasses') || '[]');
    
    // Create a new array with the selected classes in the correct order
    const orderedSelectedClasses = subjectOrder.filter(subject => selectedClasses.includes(subject));
    
    // Update the header to show selected classes
    if (orderedSelectedClasses.length > 0) {
        const classNames = orderedSelectedClasses.map(id => classChapters[id]?.name || id).join(', ');
        selectedClassHeader.textContent = `Selected Classes: ${classNames}`;
    } else {
        selectedClassHeader.textContent = 'No classes selected';
        subjectsContainer.innerHTML = '<p class="no-classes">Please go back and select some classes first.</p>';
        return;
    }

    const selectedChapters = new Set();

    // Function to update the selection count and button state
    const updateSelectionState = () => {
        selectedCount.textContent = selectedChapters.size;
        continueBtn.disabled = selectedChapters.size === 0;
    };

    // Function to toggle all chapters in a subject
    const toggleSubjectChapters = (subjectId, checked) => {
        const checkboxes = document.querySelectorAll(`#${subjectId} .chapter-checkbox`);
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
            const chapterId = checkbox.getAttribute('data-chapter-id');
            if (checked) {
                selectedChapters.add(chapterId);
            } else {
                selectedChapters.delete(chapterId);
            }
        });
        updateSelectionState();
    };

    // Create HTML for each selected subject and its chapters in order
    orderedSelectedClasses.forEach(subjectId => {
        const subjectData = classChapters[subjectId];
        if (!subjectData) return;

        const section = document.createElement('section');
        section.className = 'subject-section';
        section.id = `subject-${subjectId}`;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'subject-title';
        titleDiv.innerHTML = `
            <span>${subjectData.name}</span>
            <span class="select-toggle" data-subject="${subjectId}">Select All</span>
        `;

        const chaptersGrid = document.createElement('div');
        chaptersGrid.className = 'chapters-grid';

        subjectData.chapters.forEach((chapter, index) => {
            const chapterId = `${subjectId}-chapter-${index}`;
            const chapterDiv = document.createElement('div');
            chapterDiv.className = 'chapter-item';
            chapterDiv.innerHTML = `
                <input type="checkbox" class="chapter-checkbox" 
                       id="${chapterId}" 
                       data-chapter-id="${chapterId}"
                       data-subject="${subjectId}"
                       data-chapter-index="${index}">
                <label class="chapter-label" for="${chapterId}">${chapter}</label>
            `;
            chaptersGrid.appendChild(chapterDiv);
        });

        section.appendChild(titleDiv);
        section.appendChild(chaptersGrid);
        subjectsContainer.appendChild(section);
    });

    // Event delegation for chapter selection
    subjectsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('chapter-checkbox')) {
            const chapterId = e.target.getAttribute('data-chapter-id');
            if (e.target.checked) {
                selectedChapters.add(chapterId);
            } else {
                selectedChapters.delete(chapterId);
            }
            updateSelectionState();
        }
    });

    // Event delegation for "Select All" toggle per subject
    subjectsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('select-toggle')) {
            const subjectId = `subject-${e.target.getAttribute('data-subject')}`;
            const allChecked = Array.from(document.querySelectorAll(`#${subjectId} .chapter-checkbox`))
                                  .every(checkbox => checkbox.checked);
            
            toggleSubjectChapters(subjectId, !allChecked);
            e.target.textContent = !allChecked ? 'Deselect All' : 'Select All';
        }
    });

    // Global Select All / Deselect All buttons
    selectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.chapter-checkbox').forEach(checkbox => {
            checkbox.checked = true;
            selectedChapters.add(checkbox.getAttribute('data-chapter-id'));
        });
        document.querySelectorAll('.select-toggle').forEach(toggle => {
            toggle.textContent = 'Deselect All';
        });
        updateSelectionState();
    });

    deselectAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.chapter-checkbox').forEach(checkbox => {
            checkbox.checked = false;
            selectedChapters.delete(checkbox.getAttribute('data-chapter-id'));
        });
        document.querySelectorAll('.select-toggle').forEach(toggle => {
            toggle.textContent = 'Select All';
        });
        updateSelectionState();
    });

    // Back button click handler
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
        window.location.href = 'select-classes.html';
    });

    // Continue button click handler
    continueBtn.addEventListener('click', () => {
        // Save selected chapters to localStorage
        const selectedChapters = [];
        document.querySelectorAll('.chapter-checkbox:checked').forEach(checkbox => {
            const chapter = checkbox.closest('.chapter');
            const subject = chapter.closest('.subject');
            selectedChapters.push({
                subject: subject.querySelector('.subject-title').textContent,
                chapterName: chapter.querySelector('.chapter-title').textContent
            });
        });
        localStorage.setItem('selectedChapters', JSON.stringify(selectedChapters));
        
        // Navigate to the question generation page
        window.location.href = 'generate-questions.html';
    });
}); 