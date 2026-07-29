const photoInput = document.getElementById("photoInput");
const previewContainer = document.getElementById("previewContainer");
const uploadBtn = document.getElementById("uploadBtn");
const statusMessage = document.getElementById("statusMessage");

let selectedFile = null;

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;

  selectedFile = file;

  const imageUrl = URL.createObjectURL(file);
  previewContainer.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
});

uploadBtn.addEventListener("click", async () => {
  if (!selectedFile) {
    statusMessage.textContent = "Please choose a photo first.";
    return;
  }

  uploadBtn.disabled = true;
  uploadBtn.textContent = "Analyzing...";
  statusMessage.textContent = "";

  try {
    const uploadResult = await uploadBuildingImage(selectedFile);
    await analyzeBuilding(uploadResult.building_id);
    window.location.href = `details.html?id=${uploadResult.building_id}`;
  } catch (error) {
  
    statusMessage.textContent = "Something went wrong. Please try again.";
    uploadBtn.disabled = false;
    uploadBtn.textContent = "Analyze Building";
  }
});