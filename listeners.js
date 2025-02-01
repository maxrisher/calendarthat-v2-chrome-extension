chrome.runtime.onInstalled.addListener(() => {
    createContextMenu();
    setDefaultSettings();
})

chrome.contextMensus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'createCalendarEvent') {
        EventManager.create_or_logout(info.selectionText);
    }
})