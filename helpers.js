export const CALENDARTHAT_BASE_URL = 'https://calendarthatv2-calendarthatv2-pr-18.up.railway.app';

const icons = {
    logged_in: {
        "16": "icons/logged_in_16.png",
        "32": "icons/logged_in_32.png",
        "48": "icons/logged_in_48.png",
        "128": "icons/logged_in_128.png"
    },
    logged_out: {
        "16": "icons/logged_out_16.png",
        "32": "icons/logged_out_32.png",
        "48": "icons/logged_out_48.png",
        "128": "icons/logged_out_128.png"
    }
};

async function set_icon_logged_in(is_logged_in) {
    const settings = await chrome.storage.local.get([
        'authenticated', 
        'defaultCalendar', 
        'downloadIcs'])

    chrome.action.setIcon({
        path: icons[is_logged_in ? 'logged_in' : 'logged_out']
    })
}

function set_cursor_style(style){
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
            document.body.style.cursor = style;
        }
        });
}

