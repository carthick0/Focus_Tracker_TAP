let defaultMinutes = 25;
let duration = defaultMinutes * 60;
let remaining = duration;
let interval = null;
let onBreak = false;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const setBtn = document.getElementById("setBtn");
const input = document.getElementById("customTime");
const pauseMsg = document.getElementById("pause-msg");
const canvas = document.getElementById("progressCanvas");

const ctx = canvas.getContext("2d");

//===Canvas==
function fixCanvasResolution() {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);
}
fixCanvasResolution();
window.addEventListener("resize", () => {
  fixCanvasResolution();
  drawProgress();
});

function updateTimeDisplay() {
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  timeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function drawProgress() {
  const percent = 1 - remaining / duration;
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = onBreak ? "#ffd6d6" : "#c8f7c5";
  ctx.fillRect(0, 0, width * percent, height);

  ctx.fillStyle = "#333";
  ctx.font = "18px 'Segoe UI', sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(`Progress: ${(percent * 100).toFixed(1)}%`, 10, height / 2);
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      updateTimeDisplay();
      drawProgress();
    } else {
      clearInterval(interval);
      interval = null;
      if (!onBreak) {
        increaseStreak();
        alert("🎉 Focus session complete! Time for a 5-minute break.");
        startBreak();
      } else {
        alert("✅ Break over! Ready to focus again.");
        resetToFocus();
      }
    }
  }, 1000);

  pauseMsg.style.display = "none";
}

function pauseTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

function startBreak() {
  onBreak = true;
  duration = 5 * 60;
  remaining = duration;
  updateTimeDisplay();
  drawProgress();
  startTimer();
}

function resetToFocus() {
  onBreak = false;
  duration = defaultMinutes * 60;
  remaining = duration;
  updateTimeDisplay();
  drawProgress();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);

setBtn.addEventListener("click", () => {
  const val = parseInt(input.value);
  if (!isNaN(val) && val > 0) {
    defaultMinutes = val;
    duration = val * 60;
    remaining = duration;
    updateTimeDisplay();
    drawProgress();
    pauseTimer();
    pauseMsg.style.display = "none";
    onBreak = false;
  }
});

// === Show pause msg on tab switch and also dispaly on the console
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    pauseTimer();
    pauseMsg.textContent = "⏸️ Timer paused – You switched tabs";
    pauseMsg.style.display = "block";
  } else {
    pauseMsg.style.display = "none";
  }
});

// === Network Information API === show the realtime network speed
const networkStatus = document.getElementById("network-status");
function showNetworkInfo() {
  const net = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (net) {
    networkStatus.textContent = `📶 Network: ${net.effectiveType.toUpperCase()} (${net.downlink} Mbps)`;
  } else {
    networkStatus.textContent = "⚠️ Network Information API not supported.";
  }
}
showNetworkInfo();

// === Geolocation API === To get the real-time location of the user
const locationDiv = document.getElementById("location");
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      locationDiv.textContent = `🌍 You're studying from: (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
    },
    () => {
      locationDiv.textContent = "🌍 Location access denied.";
    }
  );
} else {
  locationDiv.textContent = "🌍 Geolocation not supported.";
}

// === Intersection Observer ===
const tips = document.getElementById("tips");
const tipObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tips.style.background = "#d4edda";
    }
  });
});
tipObserver.observe(tips);

// === Streak Tracker === store the streak in localstorage
const streakDiv = document.getElementById("streak");
function increaseStreak() {
  let count = localStorage.getItem("streak") ||0
  count = parseInt(count) + 1;
  localStorage.setItem("streak", count);
  streakDiv.textContent = `🔥 Sessions Completed: ${count}`;
}

function loadStreak() {
  const count = localStorage.getItem("streak") || 0;
  streakDiv.textContent = `🔥 Sessions Completed: ${count}`;
}

loadStreak();
updateTimeDisplay();
drawProgress();
