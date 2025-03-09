import browser from 'webextension-polyfill';

export const CALENDARTHAT_BASE_URL = 'https://calendarthat.com';

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
    browser.action.setIcon({
        path: icons[is_logged_in_bool ? 'logged_in' : 'logged_out']
    })
}

export async function set_cursor_style(browser_tab, style) {
    // Remove any existing cursor styles first
    await browser.scripting.removeCSS({
        target: { tabId: browser_tab.id },
        css: 'body { cursor: wait !important; } body { cursor: default !important; }'
    }).catch(() => {}); // Ignore if nothing to remove

    await browser.scripting.insertCSS({
        target: { tabId: browser_tab.id },
        css: `body { cursor: ${style} !important; }`
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

export async function set_auth() {
    const response = await fetch(`${CALENDARTHAT_BASE_URL}/check_auth`, {
        method: 'GET',
        credentials: 'include',
    });

    const is_authenticated = response.status === 200;
    await browser.storage.local.set({ authenticated: is_authenticated });
    await set_icon_logged_in(is_authenticated);

    return is_authenticated;
}