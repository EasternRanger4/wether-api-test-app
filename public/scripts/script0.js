async function getData() {
    const responce = await fetch("/api");
    const data = await responce.json();
    const map = L.map('map').setView([0, 0], 1);
    //const marker = L.marker([0, 0]).addTo(map);
    const attribution =
        '&copy; <a hred="https://www.openstreetmap.org/coppyright">OpenStreetMap</a> contributers';
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const tiles = L.tileLayer(tileUrl,{attribution});
    tiles.addTo(map);
    //marker.setLatLng([51.638818037002785, -0.07455865782604545]);

    for (item of data) {
        new Date(item.timestamp).toLocaleString();

        const marker = L.marker([item.Lat, item.Lon]).addTo(map);
        console.log(item.Lat, item.Lon);
        //marker.setLatLng([item.lat, item.lon]);
        if (item.ClientName = "undefined") {
            const txt = ` Location: ${item.Lat}, ${item.Lon}\n Current Tempritcher: ${item.CurentTemp}°c`;
            marker.bindPopup(txt);
        } else {
            const txt = ` Name: ${item.ClientName} \nLocation: ${item.Lat}, ${item.Lon}\n Current Temperature: ${item.CurentTemp}°c`;
            marker.bindPopup(txt);
        }

    }
    console.log(data);
}
getData();