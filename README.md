# JalDhara-Water-Management-System
### IoT-enabled water tanker management platform built with the MERN stack and Socket.io. [cite_start]Features real-time water level monitoring, live GPS tracking, and geofenced delivery verification.

# 💧 Jal Dhara
**Jal Dhara: Smart Water Tanker Management & Distribution System** 

Jal Dhara is a digital-first solution designed to eliminate "information blackouts" in urban water distribution, specifically addressing the water scarcity challenges in Mira Bhayandar. It streamlines the manual booking process by providing a centralized platform for residents, vendors, and municipal admins to monitor water levels and logistics in real-time.

## 🚀 Features

- **📍 Real-Time Tracking:** Zero-latency live tanker tracking using WebSockets (Socket.io) with precise ETAs for residents.
- **📡 IoT Sensor Integration:** Live monitoring of society water tanks using Ultrasonic sensors to prevent shortages and overflows. 
- **🛡️ Geofencing & Security:** Automated delivery verification using the Haversine formula to ensure tankers reach the correct destination and prevent water theft.
- **📊 Admin Control Hub:** A centralized dashboard for fleet oversight, distribution scheduling, and resource analytics. 
- **📱 One-Tap Interfaces:** Responsive web modules for Residents to request water and for Drivers to update delivery status using browser-based GPS.

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML5, CSS3, JavaScript
- **Maps & Visualization:** Leaflet.js, Google Maps API, Chart.js
- **Backend:** Node.js, Express.js 
- **Database:** MongoDB Atlas (Cloud Storage) 
- **Real-time Communication:** Socket.io (WebSockets) 
- **Hardware:** Ultrasonic Sensors (HC-SR04), Driver Smartphones 

## 📂 Project Structure

```bash
JalDhara/
│
├── backend/                  # ⚙️ Backend Server Code
│   ├── models/               # Database Schemas (Users, Tankers, Records)
│   ├── node_modules/         # Dependencies
│   ├── .env                  # Environment Variables (API Keys, DB URI)
│   ├── package.json          # Backend Settings
│   └── server.js             # Main Entry Point (Express + Socket.io)
│
├── frontend/                 # 💻 Frontend Application (React)
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   ├── pages/            # Admin, Resident, and Driver Interfaces
│   │   └── App.js            # Main Routing
│   ├── public/               # Static Assets & Logos
│   └── package.json          # Frontend Dependencies
│
├── hardware/                 # 🛰️ IoT/Sensor Scripts
│   └── sensor_script.py      # Ultrasonic Sensor Telemetry Logic
│
└── README.md                 # 📄 Project Documentation
```

## ⚙️ Installation & Local Setup

### Prerequisites

* Install [Node.js](https://nodejs.org/) (v14 or higher).
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for cloud database storage.

### Step 1: Clone the Repository

```bash
git clone https://github.com/YourUsername/JalDhara-Water-System.git
cd JalDhara
```

### Step 2: Setup the Backend

```bash
cd backend
npm install
# Create a .env file and add your MONGODB_URI and PORT
npm start
```

### Step 3: Setup the Frontend

```bash
cd ../frontend
npm install
npm start
```

## 📱 How to Test

1.  **Admin Login:** Open the Admin Dashboard to see the centralized map and fleet status.
2.  **IoT Simulation:** Activate the sensor script to see live water level updates on the Resident Portal.
3.  **Driver Action:** Use a mobile browser in the Driver Module to "Start Delivery."
4.  **Live Monitoring:** Watch the tanker marker move in real-time on the Resident and Admin maps as it approaches the geofenced delivery zone.

## 🤝 Contributing

Contributions to improve water sustainability are welcome! Please fork the repository and submit a pull request.

---

**Built with ❤️ for IDEA LAB-4 | SHREE L. R. TIWARI COLLEGE OF ENGINEERING 2026** 
