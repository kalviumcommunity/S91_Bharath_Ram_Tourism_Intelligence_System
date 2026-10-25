# Tourism Intelligence System

## 📖 Project Overview

The **Tourism Intelligence System** is an AI-powered web application designed to help tourism departments analyze visitor data and identify travel patterns, preferences, and emerging trends. By combining data visualization and predictive analytics, the platform enables authorities to make informed decisions, improve destination management, and enhance the overall tourist experience.

---

## 📅 Development Plan

### Week 1 – Planning & Setup

* Finalize project requirements.
* Design the database schema.
* Set up the React frontend, Flask backend, and MySQL database.
* Initialize the GitHub repository.

### Week 2 – Core Development

* Implement user authentication.
* Develop visitor and destination management modules.
* Build REST APIs and integrate the frontend with the backend.

### Week 3 – Analytics Dashboard

* Create dashboards with charts and reports.
* Analyze visitor demographics, travel preferences, and tourism trends.
* Generate interactive visualizations.

### Week 4 – AI Integration & Deployment

* Train and integrate a machine learning model for trend prediction.
* Enhance the user interface.



## Live Deployment

The Tourism Intelligence System frontend is deployed on Netlify.

- **Live Frontend:** https://tourism-intelligence-system.netlify.app
- **Backend API:** https://s91-bharath-ram-tourism-intelligence.onrender.com

### Deployment Configuration

- **Frontend hosting:** Netlify
- **Backend hosting:** Render
- **Frontend framework:** React with Vite
- **Backend:** Node.js and Express
- **Database:** MongoDB

The frontend uses the `VITE_API_URL` environment variable to communicate with the deployed backend. Google sign-in uses the `VITE_GOOGLE_CLIENT_ID` environment variable.

Environment variables are configured in the respective hosting dashboards. Secret values are not committed to the repository.

### Features Verified

- Google authentication
- Manual login and registration
- Tourism visitor management
- Destination management
