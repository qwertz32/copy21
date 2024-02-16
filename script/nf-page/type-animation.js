// only start when the page's ready to make sure it gets the tags correctly
$(document).ready(() => {
    // check if it is on a small screen
    const isSmallScreen = $(window).width() < 650;
    // content depending on trueness of that checking above
    const pathContent = isSmallScreen
        ? // if it is small screen, type this
          `Sorry, can't find <br> <span class="path-name">${$(location).attr("pathname")}</span>`
        : // else if it is a big screen, type this instead
          `Sorry, not findin' <span class="path-name">${$(location).attr("pathname")}</span> today?`;

    const pathTypingAnimation = new TypeIt(".not-finding-text", {
        // the speed of typing
        speed: 50,
        //
        startDelay: 650,
        // after the animation ends, remove the cursor
        afterComplete: function (instance) {
            instance.destroy();
        },
    })
        // the initial state of the text
        .type(pathContent)
        // a break for a user to see what was written
        .pause(1100);

    // if it is NOT on a small screen, add a deletion of last question mark and type "!"
    if (!isSmallScreen) {
        pathTypingAnimation.delete(1).type("!");
    }

    // in both cases, add last pause before removing the cursor and run the animation
    pathTypingAnimation.pause(450).go();
});
