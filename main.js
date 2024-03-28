// 宣告一個layer，用來標記移動後的目標位置
let pinLocation = new ol.layer.Vector({
  // 設定空source
  source: new ol.source.Vector(),

  // 設定此layer feature style
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "pin.png",
      scale: 0.5,
    }),
  }),
});

const map = new ol.Map({
  layers: [
    // 換回TGOS底圖看台灣感覺比較有親切感
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "https://wmts.nlsc.gov.tw/wmts/EMAP5/default/EPSG:3857/{z}/{y}/{x}.png",
        crossOrigin: "anonymous",
        minZoom: 6,
        maxZoom: 20,
      }),
    }),

    // layer是一個array，可以在map建立時直接加入宣告好的layer
    pinLocation,
  ],
  target: "map",
  view: new ol.View({
    projection: "EPSG:3857",
    center: ol.proj.fromLonLat([120.846642, 23.488793]),
    zoom: 7.5,
    maxZoom: 20,
    minZoom: 5,
    enableRotation: false,
  }),
  controls: [],
});

const poiDict = {
  101: [121.56450735213697, 25.03381150482929],
  武嶺: [121.2758584997942, 24.137099925124105],
  大池豆皮: [121.2139523946355, 23.117599997028154],
};

function movePoi(poi) {
  // 清除前一點標記
  pinLocation.getSource().clear();

  // 移動動畫特效，其中參數可以參考openlayers API
  // https://openlayers.org/en/latest/apidoc/module-ol_View-View.html#animate
  map.getView().animate({
    center: ol.proj.fromLonLat(poiDict[poi]),
    duration: 2000,
    zoom: 10,
  });

  // 前幾天有教過，我們這邊就單獨在這個layer中新增一個點
  pinLocation.getSource().addFeature(
    new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(poiDict[poi])),
    })
  );
}
