// When the popup is clicked, display our popup.html

// When the user changes one of the toggle buttons on the settings, store this change in chrome local storage

import { CALENDARTHAT_BASE_URL, set_auth } from "./helpers.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Load current settings
    const settings = await chrome.storage.local.get([
      'authenticated',
      'outlook_link',
      'gcal_link',
      'download_ics'
    ]);
  
    // Update UI based on authentication status
    updateAuthenticationUI(settings.authenticated);
  
    // Setup calendar type toggle
    const gcal_toggle = document.getElementById('gcal-toggle');
    gcal_toggle.checked = settings.gcal_link;
    gcal_toggle.addEventListener('change', async (event) => {
      await chrome.storage.local.set({
        gcal_link: event.target.checked
      });
      console.log("Calendar event link type is gcal?"+event.target.checked)
    });
  
    const outlook_toggle = document.getElementById('outlook-toggle');
    outlook_toggle.checked = settings.outlook_link;
    outlook_toggle.addEventListener('change', async (event) => {
      await chrome.storage.local.set({
        outlook_link: event.target.checked
      });
      console.log("Calendar event link type is outlook?"+event.target.checked)
    });

    const ics_toggle = document.getElementById('ics-toggle');
    ics_toggle.checked = settings.download_ics;
    ics_toggle.addEventListener('change', async (event) => {
      await chrome.storage.local.set({
        download_ics: event.target.checked
      });
      console.log("Download ics?"+event.target.checked)
    });
  
    // Setup login button
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.addEventListener('click', async() => {
        
        const authenticated = await set_auth();

        if (authenticated) {
          updateAuthenticationUI(authenticated);
        }
        else{
          chrome.tabs.create({ url: `${CALENDARTHAT_BASE_URL}` });

        }
      });
    }
  });
  
// Update UI based on authentication status
function updateAuthenticationUI(authenticated) {
  const authSection = document.getElementById('auth-section');
  const settingsSection = document.getElementById('settings-section');

  if (authenticated) {
    authSection.classList.add('hidden'); //hide auth button
    settingsSection.classList.remove('hidden'); //show settings
  } else {
    authSection.classList.remove('hidden'); //show auth button
    settingsSection.classList.add('hidden'); //hide settings
  }
}