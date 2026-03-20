// map.js — Mapbox integration for listing show page
// mapToken and listingCoordinates are injected by show.ejs

if (typeof mapToken !== 'undefined' && typeof listingCoordinates !== 'undefined') {
  mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: listingCoordinates,
    zoom: 10
  });

  // Navigation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  // Custom marker
  const el = document.createElement('div');
  el.style.cssText = `
    width: 40px; height: 40px;
    background: #1a1814;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid #c8a96e;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;

  new mapboxgl.Marker({ element: el, anchor: 'bottom' })
    .setLngLat(listingCoordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML('<p style="font-family:serif;font-size:13px;margin:0;padding:4px 0;">📍 You will be here</p>')
    )
    .addTo(map);
}
