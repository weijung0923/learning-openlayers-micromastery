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

// 方案一
map.addControl(
    new ol.control.ScaleLine({
        // {'degrees'} {'imperial'} {'nautical'} {'metric'} {'us'}
        // 比例尺有提供幾種單位可以調整，範例如下
        units: 'us',
        bar: true,
        steps: 4
    })
);

// 方案二
// 如果都不調整的話，就是用公里為單位
// map.addControl(new ol.control.ScaleLine());