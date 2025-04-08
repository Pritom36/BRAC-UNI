// Theme styles
const themes = {
    1: `
        body {
            font-family: 'Times New Roman', Times, serif;
    margin: 15px;
    line-height: 1.6;
            color: #333;
        }
        h1 {
            text-align: center;
            font-size: 24px;
            text-transform: uppercase;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }
        h2 {
            font-size: 20px;
            margin-top: 20px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
        }
        h3 {
            font-size: 18px;
            margin-top: 15px;
        }
        .question {
            margin-bottom: 20px;
        }
        .options {
            margin-left: 20px;
            list-style-type: lower-alpha;
        }
        .solution {
            margin-left: 20px;
            background-color: #f9f9f9;
            padding: 10px;
            border-left: 3px solid #3498db;
        }
        .answer {
            font-weight: bold;
            color: #d32f2f;
        }
        .summary {
            margin-top: 30px;
            border-top: 2px solid #000;
            padding-top: 10px;
        }
        .summary ul {
            list-style-type: none;
            padding-left: 0;
        }
        .summary li {
            margin-bottom: 5px;
        }
        .math {
            font-style: italic;
        }
    `,
    2: `
        body {
            font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            font-size: 16px;
    margin: 15px;
    line-height: 1.6;
            color: #333;
            background: #fcfcfc;
        }
        
        /* Main heading */
        h1 {
            font-size: 2rem;
            text-align: center;
            color: #2c3e50;
            margin: 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #2c3e50;
        }
        
        /* Section headings */
        h2 {
            font-size: 1.5rem;
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            padding: 5px 10px;
            border-left: 4px solid #3498db;
        }
        
        /* Question container */
        .question {
            background: #fff;
            margin: 15px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Question text */
        .question h3 {
            font-size: 1.25rem;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        /* Options styling */
        .options {
            list-style: none;
            padding-left: 0;
            margin: 10px 0;
        }
        .options li {
            padding: 8px 12px;
            margin: 6px 0;
            background: #f0f0f0;
            border-radius: 3px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .options li:hover {
            background: #e0e0e0;
        }
        
        /* Solution styling */
        .solution {
            background: #edf7ed;
            padding: 10px 15px;
            margin: 10px 0;
            border-left: 4px solid #27ae60;
            border-radius: 3px;
            font-size: 0.9rem;
        }
        .answer {
            margin-top: 8px;
            font-weight: bold;
            color: #16a085;
        }
        
        /* Math equations styling */
        .math {
            font-family: 'STIX Two Math', 'Cambria Math', serif;
            font-size: 1.1em;
            margin: 10px 0;
        }
        
        /* Paragraph styling */
        p {
            margin-bottom: 12px;
            text-align: justify;
        }
        
        /* Mobile responsiveness */
        @media screen and (max-width: 768px) {
            body {
                font-size: 15px;
                padding: 15px;
            }
            h1 {
                font-size: 1.8rem;
                padding: 10px 5px;
            }
            h2 {
                font-size: 1.3rem;
                margin-top: 20px;
            }
            .question {
                padding: 12px;
            }
            .options li {
                padding: 10px;
                font-size: 14px;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            body {
                background: #121212;
                color: #e0e0e0;
            }
            h1, h2, h3 {
                color: #fff;
            }
            .question {
                background: #1e1e1e;
            }
            .options li {
                background: #2a2a2a;
            }
            .options li:hover {
                background: #3a3a3a;
            }
            .solution {
                background: #2c2c2c;
                border-left-color: #8e44ad;
            }
        }
    `,
    3: `
        body {
            font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            font-size: 16px;
    margin: 15px;
    line-height: 1.6;
            background: #fcfcfc;
        }
        
        /* Main heading */
        h1 {
            font-size: 2rem;
            text-align: center;
            color: #2c3e50;
            margin: 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #2c3e50;
        }
        
        /* Section headings */
        h2 {
            font-size: 1.5rem;
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            padding: 5px 10px;
            background: #fff;
            border-left: 4px solid #3498db;
        }
        
        /* Question container */
        .question {
            background: #fff;
            margin: 15px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Question text */
        .question h3 {
            font-size: 1.25rem;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        /* Options styling */
        .options {
            list-style: none;
            padding-left: 0;
            margin: 10px 0;
        }
        .options li {
            padding: 8px 12px;
            margin: 6px 0;
            background: #f0f0f0;
            border-radius: 3px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .options li:hover {
            background: #e0e0e0;
        }
        
        /* Solution styling */
        .solution {
            background: #edf7ed;
            padding: 10px 15px;
            margin: 10px 0;
            border-left: 4px solid #27ae60;
            border-radius: 3px;
            font-size: 0.9rem;
        }
        .answer {
            margin-top: 8px;
            font-weight: bold;
            color: #16a085;
        }
        
        /* Math equations styling */
        .math {
            font-family: 'STIX Two Math', 'Cambria Math', serif;
            font-size: 1.1em;
            margin: 10px 0;
        }
        
        /* Paragraph styling */
        p {
            margin-bottom: 12px;
            text-align: justify;
        }
        
        /* Mobile responsiveness */
        @media screen and (max-width: 768px) {
            body {
                font-size: 15px;
                padding: 15px;
            }
            h1 {
                font-size: 1.8rem;
                padding: 10px 5px;
            }
            h2 {
                font-size: 1.3rem;
                margin-top: 20px;
            }
            .question {
                padding: 12px;
            }
            .options li {
                padding: 10px;
                font-size: 14px;
            }
        }
    `,
    4: `
        body {
            font-family: Arial, sans-serif;
    margin: 15px;
    line-height: 1.6;
            background-color: #f4f4f4;
        }
    `
};

// Apply selected theme
function setTheme(themeNumber) {
    const styleTag = document.getElementById('theme-style') || document.createElement('style');
    styleTag.id = 'theme-style';
    styleTag.innerHTML = themes[themeNumber];
    document.head.appendChild(styleTag);
    
    // Save theme preference
    localStorage.setItem('selectedTheme', themeNumber);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(parseInt(savedTheme));
    } else {
        // Set default theme if none saved
        setTheme(1);
    }
});

