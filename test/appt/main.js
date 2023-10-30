function translateToPastPassive() {
    const inputText = document.getElementById("input").value;
    const outputElement = document.getElementById("output");

    if (inputText.trim() === "") {
        outputElement.textContent = "Please enter a paragraph.";
        return;
    }

    // Send the input paragraph to the server for translation
    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paragraph: inputText }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            outputElement.textContent = data.result;
        } else {
            outputElement.textContent = "Translation failed.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
