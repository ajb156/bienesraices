(function () {
  const lat = document.querySelector('#lat').value || 43.3695183;
  const lng = document.querySelector('#lng').value || -8.4180963;
  const mapa = L.map('mapa').setView([lat, lng], 18);
  let marker; // pin

  //* Provider y Geocode
  const geocodeService = L.esri.Geocoding.geocodeService();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  //* Colocar el pin
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(mapa);

  //* Detectar movimiento
  marker.on('moveend', function (e) {
    marker = e.target;
    const posicion = marker.getLatLng();
    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

    //* Obtener info de la calle al soltar el pin
    geocodeService
      .reverse()
      .latlng(posicion, 18)
      .run(function (error, resultado) {
        console.log(resultado);
        marker.bindPopup(resultado.address.ShortLabel);

        //* Llenar los campos
        document.querySelector('.street').textContent = resultado.address?.ShortLabel ?? '';
        document.querySelector('#street').value = resultado.address?.ShortLabel ?? '';
        document.querySelector('#lat').value = resultado.latlng?.lat ?? '';
        document.querySelector('#lng').value = resultado.latlng?.lng ?? '';
      });
  });
})();
