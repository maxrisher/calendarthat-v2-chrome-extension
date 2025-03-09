# CalendarThat Browser Extension

## Project Structure

The extension is built to work on both Chrome and Firefox with a shared codebase:

- `src/` - Source code files
- `src/manifest/` - Browser-specific manifest files
- `src/icons/` - Extension icons for different states
- `src/styles/` - CSS styling using Tailwind

## Requirements

To build this extension, you'll need:

- Node.js (version 16.0.0 or higher)
- npm (version 8.0.0 or higher)
- Operating system: Any OS that supports Node.js (Windows, macOS, Linux)

## Build Instructions

### 1. Install Dependencies

Download the source code and install the dependencies:

```bash
cd calendarthat-extension
npm install
```

### 2. Build the CSS

The extension uses Tailwind CSS. To build the CSS:

```bash
npm run build:css
```

This command will process the `src/styles/input.css` file and generate `src/styles/output.css`.

### 3. Build the Extension for Firefox

To build the extension specifically for Firefox:

```bash
npm run build:firefox
```

This will:
1. Compile the JavaScript files
2. Copy the necessary assets
3. Use the Firefox-specific manifest
4. Place the built extension in the `build/firefox` directory

The build process doesn't minify or obfuscate the code, making it compliant with Firefox's source code submission requirements.

### 4. Package the Extension

The built extension in `build/firefox` can be packaged as a `.zip` file for submission to Firefox:

```bash
cd build/firefox
zip -r calendarthat-firefox.zip *
```

Or you can load it as a temporary extension in Firefox for testing by going to `about:debugging#/runtime/this-firefox` and selecting "Load Temporary Add-on..." then choose any file in the `build/firefox` directory.

## Extension Functionality

The extension:
1. Adds a context menu item when text is selected
2. Sends the selected text to the CalendarThat server for processing
3. Returns a calendar event that can be added to Google Calendar, Outlook, or downloaded as an ICS file
4. Provides user settings through a popup interface

## Source Files Description

- `background_listeners.js` - Sets up context menu and handles background processes
- `event_manager.js` - Manages the event creation flow with the backend
- `helpers.js` - Utility functions shared across the extension
- `popup.js` - Controls the extension popup UI
- `popup.html` - HTML structure for the extension popup
- `manifest/firefox.json` - Firefox-specific manifest file

## Notes for Firefox Reviewers

email: test.email@gmail.com 
password: #$JMa2s4DWIZNqNbG4PW%74sb

- The extension makes API calls to `https://calendarthat.com` for authentication and event processing. Visit this site and use this login to get a cookie to test the full functionality of the extension.
- User authentication is managed through browser cookies with the CalendarThat website
- The extension requires host permissions only for the CalendarThat domain