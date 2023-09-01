// Fetch the extension version from the manifest
const extensionVersion = chrome.runtime.getManifest().version;

// Update the version placeholder element
const extensionVersionElement = document.getElementById('extensionVersion');
extensionVersionElement.textContent = `v${extensionVersion}`;

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
