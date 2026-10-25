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


## Frontend Deployment

### Live Application

- **Public Frontend:** https://tourism-intelligence-system.netlify.app
- **Backend API:** https://s91-bharath-ram-tourism-intelligence.onrender.com
- **Frontend Hosting:** Netlify
- **Backend Hosting:** Render

### Frontend Build Process

The frontend is built using React and Vite.

1. Navigate to the frontend directory:

   ```bash
   cd client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Build the production application:

   ```bash
   npm run build
   ```

4. Vite generates the production build in the `client/dist` directory.

5. Netlify deploys the frontend build. The build command is `npm run build`, and the publish directory is `client/dist` when the Netlify base directory is the repository root. If the Netlify base directory is set to `client`, the publish directory should be `dist`.

### Environment Configuration

The frontend uses the following environment variables:

- `VITE_API_URL` — URL of the deployed backend API.
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client ID used for Google sign-in.

These variables are configured in Netlify's environment variable settings. Secret credentials must not be committed to GitHub.

### Feature Verification

Record the actual result of each test before marking it as passed.

| Feature | Test to perform | Result |
|---|---|---|
| Public frontend | Open the Netlify URL | Pending verification |
| Google authentication | Sign in and confirm the expected authenticated state | Pending verification |
| Manual login | Log in with a valid test account | Pending verification |
| Visitor management | Create or retrieve a visitor and confirm the result | Pending verification |
| Destination management | Open destinations and test the relevant API operation | Pending verification |
| Backend connectivity | Confirm API requests succeed in browser DevTools | Pending verification |

Update each result after testing the deployed application. Include any failures or limitations honestly.


