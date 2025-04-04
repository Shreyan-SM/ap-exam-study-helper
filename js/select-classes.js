document.addEventListener('DOMContentLoaded', () => {
    const classCards = document.querySelectorAll('.class-card');
    const selectedCount = document.getElementById('selected-count');
    const continueBtn = document.getElementById('continue-btn');
    const deselectAllBtn = document.getElementById('deselect-all');
    
    // Initialize selectedClasses from localStorage
    const selectedClasses = new Set(JSON.parse(localStorage.getItem('selectedAPClasses') || '[]'));
    
    // Function to update the selection count and button state
    const updateSelectionState = () => {
        selectedCount.textContent = selectedClasses.size;
        continueBtn.disabled = selectedClasses.size === 0;
        // Update localStorage whenever the selection changes
        localStorage.setItem('selectedAPClasses', JSON.stringify([...selectedClasses]));
    };

    // Restore previously selected classes
    classCards.forEach(card => {
        const subject = card.dataset.subject;
        if (selectedClasses.has(subject)) {
            card.classList.add('selected');
        }
    });

    // Update initial state
    updateSelectionState();

    // Add click handlers to all class cards
    classCards.forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.dataset.subject;
            
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedClasses.delete(subject);
            } else {
                card.classList.add('selected');
                selectedClasses.add(subject);
            }

            updateSelectionState();
        });
    });

    // Handle deselect all button click
    deselectAllBtn.addEventListener('click', () => {
        classCards.forEach(card => {
            card.classList.remove('selected');
            selectedClasses.delete(card.dataset.subject);
        });
        updateSelectionState();
    });

    // Handle continue button click
    continueBtn.addEventListener('click', () => {
        // Store selected classes in localStorage
        localStorage.setItem('selectedAPClasses', JSON.stringify([...selectedClasses]));
        // Redirect to the chapter selection page
        window.location.href = 'select-chapters.html';
    });
});

function initializeClassSelection() {
    const classCards = document.querySelectorAll('.class-card');
    const continueBtn = document.getElementById('continue-btn');
    const selectionCount = document.getElementById('selection-count');
    let selectedClasses = new Set();

    // Add select all buttons for each subject section
    document.querySelectorAll('.subject-section').forEach(section => {
        const subjectTitle = section.querySelector('.subject-title').textContent;
        const classCards = section.querySelectorAll('.class-card');
        const selectAllBtn = document.createElement('button');
        selectAllBtn.className = 'secondary-btn';
        selectAllBtn.textContent = 'Select All';
        selectAllBtn.style.marginBottom = '1rem';
        
        section.querySelector('.subject-title').after(selectAllBtn);

        selectAllBtn.addEventListener('click', () => {
            const allSelected = Array.from(classCards).every(card => card.classList.contains('selected'));
            
            classCards.forEach(card => {
                if (allSelected) {
                    // Deselect all
                    card.classList.remove('selected');
                    selectedClasses.delete(card.dataset.className);
                } else {
                    // Select all
                    card.classList.add('selected');
                    selectedClasses.add(card.dataset.className);
                }
            });

            selectAllBtn.textContent = allSelected ? 'Select All' : 'Deselect All';
            updateSelectionCount();
            updateContinueButton();
        });
    });

    function updateSelectionCount() {
        selectionCount.textContent = `${selectedClasses.size} classes selected`;
    }

    function updateContinueButton() {
        if (selectedClasses.size > 0) {
            continueBtn.removeAttribute('disabled');
            continueBtn.classList.remove('disabled');
        } else {
            continueBtn.setAttribute('disabled', 'true');
            continueBtn.classList.add('disabled');
        }
    }

    classCards.forEach(card => {
        card.addEventListener('click', () => {
            const className = card.dataset.className;
            
            if (card.classList.toggle('selected')) {
                selectedClasses.add(className);
            } else {
                selectedClasses.delete(className);
            }

            // Update the select all button for this section
            const section = card.closest('.subject-section');
            const selectAllBtn = section.querySelector('.secondary-btn');
            const sectionCards = section.querySelectorAll('.class-card');
            const allSelected = Array.from(sectionCards).every(card => card.classList.contains('selected'));
            selectAllBtn.textContent = allSelected ? 'Deselect All' : 'Select All';

            updateSelectionCount();
            updateContinueButton();
        });
    });

    // Initialize counts
    updateSelectionCount();
    updateContinueButton();

    // Handle continue button click
    continueBtn.addEventListener('click', () => {
        if (selectedClasses.size > 0) {
            localStorage.setItem('selectedClasses', JSON.stringify(Array.from(selectedClasses)));
            window.location.href = 'select-chapters.html';
        }
    });
} 