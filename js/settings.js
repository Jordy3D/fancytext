// ▀█▀ █ █ █▀▀ █▀▄▀█ █▀▀
//  █  █▀█ ██▄ █ ▀ █ ██▄
// #region Theme

const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");

// Function to load theme preference from localStorage
function loadThemePreference() {
    if (localStorage.getItem("theme") === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeToggle.checked = true;
        themeLabel.textContent = "Light";
    }
}

// Function to save theme preference to localStorage
function saveThemePreference() {
    if (themeToggle.checked) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

// Setup theme toggle listener
themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
    saveThemePreference();
});

// Initialize theme on page load
loadThemePreference();

// #endregion

// █ █▄ █ █▀█ █ █ ▀█▀ 
// █ █ ▀█ █▀▀ █▄█  █  
// #region Input

// function to load saved input values from localStorage
function loadInputValues() {
    wordInput.value = localStorage.getItem("wordInput") || "";
    commentInput.value = localStorage.getItem("commentInput") || "";
    styleInput.value = localStorage.getItem("styleInput") || "lines"; // Default to "lines"
}

// function to save input values to localStorage
function saveInputValues() {
    localStorage.setItem("wordInput", wordInput.value);
    localStorage.setItem("commentInput", commentInput.value);
    localStorage.setItem("styleInput", styleInput.value);
}

// when the page has loaded
document.addEventListener("DOMContentLoaded", () => {
    // Load saved input values
    loadInputValues();
    
    // Generate initial style previews
    generateStylePreviews();
    
    // Set initial output and check for unsupported characters
    setOutput(displayWord(wordInput.value, styleInput.value));
});

// #endregion