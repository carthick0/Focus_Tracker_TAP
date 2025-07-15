# 📚 Smart Study Timer & Focus Tracker

A smart, distraction-free productivity timer built using **Vanilla JavaScript**, **Canvas API**, and Web APIs like **Geolocation**, **Network Information**, and **Intersection Observer**. This timer helps users stay focused with break reminders, session tracking, and real-time feedback.

---

## 🚀 Features

- ⏱️ **Pomodoro-style Focus Timer** with custom time input
- 🛑 **Pause timer** when switching tabs (via Background Tasks API)
- 🔔 **Break Reminders** after session ends
- 📍 **Location Detection** using Geolocation API
- 📡 **Network Status Monitoring** using Network Information API
- 👀 **Motivational Tips Highlighted** using Intersection Observer API
- 📈 **Progress Bar** using Canvas API
- 🔥 **Session Streak Tracker** with Local Storage

---

## 🌐 Live Demo

> 🚀 Deployed on Vercel : ([https://focus-tracker-1p2rlt0oo-carthick0s-projects.vercel.app/](https://focus-tracker-tap-fdpb.vercel.app/))


---

## 🧪 Tech Stack

- HTML5 + CSS3
- Vanilla JavaScript
- Web APIs:
  - [`Canvas API`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  - [`Geolocation API`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
  - [`Network Information API`](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
  - [`Intersection Observer API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
  - [`Background Tasks`](https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API)

---

## 📁 Folder Structure

-├── index.html # Main HTML layout
-├── style.css # Stylish responsive design
-├── script.js # Timer logic & Web API integration
-└── README.md # Project details



---

## 🧠 How It Works

- **Timer Logic**: Tracks remaining time, supports pause/resume, custom time setting.
- **Canvas API**: Renders a dynamic progress bar indicating session completion.
- **Visibility API**: Detects when the user switches tabs and pauses timer.
- **Geolocation API**: Fetches and displays current location coordinates.
- **Network Info API**: Shows the network connection status (type and speed).
- **Intersection Observer**: Highlights motivational tips when visible on screen.
- **Local Storage**: Persists completed session count even on reload.

---

## 🛠️ Setup & Run Locally

1. Clone this repo:
   ```bash
   git clone https://github.com/carthick0/Focus_Tracker_TAP
   cd Focus_Tracker_TAP
