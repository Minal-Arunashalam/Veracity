
//event listener on button click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkFacts').addEventListener('click', function() {
        // Send a message to the background script
        chrome.runtime.sendMessage({action: "extractArticleContent"}, (response) => {
            // Display the extracted content
            let factResultsDiv = document.getElementById('factResults');
            factResultsDiv.textContent = response ? response.text : 'Extraction failed';
        });
    });
});



//TODO: send article data to gpt api, ask it to get facts about topic, and retrieve response, then call display function to update popup DOM



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