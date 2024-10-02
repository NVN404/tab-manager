chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveTabs') {
      chrome.tabs.query({}, (tabs) => {
        const urls = tabs.map(tab => tab.url);
        chrome.storage.local.set({ tabs: urls }, () => {
          console.log('Tabs saved:', urls);
        });
      });
    } else if (request.action === 'restoreTabs') {
      chrome.storage.local.get(['tabs'], (result) => {
        const urls = result.tabs || [];
        urls.forEach(url => {
          chrome.tabs.create({ url });
        });
      });
    }
  });
  