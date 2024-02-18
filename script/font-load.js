$(document).ready(() => {
    const link = $("<link/>", {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lato:wght@100..900&family=Oswald:wght@100..900&family=Roboto+Mono:wght@100..900&family=Rubik:wght@100..900&display=swap&family=Inter:wght@100..900&display=swap&family=Montserrat:wght@100..900&display=swap&family=Montserrat:ital,wght@1,100..900&display=swap&family=Inter:wght@100..900&display=swap&family=Inter:wght@100..900&family=Kode+Mono:wght@400..700",
    });
    $("head").append(link);
    console.log("Font Loaded!");
});
