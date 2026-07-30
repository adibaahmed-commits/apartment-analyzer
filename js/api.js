// Change this to your real backend URL once your backend dev gives it to you
const API_BASE = "https://xtrace-backend.onrender.com";

async function uploadBuildingImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/buildings/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}
async function getBuildingDetails(id) {
  const response = await fetch(`${API_BASE}/buildings/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load building");
  }

  return response.json();
}
async function getBuildingHistory() {
  const response = await fetch(`${API_BASE}/buildings`);

  if (!response.ok) {
    throw new Error("Failed to load history");
  }

  return response.json();
}
async function analyzeBuilding(buildingId) {
  const response = await fetch(`${API_BASE}/buildings/${buildingId}/analyze`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
}