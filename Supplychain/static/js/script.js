// Data from user
const factories = [
    { name: 'factory23', lat: 51.92823549697513, lng: -0.6387775761749445 },
    { name: 'factory12', lat: 50.7459765014093, lng: -0.1444221850956264 },
    { name: 'factory8', lat: 56.295838378173656, lng: -1.3204467877491548 },
    { name: 'factory17', lat: 50.54159890951562, lng: 0.8310615916692496 },
    { name: 'factory9', lat: 54.07647670038136, lng: 0.2792215341130357 },
    { name: 'factory20', lat: 57.88682713025476, lng: 0.3587898877327125 },
    { name: 'factory21', lat: 50.634144786297256, lng: 0.7965555541923797 },
    { name: 'factory6', lat: 56.9218250544442, lng: -0.3118317734311777 },
    { name: 'factory20', lat: 54.07152149448896, lng: -1.4582365302028082 },
    { name: 'factory21', lat: 50.23819294001036, lng: 0.1777299340225937 },
    { name: 'factory21', lat: 56.37733467643373, lng: -0.6624232499679829 },
    { name: 'factory11', lat: 58.408476961745706, lng: -0.678341167161467 },
    { name: 'factory23', lat: 58.327935594753015, lng: 0.520592520338139 },
    { name: 'factory6', lat: 53.09272201622835, lng: 0.8716391651091482 },
    { name: 'factory18', lat: 54.3634476349906, lng: 1.0517348669427156 },
    { name: 'factory9', lat: 52.56268977876304, lng: 0.9107340275861612 },
    { name: 'factory10', lat: 58.23291239883355, lng: 0.2413876279923088 },
    { name: 'factory22', lat: 53.29740063737953, lng: 1.0710777962993232 },
    { name: 'factory20', lat: 56.18158681119476, lng: -0.4559010613322605 },
    { name: 'factory22', lat: 50.62276570576321, lng: 1.1037061964336816 },
    { name: 'factory24', lat: 53.66764868566586, lng: -0.2846148522674725 },
    { name: 'factory5', lat: 59.9139087248647, lng: -0.2261473790437194 }
];

const warehouses = [
    { name: 'warehouse2', lat: 53.76410604487042, lng: -0.8826363531877348 },
    { name: 'warehouse2', lat: 50.01479000013557, lng: 1.3410527162795385 },
    { name: 'warehouse3', lat: 58.41644775996856, lng: 1.199674399326673 }
];

// Add retail locations
const retails = [
    { name: 'retail1', lat: 51.509865, lng: -0.118092 },
    { name: 'retail2', lat: 52.486244, lng: -1.890401 },
    { name: 'retail3', lat: 53.483959, lng: -2.244644 }
];

// Initialize map
let map = L.map('map').setView([54.5, -2.5], 6);

// Add tile layer to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add markers for factories, warehouses, and retails
factories.forEach(location => {
    L.marker([location.lat, location.lng])
        .bindPopup(`<b>${location.name}</b><br>Type: Factory`)
        .addTo(map);
});

warehouses.forEach(location => {
    L.marker([location.lat, location.lng])
        .bindPopup(`<b>${location.name}</b><br>Type: Warehouse`)
        .addTo(map);
});

retails.forEach(location => {
    L.marker([location.lat, location.lng])
        .bindPopup(`<b>${location.name}</b><br>Type: Retail`)
        .addTo(map);
});

// Populate dropdowns for origin and destination
const originSelect = document.getElementById('origin');
const destinationSelect = document.getElementById('destination');

const allLocations = [...factories, ...warehouses, ...retails];

allLocations.forEach(location => {
    const option = document.createElement('option');
    option.value = JSON.stringify({ lat: location.lat, lng: location.lng });
    option.text = location.name;
    originSelect.add(option);
    destinationSelect.add(option.cloneNode(true));
});

// Function to find shortest path
function findShortestPath() {
    const origin = JSON.parse(document.getElementById('origin').value);
    const destination = JSON.parse(document.getElementById('destination').value);

    if (origin && destination) {
        L.Routing.control({
            waypoints: [
                L.latLng(origin.lat, origin.lng),
                L.latLng(destination.lat, destination.lng)
            ],
            routeWhileDragging: true
        }).addTo(map);
    }
}