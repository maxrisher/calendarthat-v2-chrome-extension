// When the popup is clicked, display our popup.html

// When the user changes one of the toggle buttons on the settings, store this change in chrome local storage

import { CALENDARTHAT_BASE_URL, set_auth } from "./helpers.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Load current settings
    const settings = await chrome.storage.local.get([
      'authenticated',
      'defaultCalendar',
      'downloadIcs'
    ]);
  
    // Update UI based on authentication status
    updateAuthenticationUI(settings.authenticated);
  
    // Setup calendar type toggle
    const calendarToggle = document.getElementById('calendar-toggle');
    calendarToggle.checked = settings.defaultCalendar === 'outlook';
    calendarToggle.addEventListener('change', async (e) => {
      await chrome.storage.local.set({
        defaultCalendar: e.target.checked ? 'outlook_link' : 'gcal_link'
      });
    });
  
    // Setup ICS download toggle
    const icsToggle = document.getElementById('ics-toggle');
    icsToggle.checked = settings.downloadIcs;
    icsToggle.addEventListener('change', async (e) => {
      await chrome.storage.local.set({
        downloadIcs: e.target.checked
      });
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
      authSection.classList.add('hidden');
      settingsSection.classList.remove('hidden');
    } else {
      authSection.classList.remove('hidden');
      settingsSection.classList.add('hidden');
    }
  }