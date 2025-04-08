// Content protection code
(function() {
    // Allow selection for navbar elements
    function allowSelection(element) {
        return element.closest('.navbar') || 
               element.closest('.dropdown') || 
               element.closest('.dropdown-content');
    }

    // Prevent text selection except navbar
    document.addEventListener('selectstart', function(e) {
        if (!allowSelection(e.target)) {
            e.preventDefault();
            return false;
        }
    });

    // Prevent right-click except navbar
    document.addEventListener('contextmenu', function(e) {
        if (!allowSelection(e.target)) {
            e.preventDefault();
            return false;
        }
    });

    // Prevent keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Allow theme-related actions in navbar
        if (e.target.closest('.navbar')) {
            return true;
        }
        
        // Prevent common shortcuts
        if ((e.ctrlKey || e.metaKey) && 
            (e.key === 'c' || 
             e.key === 'x' || 
             e.key === 'p' ||
             e.key === 's' ||
             (e.shiftKey && e.key === 'i') ||
             e.key === 'F12')) {
            e.preventDefault();
            return false;
        }
    });

    // Add watermark
    const watermark = document.createElement('div');
    watermark.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 60px;
        color: rgba(0,0,0,0.1);
        pointer-events: none;
        z-index: 1000;
        white-space: nowrap;
    `;
    watermark.textContent = "CATALYST";
    document.body.appendChild(watermark);
})();