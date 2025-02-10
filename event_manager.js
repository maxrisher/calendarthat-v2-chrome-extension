// create_calendar_event()
// if this takes longer than 30 seconds, time out and reset the user's cursor
// start spinning the user's cursor
// send a create/ POST request to the backend

// if the response says we're not authenticated, change our local setting to "not authenticated"; exit this code; 
// chrome.action.setBadgeText({ text: 'Off' });
// chrome.action.setBadgeBackgroundColor({ color: "grey" });


// capture the event uuid that the POST returns
// poll the backend every 1 second for status on the event
// once the event is 'DONE', hit the download/ endpoint
// open the calendar url in a new tab (depending on user settings)
// download (depending on user settings) the .ics file

import { CALENDARTHAT_BASE_URL, set_cursor_style, set_icon_logged_in, sleep, sanitize_filename } from "./helpers.js";

export class EventManager{
    constructor(outlook_link, gcal_link, download_ics, tab) {
      this.outlook_link = outlook_link
      this.gcal_link = gcal_link
      this.download_ics = download_ics
      this.event_text = null;
      this.uuid = null;
      this.tab = tab;
    }
  
    async create_or_logout(event_text){
      try{
        await set_cursor_style(this.tab, 'wait')
        this.event_text = event_text
        await this._create_event_and_uuid();
        await this._poll_backend();
        await this._open_calendar_event();
        }
        finally {
            await set_cursor_style(this.tab,'default')
        }
    }
  
    async _create_event_and_uuid(){
      const response = await fetch(`${CALENDARTHAT_BASE_URL}/extension_create/`, {
            method: "POST",
            // 'include' ensures the browser sends cookies (session) along with the request
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ event_text: this.event_text }) 
            // Check if this is the right way to talk to the API ^
      });
  
      if (response.status === 401) { // double check response status here
        await chrome.storage.local.set({ authenticated: false });
        await set_icon_logged_in(false);
        chrome.tabs.create({ url: `${CALENDARTHAT_BASE_URL}` });

        throw new Error('User not authenticated');
      }
  
      const data = await response.json();
      this.uuid = data.event_uuid;
    }

    async _poll_backend(){
        const max_attempts = 30;
        let attempts = 0;

        while (attempts < max_attempts) {
            const response = await fetch(`${CALENDARTHAT_BASE_URL}/event_status/?event_uuid=${this.uuid}`, {
                method: "GET",
                credentials: "include",
                });
            const data = await response.json();

            if (data.build_status === 'DONE') {
                return;
            }

            await sleep(1000);
            attempts++;
        }
        throw new Error('Event creation timed out');
    }

    async _open_calendar_event() {
        const response = await fetch(`${CALENDARTHAT_BASE_URL}/download/?event_uuid=${this.uuid}`, {
            method: "POST",
            // 'include' ensures the browser sends cookies (session) along with the request
            credentials: "include",
            });
        
        const data = await response.json();

        if (this.downloadIcs) {
          const base_64_data = btoa(data.ics_data);
          const data_url = `data:text/calendar;base64,${base_64_data}`;
          const event_name = sanitize_filename(this.event_text.slice(0,15))

          await chrome.downloads.download({
            url: data_url,
            filename: `new-event-${event_name}.ics`,
            saveAs: false
          })
        }

        if (this.gcal_link) {
          await chrome.tabs.create({ url: data['gcal_link'] })
        }
        if (this.outlook_link) {
          await chrome.tabs.create({ url: data['outlook_link'] })
        }
    }
}