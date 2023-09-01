// Fetch the extension version from the manifest
const extensionVersion = chrome.runtime.getManifest().version;

// Update the version placeholder element
const extensionVersionElement = document.getElementById('extensionVersion');
extensionVersionElement.textContent = `v${extensionVersion}`;

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'DOMContentLoaded') {
    // You can update the popup HTML or display a message here
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Page has fully loaded!'; // Customize the message as needed
  }
});

let isReading = false;

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
