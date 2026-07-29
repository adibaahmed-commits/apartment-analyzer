const loadingMessage = document.getElementById("loadingMessage");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");
const historyGrid = document.getElementById("historyGrid");

async function loadHistory() {
  try {
    const buildings = await getBuildingHistory();

    loadingMessage.style.display = "none";

    if (!buildings || buildings.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }

    buildings.forEach(building => {
  const card = document.createElement("a");
  card.href = `details.html?id=${building.id}`;
  card.className = "history-card";

  let analysis = building.analysis_json || {};
  if (typeof analysis === "string") {
    try {
      analysis = JSON.parse(analysis);
    } catch (e) {
      analysis = {};
    }
  }

  const imageSrc = building.image_url
    ? (building.image_url.startsWith("http") ? building.image_url : API_BASE + building.image_url)
    : "";

  card.innerHTML = `
    <img src="${imageSrc}" alt="Building thumbnail">
    <p>${building.name || analysis.building_type || `Building #${building.id}`}</p>
    <small>${building.status || ""}</small>
  `;

  historyGrid.appendChild(card);
});

  } catch (error) {
    loadingMessage.style.display = "none";
    errorMessage.style.display = "block";
  }
}

loadHistory();