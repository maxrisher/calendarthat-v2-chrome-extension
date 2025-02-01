console.log("Extension ID:", chrome.runtime.id);  // Log this to use in Django CORS settings

// Creates a context menu item when the user highlights text
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "calendarthatSend",
      title: "Send to CalendarThat",
      contexts: ["selection"]
    });
  });
  
  // Handles a user click on the context menu item
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "calendarthatSend") {
      const selectedText = info.selectionText || "";
      if (!selectedText.trim()) return;
  
      try {
        // Send text to your site’s endpoint, including cookies if the user is logged in
        const response = await fetch("https://calendarthatv2-calendarthatv2-pr-18.up.railway.app/create/", {
          method: "POST",
          // 'include' ensures the browser sends cookies (session) along with the request
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({ event_text: selectedText })
        });

        // Add these debug logs
        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers));

        // Log the actual response text before trying to parse it
        const responseText = await response.text();
        console.log("Response body:", responseText);
  
        // You might handle the JSON response or show a notification here
        const result = await response.json();
        console.log("Event created with UUID:", result.event_uuid);
      } catch (err) {
        console.error("CalendarThat request failed:", err);
      }
    }
  });

// Listener for on installed
// create_context_menu()
// defaults: set_settings(authenticated=no, default_calendar=gcal, download_ics=no)

// Listener for context menu item clicked:
// create_calendar_event()

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