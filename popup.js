// Fetch the extension version from the manifest
const extensionVersion = chrome.runtime.getManifest().version;

// Update the version placeholder element
const extensionVersionElement = document.getElementById('extensionVersion');
extensionVersionElement.textContent = `v${extensionVersion}`;

// Send a message to the content script to request page loading status
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'checkPageLoaded' });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'pageLoaded') {
    // The content script has confirmed that the page is loaded
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Page Loaded!';
  } 
  else {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Page Loading!'; 
  }
});

document.getElementById('pause').addEventListener('click', () => {
  sendMessageToContentScript('pause');
});

document.getElementById('play').addEventListener('click', () => {
  sendMessageToContentScript('play');
});

function sendMessageToContentScript(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action });
  });
}
