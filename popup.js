//event listener on button click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkFacts').addEventListener('click', function() {
        //call article extraction function
        let articleContent = extractArticleContent();
        
        //for testing extraction:
        let factResultsDiv = document.getElementById('factResults');
        factResultsDiv.innerHTML = articleContent;  

        // if (articleContent){
        //     let factResultsDiv = document.getElementById('factResults');
        //     factResultsDiv.innerHTML = 'success'; 
        // }else{
        //     let factResultsDiv = document.getElementById('factResults');
        //     factResultsDiv.innerHTML = 'fail';  
        // }

        
        // call fact-checking function on article content (send article content to gpt)
        // factCheckArticle(articleContent);
    });
});

//TODO: extract article title & text
function extractArticleContent() {
    
    // let articleElement = document.querySelector('article');
    

    // Get the text content of the body element
    let bodyText = document.body.textContent;

    // Return an object containing the title and body text
    return bodyText;
    
    // if (articleElement) {
    //     return articleElement.textContent;
    // } else {
    //     return null;
    // }
    
}




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