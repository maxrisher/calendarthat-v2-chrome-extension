// Listener for on installed
// create_context_menu()
// defaults: set_settings(authenticated=no, default_calendar=gcal, download_ics=no)

// Listener for context menu item clicked:
// create_calendar_event()

import { CALENDARTHAT_BASE_URL, set_auth } from "./helpers.js";
import { EventBuilderManager } from "./event_manager.js";
import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(async() => {
    browser.contextMenus.create({
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

    await browser.storage.local.set(defaults);

    await set_auth(); // Check if the user already happens to be authenticated
})

browser.contextMenus.onClicked.addListener(async(info, tab) => {
    if (info.menuItemId === 'createCalendarEvent') {
        if (!info.selectionText.trim()) return;

        const settings = await browser.storage.local.get([
            'authenticated',
            'outlook_link',
            'gcal_link',
            'download_ics'])

        const event_manager = new EventBuilderManager(settings.outlook_link, settings.gcal_link, settings.download_ics, tab)
        await event_manager.create_or_logout(info.selectionText);
    }
})