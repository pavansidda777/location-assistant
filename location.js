// Geolocation: Get current position and draw it
function updateLocation() {
  if (!navigator.geolocation) {
    document.getElementById("location").textContent = "Geolocation not supported.";
    return;
  }

  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    document.getElementById("location").textContent = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    drawPoint(latitude, longitude);
  }, (error) => {
    document.getElementById("location").textContent = `Error: ${error.message}`;
  });
}

// Canvas: Draw current location on map
const canvas = document.getElementById("travel-canvas");
const ctx = canvas.getContext("2d");
let path = [];

function drawPoint(lat, lon) {
  const x = (lon + 180) * (canvas.width / 360);
  const y = (90 - lat) * (canvas.height / 180);

  path.push({ x, y });

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);

  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }

  ctx.strokeStyle = "#0077cc";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
}

// Network Info API
function updateNetworkStatus() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const infoBox = document.getElementById("network-info");

  if (!connection) {
    infoBox.textContent = "Network Information API not supported.";
    return;
  }

  const type = connection.effectiveType || "unknown";
  infoBox.textContent = `${type.toUpperCase()} - ${connection.downlink} Mbps`;

  connection.addEventListener("change", () => {
    infoBox.textContent = `${connection.effectiveType.toUpperCase()} - ${connection.downlink} Mbps`;
  });
}

// Initialize all
updateLocation();
updateNetworkStatus();
