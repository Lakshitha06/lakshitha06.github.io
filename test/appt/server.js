const express = require('express');
const bodyParser = require('body-parser');
const spacy = require('spacy-js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Load the spaCy model
spacy.load('en_core_web_sm');

app.post('/translate', (req, res) => {
    const { paragraph } = req.body;

    if (!paragraph) {
        return res.status(400).json({ error: 'Invalid request format' });
    }

    // Use spaCy.js to translate the paragraph into past passive tense
    const doc = spacy(paragraph);
    const translatedSentences = doc.sents.map(sentence => {
        // Your translation logic here
        // Example: Change subject to past passive tense
        const pastPassiveSentence = sentence.map(token => {
            if (token.dep_ === 'nsubj' || token.dep_ === 'nsubjpass') {
                return token.text + ' was ' + token.text + 'ed';
            }
            return token.text;
        });
        return pastPassiveSentence.join(' ');
    });

    const result = translatedSentences.join('. ');

    res.json({ result });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
