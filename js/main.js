// █▀▀ █▀█ █▄ █ █▀ ▀█▀ █▀ 
// █▄▄ █▄█ █ ▀█ ▄█  █  ▄█ 
// #region Constants

const spaceBetweenLetters = false;

const wordInput = document.getElementById("input");
const commentInput = document.getElementById("comment");
const styleInput = document.getElementById("style");

const copyButton = document.getElementById("copy");
const clearButton = document.getElementById("clear");
const stylePreview = document.getElementById("style-preview");

const output = document.getElementById("output");

// #endregion

// █ █▄ █ █▀█ █ █ ▀█▀   ▄▀█ █▄ █ █▀▄   █▀█ █ █ ▀█▀ █▀█ █ █ ▀█▀ 
// █ █ ▀█ █▀▀ █▄█  █    █▀█ █ ▀█ █▄▀   █▄█ █▄█  █  █▀▀ █▄█  █  
// #region Input and Output

function setOutput(text) {
    output.textContent = text;
}

// set input listener
wordInput.addEventListener("input", () => {
    const result = displayWord(wordInput.value, styleInput.value);
    setOutput(result);
    saveInputValues(); // Save input values to localStorage
});
commentInput.addEventListener("input", () => {
    const result = displayWord(wordInput.value, styleInput.value);
    setOutput(result);
    saveInputValues(); // Save input values to localStorage

    // update the style preview when comment changes
    generateStylePreviews(); // Update the style preview when comment changes
});

// update on change of style
styleInput.addEventListener("change", () => {
    const result = displayWord(wordInput.value, styleInput.value);
    setOutput(result);
    saveInputValues(); // Save input values to localStorage

    generateStylePreviews(); // Update the style preview when style changes
});

function displayWord(word, styleName = "lines") {
    // Track if we encounter unsupported characters
    let hasUnsupportedChars = false;

    // If the input is empty, there are no unsupported chars
    if (!word.trim()) {
        updateUnsupportedWarning(false);
        return "";
    }

    // Split input on newlines to process each line separately
    let lines = word.split('\n');
    let allDisplay = [];

    // Process each line
    for (let line of lines) {
        line = line.toLowerCase();

        // display the word
        var display = [];

        // if there's no word in this line, add an empty line
        if (!line) {
            allDisplay.push("");
            continue;
        }
        
        var style = styles[styleName.toLowerCase()];

        // Find the first valid character in the line to determine letter size
        // Default to 'a' if no valid characters are found
        let firstValidChar = 'a';
        for (let char of line) {
            if (style[char]) {
                firstValidChar = char;
                break;
            }
        }

        // set the letter size to the number of lines in the first valid letter
        var letterSize = style[firstValidChar].length;

        // for each letter in the word
        for (var i = 0; i < letterSize; i++) {
            // add the letter to the display
            display.push(line
                .split("").map((letter) => {
                    // Skip checking spaces - they're handled specially
                    if (letter === " ") return " ".repeat(letterSize);

                    // If the letter is not in the style, return a space of the same size
                    if (!style[letter]) {
                        hasUnsupportedChars = true;
                        return " ".repeat(letterSize);
                    }

                    // Make sure the character exists and the array has this index
                    if (!style[letter][i]) {
                        hasUnsupportedChars = true;
                        return " ".repeat(style[letter][0].length);
                    }

                    return style[letter][i];
                })
                .join(spaceBetweenLetters ? " " : "")
            );
        }

        // Add this line's display to the all display array
        allDisplay = allDisplay.concat(display);

        // Add a blank line between multiline entries
        if (lines.length > 1 && line !== lines[lines.length - 1]) {
            allDisplay.push("");
        }
    }

    // add the comment to the start of each line
    if (commentInput.value) {
        allDisplay = commentContent(allDisplay, commentInput.value);
        output.classList.add("comment");
    } else {
        output.classList.remove("comment");
    }
    
    // Update the warning display based on hasUnsupportedChars flag
    updateUnsupportedWarning(hasUnsupportedChars);

    // return the display
    return allDisplay.join("\n");
}

// Function to update the warning display
function updateUnsupportedWarning(hasUnsupportedChars) {
    const warningElement = document.getElementById("unsupported-warning");
    const outputHeader = document.querySelector(".output-header");
    
    if (hasUnsupportedChars) {
        warningElement.classList.remove("hidden");
        outputHeader.classList.add("has-unsupported");
    } else {
        warningElement.classList.add("hidden");
        outputHeader.classList.remove("has-unsupported");
    }
}
// #endregion

// █▀█ █▀█ █▀▀ █ █ █ █▀▀ █ █ █ 
// █▀▀ █▀▄ ██▄ ▀▄▀ █ ██▄ ▀▄▀▄▀ 
// #region Preview

function generateStylePreviews() {
    stylePreview.innerHTML = "";
    const previewText = "abc";
    const currentStyle = styleInput.value;

    // check if there is a comment input, and add or remove .comment class accordingly
    stylePreview.classList.remove("comment");
    if (commentInput.value) stylePreview.classList.add("comment");

    const card = document.createElement("div");
    card.classList.add("style-card");

    const styleName = document.createElement("div");
    styleName.classList.add("style-name");
    styleName.textContent = currentStyle;

    const styleExample = document.createElement("div");
    styleExample.classList.add("style-example");
    
    // Use textContent instead of innerHTML for safety when dealing with potentially HTML-like content
    const previewOutput = displayWord(previewText, currentStyle);
    styleExample.textContent = previewOutput;

    card.appendChild(styleName);
    card.appendChild(styleExample);

    stylePreview.appendChild(card);
}

// #endregion

// █▀▀ █ █ █▀▀ █▄ █ ▀█▀ █▀ 
// ██▄ ▀▄▀ ██▄ █ ▀█  █  ▄█  
// #region Events

// set copy button listener
copyButton.addEventListener("click", () => {
    navigator.clipboard
        .writeText(document.getElementById("output").innerText)
        .then(() => {
            setTextTemp("Copied!", copyButton);
        });
});

// set clear button listener
clearButton.addEventListener("click", () => {
    wordInput.value = "";
    commentInput.value = "";
    setOutput(displayWord("", styleInput.value));

    // save the cleared values to localStorage
    localStorage.setItem("wordInput", "");
    localStorage.setItem("commentInput", "");

    setTextTemp("cleared!", clearButton);
});

// #endregion

// █ █▄ █ █ ▀█▀ █ ▄▀█ █   █ █▀ ▄▀█ ▀█▀ █ █▀█ █▄ █ 
// █ █ ▀█ █  █  █ █▀█ █▄▄ █ ▄█ █▀█  █  █ █▄█ █ ▀█ 
// #region Initialisation

// Initialize the output with the current input values and check for unsupported characters
const initialOutput = displayWord(wordInput.value, styleInput.value);
setOutput(initialOutput);
generateStylePreviews();

// #endregion