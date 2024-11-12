
const spaceBetweenLetters = false;

const wordInput = document.getElementById("input");
const commentInput = document.getElementById("comment");
const styleInput = document.getElementById("style");

const copyButton = document.getElementById("copy");

const output = document.getElementById("output");

function setOutput(text) {
    output.innerHTML = text;
}

// set input listener
wordInput.addEventListener("input", () => {
    setOutput(displayWord(wordInput.value, styleInput.value));
});
commentInput.addEventListener("input", () => {
    setOutput(displayWord(wordInput.value, styleInput.value));
});

// update on change of style
styleInput.addEventListener("change", () => {
    setOutput(displayWord(wordInput.value, styleInput.value));
});


setOutput(displayWord(wordInput.value, styleInput.value));

function setTextTemp(text, element, time = 1000) {
    let originalText = element.innerText;
    // set the text of an element temporarily
    element.innerText = text;

    setTimeout(() => {
        element.innerText = originalText;
    }, time);
}

// set copy button listener
copyButton.addEventListener("click", () => {
    navigator.clipboard
        .writeText(document.getElementById("output").innerText)
        .then(() => {
            setTextTemp("Copied!", copyButton);
        });
});

function displayWord(word, styleName = "lines") {
    console.log("displaying word", word);

    word = word.toLowerCase();

    // display the word
    var display = [];

    // if there's no word, return an empty string
    if (!word) return "";

    var style = styles[styleName.toLowerCase()];

    // set the letter size to the number of lines in the first letter
    var letterSize =
        styles[styleName.toLowerCase()][word[0]].length;

    // for each letter in the word
    for (var i = 0; i < letterSize; i++) {
        // add the letter to the display
        display.push(
            word
                .split("")
                .map((letter) => {
                    if (!style[letter]) return " ".repeat(letterSize);

                    return style[letter][i];
                })
                .join(spaceBetweenLetters ? " " : "")
        );
    }

    // add the comment to the start of each line
    if (commentInput.value) {
        display = commentContent(display, commentInput.value);
        output.classList.add("comment");
    } else {
        output.classList.remove("comment");
    }

    // return the display
    return display.join("\n");
}

/**
 * Wrap or comment content with a comment string
 * @param {string[]} content 
 * @param {string} commentString 
 * @returns 
 */
function commentContent(content, commentString) {
    if (!commentString) return content;

    if (!commentString.endsWith("*")) {             // single line comment
        return content.map((line) => {
            return `${commentString} ${line}`;
        });
    }
    else {                                          // block comment
        return content.map((line, index) => {
            if (index === 0)
                return `${commentString}\n${line}`;
            else if (index === content.length - 1) {
                let out = "";
                out = commentString.split("").reverse().join("");
                // flip any { or } characters (for comments like in React)
                
                out = out.replace(/{/g, "}");
                return `${line}\n${out}`;
            }
            else
                return line;
        });
    }
}