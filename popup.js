
//event listener on button click
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('checkFacts').addEventListener('click', function() {
//         // Send a message to the background script
//         chrome.runtime.sendMessage({action: "extractArticleContent"}, (response) => {
//             // Display the extracted content
//             let factResultsDiv = document.getElementById('factResults');
//             factResultsDiv.textContent = response ? response.text : 'Extraction failed';
//         });
//     });
// });



//TODO: send article data to gpt api, ask it to get facts about topic, and retrieve response, then call display function to update popup DOM
// Send article data to GPT API for summarization
async function summarizeArticle(text) {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer key', //replace with apikey 
            },
            body: JSON.stringify({
                prompt: text,
                max_tokens: 50, // Adjust max tokens as per your preference for summary length
                temperature: 0.7, // Adjust temperature for diversity in summaries
                top_p: 1.0,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to summarize article');
        }

        const data = await response.json();
        return data.choices[0].text.trim(); // Extract summarized text from response
    } catch (error) {
        console.error('Error summarizing article:', error);
        return null;
    }
}

// Event listener on button click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkFacts').addEventListener('click', async function() {
        try {
            // Send a message to the background script to extract article content
            const extractionResponse = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ action: "extractArticleContent" }, (response) => {
                    if (response) {
                        resolve(response);
                    } else {
                        reject(new Error('Extraction failed'));
                    }
                });
            });

            // Extracted article content
            const articleText = extractionResponse ? extractionResponse.text : '';

            // Summarize article using GPT API
            const summarizedText = await summarizeArticle(articleText);

            // Display summarized text in popup
            if (summarizedText) {
                displayFacts([summarizedText]);
            } else {
                displayError('Failed to summarize article');
            }
        } catch (error) {
            displayError(error.message);
        }
    });
});



//update popup window with facts in bullet point format
function displayFacts(facts) {
    let factResultsDiv = document.getElementById('factResults');
    factResultsDiv.innerHTML = '';

    // Create an unordered list to hold the facts
    let factList = document.createElement('ul');

    facts.forEach(fact => {
        // Create a list item for each fact
        let factItem = document.createElement('li');

        factItem.textContent = fact;
        // Append the list item to the unordered list
        factResultsDiv.appendChild(factItem);
    });
    // Append the unordered list to the factResultsDiv
    factResultsDiv.appendChild(factList);
}


//error displayer
function displayError(message) {
    let factResultsDiv = document.getElementById('factResults');
    factResultsDiv.innerHTML = '<div style="color: red;">' + message + '</div>';
}