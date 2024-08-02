maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: trek.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

new maptilersdk.Marker()
    .setLngLat(trek.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h3>${trek.title}</h3><p>${trek.location}</p>`
            )
    )
    .addTo(map)