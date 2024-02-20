const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            // 換上自己想要的圖磚路徑
            // source: new ol.source.OSM()
            source: new ol.source.XYZ({
                url: "https://wmts.nlsc.gov.tw/wmts/EMAP5/default/EPSG:3857/{z}/{y}/{x}.png"
            })
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