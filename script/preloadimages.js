function preload_image(im_url) {
    let img = new Image();

    img.src = im_url;
}
preload_image("https://vatsim1.netlify.app/src/img/assets/map/tower-control.png");
preload_image("https://vatsim1.netlify.app/src/img/assets/map/tower-control-blue.png");
preload_image("https://vatsim1.netlify.app/src/img/assets/map/tower-control-green.png");

console.log("Preloaded all the images.");
