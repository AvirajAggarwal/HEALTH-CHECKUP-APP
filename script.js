function showTab(id) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

document.getElementById('gender').addEventListener('change', function () {
  const hipLabel = document.getElementById('hip-label');
  hipLabel.style.display = this.value === 'female' ? 'block' : 'none';
});

function calculateBMI() {
  const height = parseFloat(document.getElementById("bmi-height").value) / 100;
  const weight = parseFloat(document.getElementById("bmi-weight").value);
  if (!height || !weight) return;

  const bmi = weight / (height * height);
  let status = "";
  if (bmi < 18.5) status = "Underweight";
  else if (bmi < 24.9) status = "Normal";
  else if (bmi < 29.9) status = "Overweight";
  else status = "Obese";

  document.getElementById("bmi-result").textContent = `Your BMI is ${bmi.toFixed(2)} (${status})`;
}

function calculateBodyFat() {
  const gender = document.getElementById("gender").value;
  const waist = parseFloat(document.getElementById("waist").value);
  const neck = parseFloat(document.getElementById("neck").value);
  const height = parseFloat(document.getElementById("bf-height").value);
  const hip = parseFloat(document.getElementById("hip").value);

  let bodyFat = 0;

  if (gender === "male") {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) +
                     0.15456 * Math.log10(height)) - 450;
  } 
  else {
    if (!hip) return;
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) +
                     0.22100 * Math.log10(height)) - 450;
  }

  document.getElementById("bodyfat-result").textContent =
    `Estimated Body Fat: ${bodyFat.toFixed(2)}%`;
}
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("switch-cache").then(cache =>
      cache.addAll(["./", "index.html", "style.css", "script.js", "manifest.json"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});