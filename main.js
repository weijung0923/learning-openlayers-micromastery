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

// 可以改成吃本機的路徑，未來可以使用link的方式取得kml資料
const kml = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'RIVWLSTA_e.kml',
        format: new ol.format.KML(),
    }),
});

map.addLayer(kml);