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

// 兩點一線，給出對應的點座標
const p1 = ol.proj.fromLonLat([120, 23]);
const p2 = ol.proj.fromLonLat([121, 24]);

let line = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                // 如果與day01的比較你會發現，只有差在geom的物件不同而已
                geometry: new ol.geom.LineString([p1, p2])
            })
        ]
    })
}); 

map.addLayer(line);