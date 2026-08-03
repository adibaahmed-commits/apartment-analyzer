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
  async function uploadAndAnalyzeWithGPS(fileInput) {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select an image first.");
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    let originalText = "Analyze";
    if(submitBtn) {
        originalText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "Extracting GPS & Analyzing...";
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        // Call our NEW backend endpoint
        const response = await fetch('http://127.0.0.1:8000/api/analyze-with-gps', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Analysis failed");
        }

        const data = await response.json();
        
        // Store result in localStorage to pass to details page
        localStorage.setItem('gemini_analysis_result', JSON.stringify(data));
        
        alert("Analysis Complete!");
        
        // Redirect to results page
        window.location.href = 'details.html'; 

    } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
    } finally {
        if(submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    }
}

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
}
