# To Do list:
### Fixes
- [&nbsp;&nbsp;] **Scrollbar at the bottom:** Adjust the CSS to ensure the scrollbar stays within the screen boundaries.
- [&nbsp;&nbsp;] **Widening events-sidebar issue:** Modify the layout so that increasing sidebar width doesn't affect content separation.
- [&nbsp;&nbsp;] **Mobile sidebar cut-off:** Resolve the mobile issue by adjusting styles to accommodate browsers with bottom search bars.
- [&nbsp;&nbsp;] **Loading animation with JS off:** Replace the loading spinner with a message for users with disabled JavaScript.
- [&nbsp;&nbsp;] **Mobile logo centering:** Center the logo horizontally on mobile devices.
- [&nbsp;&nbsp;] **Icon leveling:** Make the active icon overwrite that "multi-event" purple one.
- [&nbsp;&nbsp;] **Scale to mobile:** Local storage not accesible popup

### Adds
- [&nbsp;&nbsp;] **Pilots and ATC number in navbar:** Fetch data and dynamically update the navbar.
- [&nbsp;&nbsp;] **Flight tracking:** Implement a feature to track flights on the map.
- [&nbsp;&nbsp;] **Positioning airplanes on the map:** Use data to place airplanes accurately.
- [&nbsp;&nbsp;] **Display ATC'd airports:** Add airports with ATC to the map.
- [&nbsp;&nbsp;] **Airport borders and boxes in sidebar:** Enhance visibility with borders and boxes for each airport ICAO.
- [&nbsp;&nbsp;] **Airport filtering:** Allow users to filter airports on the map.
- [&nbsp;&nbsp;] **Event popups:** Create popups for events and pins on the map, smoothly displaying images and descriptions.
- [&nbsp;&nbsp;] **City pair line drawing:** Implement a feature to show city pairs on the map.
- [&nbsp;&nbsp;] **Precise popups:** Refine the appearance and information in popups.
- [&nbsp;&nbsp;] **More Handlebars usage:** Optimize code by utilizing Handlebars where applicable.
- [&nbsp;&nbsp;] **Map filtering and provider selection:** Allow users to filter the map and choose map providers.
- [&nbsp;&nbsp;] **Layers (e.g. weather):** Integrate layers for additional information like weather.
- [&nbsp;&nbsp;] **Events sorting:** Sort events based on their occurrence date.
- [&nbsp;&nbsp;] **Time zone selection popup:** Add a popup for users to choose their preferred time zone, with the option to add multiple time zones.
- [&nbsp;&nbsp;] **Photos on click:** Show aircraft or airport photos when clicked on the map.
- [&nbsp;&nbsp;] **Airplane route drawing:** Make it draw the line the airplane has already flown through and also draw one directly from the pilot to his destination.
- [&nbsp;&nbsp;] **Airplane route drawing:** Horizontal scrolling through airport codes.
- [&nbsp;&nbsp;] **Remembering:** Remember if the user has opened the sidebar and open if so. Remember which precise popup was opened (if some was) and open that one on the next load.
- [&nbsp;&nbsp;] **Links animation:** In the cache disbaled popup.


### Changes
- [&nbsp;&nbsp;] **Handlebars in a separate file:** Move Handlebars to a separate file and refactor JavaScript to use it.
- [&nbsp;&nbsp;] **Location event popup appearance:** Enhance the appearance of location event popups.
- [&nbsp;&nbsp;] **Scrollbar:** Make the scrollbar in the sidebox appear always only on desktop, on mobile it should do so only if the user has scrolled.


### Get to know
- [&nbsp;&nbsp;] **Drawing FIRs:** Understand the process of drawing FIRs on the map.
- [&nbsp;&nbsp;] **Dynamic addition of airports, planes, and controllers:** Learn how to dynamically add elements based on their activity.
