// Listener for on installed
// create_context_menu()
// defaults: set_settings(authenticated=no, default_calendar=gcal, download_ics=no)

// Listener for context menu item clicked:
// create_calendar_event()

import { CALENDARTHAT_BASE_URL, set_auth } from "./helpers.js";
import { EventManager } from "./event_manager.js";

chrome.runtime.onInstalled.addListener(async() => {
    chrome.contextMenus.create({
        id: 'createCalendarEvent',
        title: 'CalendarThat',
        contexts: ['selection']
    });
    
    const defaults = {
        authenticated: false,
        outlook_link: false,
        gcal_link: true,
        download_ics: false
    };

    await chrome.storage.local.set(defaults);

    await set_auth(); // Check if the user already happens to be authenticated
})

chrome.contextMenus.onClicked.addListener(async(info, tab) => {
    if (info.menuItemId === 'createCalendarEvent') {
        if (!info.selectionText.trim()) return;

        const settings = await chrome.storage.local.get([
            'authenticated',
            'outlook_link',
            'gcal_link',
            'download_ics'])

        const event_manager = new EventManager(settings.outlook_link, settings.gcal_link, settings.download_ics, tab)
        await event_manager.create_or_logout(info.selectionText);
    }
})