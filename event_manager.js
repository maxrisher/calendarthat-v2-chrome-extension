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

import { CALENDARTHAT_BASE_URL } from "./helpers";

export class EventManager{
    constructor(defaultCalendar, downloadIcs) {
      this.defaultCalendar = defaultCalendar
      this.downloadIcs = downloadIcs
      this.event_text = null;
      this.uuid = null;
    }
  
    async create_or_logout(event_text){
      try{
        set_cursor_style('wait')
        this.event_text = event_text
        await _create_event_and_uuid();
        await _poll_backend();
        await _open_calendar_event();
        }
        finally {
            set_cursor_style('default')
        }
    }
  
    async _create_event_and_uuid(){
      const response = await fetch(`${CALENDARTHAT_BASE_URL}/create/`, {
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
        await updateBadge();
        chrome.tabs.create({ url: `${CALENDARTHAT_BASE_URL}/login` });
        return
      }
  
      const data = await response.json();
      this.uuid = data.eventId;
    }

    async _poll_backend(){
        const max_attempts = 30;
        let attempts = 0;

        while (attempts < max_attempts) {
            const response = await fetch(`${CALENDARTHAT_BASE_URL}/status/`, {
                method: "POST",
                // 'include' ensures the browser sends cookies (session) along with the request
                credentials: "include",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({ uuid: this.uuid }) 
                // Check if this is the right way to talk to the API ^
                });
            const data = await response.json();

            if (data.status === 'DONE') {
                return;
            }

            await sleep(1000);
            attempts++;
        }
        throw new Error('Event creation timed out');
    }

    async _open_calendar_event() {
        const response = await fetch(`${CALENDARTHAT_BASE_URL}/download/`, {
            method: "POST",
            // 'include' ensures the browser sends cookies (session) along with the request
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ uuid: this.uuid }) 
            // Check if this is the right way to talk to the API ^
            });
        
        const data = await response.json();

        new_tab_url = data.get(this.defaultCalendar)
        blob = data.ics_file

        ics_url = window.URL.createObjectURL(blob);
        chrome.downloads.download({
            url: ics_url,
            filename: `new-event-${this.event_text[:10]}.ics`,
            saveAs: false
        });
    }
}