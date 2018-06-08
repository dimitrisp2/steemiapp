# Latest commit message

Minor main layout update, reordering the views

Start implementation of user feed.
- ParseFeed() created. Right now it only goes through the JSON data, without assigning them anywhere for viewing

Start implementation of account info
- ParseAccInfo() created, to add Voting Power and various other information about user account.

### History

[Old long commit messages will be added here]

Updated all layouts to enable fast scrolling on listviews

App menu implementation with the following items:
- StemiAPP (will open the website inside the in-app browser)
- My Feed (will show the user's home page feed, not yet implemented)
- Refresh (will refresh the data on the tabs)
- SBD/Steem Price (wil show pricing data from CMC)
- Settings (Will open the Settings screen)

Price & Refresh buttons will be removed from the activity before releasing the app.
(Note: I'm considering changing the menu long tap action to refresh the tab data, instead of opening the settings. Will decide on this before releasing r19)

Remaining TODO for r19, sorted by priority:
- Implement user feed
- Add comments on each post
- Allow user to choose between various currencies to show, instead of SBD and Dollars
- Move the "About" entry from Settings menu to App menu (not a priority)