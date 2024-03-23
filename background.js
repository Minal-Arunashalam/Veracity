
//background script to receive extraction message and call extraction function
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractArticleContent") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: extractPageContent
            }, (results) => {
                // Send the extraction results back to the popup
                if (results && results.length > 0) {
                    sendResponse({title: results[0].result.title, text: results[0].result.text});
                } else {
                    sendResponse(null);
                }
            });
        });
        return true; // send response asynchronously
    }
});

function extractPageContent() {
    let title = document.title;
    let text = document.body.innerText || document.body.textContent; // Using innerText to avoid scripts/styles content
    return {title, text};
}

