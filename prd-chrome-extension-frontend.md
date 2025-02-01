# [Product Name] - Product Requirements Document
Last Updated: 2-1-2025
Author: Max Risher
Version: 1.0

## Executive Summary
This is a chrome extension front end that allows CalendarThat users to highlight text in their Chrome browser to then generate calendar events. It makes requests to the CalendarThat backend, enabling centralized management of user event preferences (e.g. timezone).

## Problem Statement
### User Problem
The problem with a website only front end is that the place where users encounter the problem "I see something that looks like an event but I have no way of saving it to my calendar" occurs on OTHER websites. Hence, a chrome extension is an ideal modality.

## Success Metrics
- Primary Metric: Chrome extension is functional -- allows users to highlight text
- Secondary Metrics: Chrome extension is user-friendly, as assessed by an independent observer

## User Requirements

### Target User
Someone who does a lot of calendaring.

## Product Requirements

### Must-Have Features (MVP)
1. Calendar event creation
   - Description: users highlight text, send it to our backend, and get a new tab with a link to create the event in their calendar

2. Authentication flow
   - Description: Upon downloading the extension, users are directed to our main website. Non-authenticated users are also redirected to our website.

3. Settings
   - Description: users can choose between outlook, gcal, and .ics files or not as the output of the calendar event creation.

## Technical Requirements

### Dependencies
This chrome extension relies on the user logging into CalendarThat.com on their browser to generate authentication credentials which then enable them to use the extension.

## Timeline & Milestones
- MVP Launch: 2-1-25

## Open Questions
- Do we want to make an iOS app too?
- How could we make a firefox extension too?