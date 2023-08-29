// popup.js

// Fetch the extension version from the manifest
const extensionVersion = chrome.runtime.getManifest().version;

// Update the version placeholder element
const extensionVersionElement = document.getElementById('extensionVersion');
extensionVersionElement.textContent = `v${extensionVersion}`;

// 'Read Selected Text' Button Event Listener
document.getElementById('readSelectedText').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'readSelectedText' });
    });
});

// 'Start Reading From Selected Text' Button Event Listener
document.getElementById('startReading').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startReading' });
    });
});