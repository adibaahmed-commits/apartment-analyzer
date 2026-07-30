const loadingMessage = document.getElementById("loadingMessage");
const detailsContainer = document.getElementById("detailsContainer");
const errorMessage = document.getElementById("errorMessage");

const buildingImage = document.getElementById("buildingImage");
const buildingType = document.getElementById("buildingType");
const buildingSummary = document.getElementById("buildingSummary");
const buildingYear = document.getElementById("buildingYear");
const buildingFloors = document.getElementById("buildingFloors");
const buildingStyle = document.getElementById("buildingStyle");
const buildingCondition = document.getElementById("buildingCondition");
const buildingRent = document.getElementById("buildingRent");
const buildingConfidence = document.getElementById("buildingConfidence");
const buildingFeatures = document.getElementById("buildingFeatures");
const buildingAmenities = document.getElementById("buildingAmenities");
const buildingHospitals = document.getElementById("buildingHospitals");
const buildingSchools = document.getElementById("buildingSchools");
const buildingNetwork = document.getElementById("buildingNetwork");

const params = new URLSearchParams(window.location.search);
const buildingId = params.get("id");

function fillList(el, items) {
  el.innerHTML = "";
  if (!items || items.length === 0) {
    el.innerHTML = "<li>Not detected</li>";
    return;
  }
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
}

async function loadDetails() {
  if (!buildingId) {
    showError();
    return;
  }

  try {
    const data = await getBuildingDetails(buildingId);
    const analysis = data.analysis_json || {};
    

    buildingImage.src = data.image_url || "";
    buildingType.textContent = analysis.building_type || data.name || "Not detected";
    buildingSummary.textContent = analysis.summary || "";

    buildingYear.textContent = analysis.estimated_year_built || "Not detected";
    buildingFloors.textContent = analysis.estimated_stories || "Not detected";
    buildingStyle.textContent = analysis.architectural_style || "Not detected";
    buildingCondition.textContent = analysis.condition || data.status || "Not detected";
    buildingRent.textContent = analysis.estimated_rental_price || "Not detected";
    buildingConfidence.textContent = analysis.confidence || "Not detected";

    fillList(buildingFeatures, analysis.notable_features);
    fillList(buildingAmenities, analysis.visible_amenities);
    fillList(buildingHospitals, analysis.nearby_hospitals);
    fillList(buildingSchools, analysis.nearby_schools);

    buildingNetwork.textContent = analysis.network_coverage || "Not detected";

    loadingMessage.style.display = "none";
    detailsContainer.style.display = "block";
  } catch (error) {
    showError();
  }
}

function showError() {
  loadingMessage.style.display = "none";
  errorMessage.style.display = "block";
}

loadDetails();
