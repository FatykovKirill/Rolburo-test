async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const map = new YMap(
    document.getElementById('map'),
    {
      location: {
        center: [37.54295710522462, 55.79758159342546],
        zoom: 12
      },
    },
    [
      // Add a map scheme layer
      new YMapDefaultSchemeLayer({}),
      // Add a layer of geo objects to display the markers
      new YMapDefaultFeaturesLayer({})
    ]
  );
  // Маркер
  const markerElement = document.createElement('img');
  markerElement.className = '.icon-marker';
  markerElement.src = 'images/metka.svg';
  map.addChild(new YMapMarker({ coordinates: [37.54295710522462, 55.79758159342546] }, markerElement));
  // 

}

initMap();