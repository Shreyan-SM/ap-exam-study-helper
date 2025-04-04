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