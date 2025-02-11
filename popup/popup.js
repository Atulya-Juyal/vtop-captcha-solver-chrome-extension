document.getElementById("solveCaptcha").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                files: ["content.js"]
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Error injecting script:", chrome.runtime.lastError.message);
                } else {
                    console.log("Script executed successfully!");
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});
