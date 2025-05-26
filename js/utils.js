function commentContent(content, commentString) {
    if (!commentString) return content;    // Handle special comment formats
    if (commentString.startsWith('/***')) {
        // Multi-line block comment format: /***...*/
        const result = [];
        result.push(commentString); // Add opening comment
        // Add ' *' prefix to each content line
        for (const line of content) {
            result.push(` * ${line}`);
        }
        result.push(' */'); // Add closing comment
        return result;
    } else if (commentString.trim() === '<!--') {
        // HTML comment format - only match exact '<!--'
        const result = [];
        result.push(commentString); // Add opening HTML comment tag
        // Add content lines
        for (const line of content) {
            result.push(line);
        }
        result.push('-->'); // Add closing HTML comment tag
        return result;
    } else if (commentString.startsWith('--[[')) {
        // Lua-style comment block: --[[...--]]
        const result = [...content];
        result.unshift(commentString); // Add opening comment
        result.push('--]]'); // Add closing comment
        return result;
    } else if (commentString.startsWith('echo "')) {
        // Echo command format
        return content.map(line => `echo "${line}";`);
    } else if (!commentString.endsWith("*")) {// single line comment
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

function setTextTemp(text, element, time = 1000) {
    let originalText = element.innerText;
    // set the text of an element temporarily
    element.innerText = text;

    setTimeout(() => {
        element.innerText = originalText;
    }, time);
}