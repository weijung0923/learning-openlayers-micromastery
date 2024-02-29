const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'map',
    view: new ol.View({
        projection: "EPSG:3857",
        center: ol.proj.fromLonLat([120.846642, 23.488793]),
        zoom: 7.5,
        maxZoom: 20,
        minZoom: 5,
        enableRotation: false,
    }),
    controls: []
});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: "EPSG:4326",
    // className: "custom-mouse-position",
    // target: document.getElementById("mouse-position"),
});
map.addControl(mousePositionControl);