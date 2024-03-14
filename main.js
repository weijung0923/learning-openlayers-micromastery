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


function getCoffeeData() {
    axios.get("coffee.json")
        .then((res) => {
            // 建立空layer
            let coffeeLayer = new ol.layer.Vector({
                source: new ol.source.Vector({})
            });
            // 解構資料
            let { data } = res;

            // 加入資料變成feature，注意座標轉換
            for (let i = 0; i < data.length; i++) {
                coffeeLayer.getSource().addFeature(
                    new ol.Feature({
                        geometry: new ol.geom.Point(
                            ol.proj.fromLonLat([
                                data[i]['longitude'], 
                                data[i]['latitude']
                            ])
                        )
                    })
                )
            }
            // 加入layer到map
            map.addLayer(coffeeLayer);

            // 設定點的樣式
            const iconStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src: 'coffee.png',
                    scale: 0.1
                }),
            });

            // 設定layer的樣式
            coffeeLayer.setStyle(iconStyle);
        })
        .catch((err) => {
            console.log(err)
        })
}

getCoffeeData()
