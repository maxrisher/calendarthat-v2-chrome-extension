// Listener for on installed
// create_context_menu()
// defaults: set_settings(authenticated=no, default_calendar=gcal, download_ics=no)

// Listener for context menu item clicked:
// create_calendar_event()

import { CALENDARTHAT_BASE_URL } from "./helpers.js";
import { EventManager } from "./event_manager.js";

chrome.runtime.onInstalled.addListener(async() => {
    chrome.contextMenus.create({
        id: 'createCalendarEvent',
        title: 'CalendarThat',
        contexts: ['selection']
    });
    
    const defaults = {
        authenticated: false,
        defaultCalendar: 'gcal_link',
        downloadIcs: false
    };

    await chrome.storage.local.set(defaults);
})

chrome.contextMenus.onClicked.addListener(async(info, tab) => {
    if (info.menuItemId === 'createCalendarEvent') {
        if (!info.selectionText.trim()) return;

        const settings = await chrome.storage.local.get([
            'authenticated', 
            'defaultCalendar', 
            'downloadIcs'])

        if (!settings.authenticated) {
            chrome.tabs.create({ url: `${CALENDARTHAT_BASE_URL}` });
            return;
        }

        const event_manager = new EventManager(settings.defaultCalendar, settings.downloadIcs)
        await event_manager.create_or_logout(info.selectionText);
    }
})