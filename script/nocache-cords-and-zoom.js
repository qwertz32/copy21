function isMobile() {
    return $(window).width() <= 768;
};

var presetCoordinatesList = [
    [27.386445836446814, 15.59099952979347], 
    [25.19693081190781, 55.27419425547124],
    [55.751605578948634,37.622505547875434], // 
    [39.043127453366125,125.7556205996649], //
    [35.70132841614543,499.7335694356339], //
    [40.6892040108378,-74.04478900061456], //
    [23.764313175283185,90.2804708680347], //
    [0.0,0.0], 
    [-70.30468490953506,24.048737550483317], //
    [-43.52892045765742,171.35833055943286], //
    [33.95624057296359,-118.24731336563917], //
    [71.53863351460842,-53.21127807509122], //
    [52.23919989939035,21.04489368750266], //
    
];
var tileLayerUrl = 'https://mt2.google.com/vt?lyrs=s&x={x}&y={y}&z={z}';
var presetCoordinates = isMobile() ? [54.526000, 15.255100] : getRandomCordsForStart();
var presetZoom = isMobile() ? 4 : 3; 

try {
    // storedCoordinates = gotMapCords;
    // storedZoom = gotMapZoom;
    var storedCoordinates = localStorage.getItem('mapCoordinates');
    var storedZoom = localStorage.getItem('mapZoom');
    initialCoordinates = JSON.parse(storedCoordinates) || presetCoordinates;
} catch (error) {
    console.error(
        "Error getting the last position. \n Fix is most likely to %cenable cache%c. \n If this does not help, contact the owner and provide any other error you get.",
        "color: #e30505; font-weight: bold; text-decoration: underline;",
        "color: orange; font-weight: normal;"
    );
    initialCoordinates = presetCoordinates;
};

function getRandomCordsForStart() {
    var randomIndex2 = Math.floor(Math.random() * presetCoordinatesList.length);
    return presetCoordinatesList[randomIndex2];
}