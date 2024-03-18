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

// https://cafenomad.tw/developers/docs/v1.2?source=post_page-----75cf8c06177c--------------------------------
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
                        ),
                        wifi: data[i]['wifi'],
                        seat: data[i]['seat'],
                        cheap: data[i]['cheap']
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

// js取得dom元素
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

// 新增overlay的物件
const overlay = new ol.Overlay({
    element: container,
    autoPan: {
        animation: {
            duration: 250,
        },
    },
});

// 新增關閉popup的click事件
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

    // 取得地圖位置
    const coordinate = evt.coordinate;

    // 可以根據需求設定樣式，透過HTML和CSS組合取得feature的內容
    // 或是自定義想要的參數一次取得內容
    content.innerHTML = `   
                            WIFI訊號：${feature.get('wifi')}<br>
                            座位多寡：${feature.get('seat')}<br>
                            是否便宜：${feature.get('cheap')}
                        `;
    overlay.setPosition(coordinate);
});