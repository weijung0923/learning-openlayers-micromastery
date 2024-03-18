// 建立空layer
let coffeeLayer = new ol.layer.Vector({
    // 設定空source
    source: new ol.source.Vector(),

    // 設定此layer feature style
    style: new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: 'coffee.png',
            scale: 0.1
        }),
    })
});

const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        coffeeLayer
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
        })
        .catch((err) => {
            console.log(err)
        })
}

// 執行抓取API的function 
getCoffeeData();

////////////////////// 新增Popup和click機制 /////////////////////


/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new ol.Overlay({
    element: container,
    autoPan: {
        animation: {
            duration: 250,
        },
    },
});


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

map.addOverlay(overlay)

// click的時候顯示popup
map.on('singleclick', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
    });

    if (!feature) {
        return;
    }

    console.log(feature)

    const coordinate = evt.coordinate;
    // const hdms = toStringHDMS(toLonLat(coordinate));

    content.innerHTML = '<p>You clicked here:</p><code>' + '</code>';
    overlay.setPosition(coordinate);
});