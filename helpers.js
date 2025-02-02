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

export function set_icon_logged_in(is_logged_in_bool) {
    chrome.action.setIcon({
        path: icons[is_logged_in_bool ? 'logged_in' : 'logged_out']
    })
}

export async function set_cursor_style(style){
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
            document.body.style.cursor = style;
        }
        });
}

export function sanitize_filename(text) {
    return text.replace(/[^a-z0-9]/gi, '-').toLowerCase();
};

export async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}