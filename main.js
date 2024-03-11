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

// 新增feature物件
const iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([121, 23.5])),
    name: 'Null Island',
    population: 4000,
    rainfall: 500,
});

// 設定點的樣式
const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        // 注意，如果你想要讓圖案尖尖的點在正確位置的話可以依據下方設定，Unit設定成fraction與anchor設定為0.5, 1
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
    }),
});

// 設定style到指定的feature
iconFeature.setStyle(iconStyle);

// 建立一個source物件且放入點(feature)
const vectorSource = new ol.source.Vector({
    features: [iconFeature],
});

// 建立一個layer物件且放入對應的source
const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
});

// 最終，把此layer加入到地圖中
map.addLayer(vectorLayer);