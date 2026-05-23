# HomeDine-Ecommerce 🍽️

A modern, full-stack E-commerce platform for home dining and kitchenware. This project features a React frontend, a Node.js/Express backend, and a fully automated CI/CD pipeline deployed on AWS.

## 🚀 Live Demo
- **Frontend:** [https://d3czzaqnpsjlx6.cloudfront.net](https://d3czzaqnpsjlx6.cloudfront.net)
- **API Status:** [http://54.236.34.160:5000](http://54.236.34.160:5000)

---

## ✨ Features
- **Responsive Design:** Polished UI using React and Vanilla CSS.
- **Product Management:** Dynamic product grids and detailed views.
- **Cart System:** Persistent shopping cart functionality.
- **User Authentication:** Secure login and registration with JWT.
- **Automated CI/CD:** Zero-downtime deployments via Jenkins and Docker.
- **Cloud Infrastructure:** Hosted on AWS (S3, CloudFront, EC2).

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Axios, Lucide React.
- **Backend:** Node.js, Express, MongoDB (Mongoose).
- **DevOps:** Docker, Docker Compose, Jenkins, GitHub Actions.
- **Cloud:** AWS S3 (Hosting), AWS CloudFront (CDN), AWS EC2 (API).

---

## 🏗️ Local Development

### Prerequisites
- Docker & Docker Compose installed.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Soumyosish/HomeDine-Ecommerce.git
   cd HomeDine-Ecommerce
   ```
2. Run the entire stack:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 🔄 CI/CD Pipeline

Our deployment process is fully automated:

1. **GitHub Actions (CI):** Every push to `master` triggers a build check and linting to ensure code quality.
2. **Jenkins (CD):** Once CI passes, our Jenkins server (on EC2) performs:
   - **Frontend:** Builds the React app and syncs to **AWS S3**, followed by a **CloudFront** invalidation.
   - **Backend:** Builds a fresh **Docker** image, stops the old container, and restarts the API with updated code.

---

## ⚙️ Environment Variables
For the backend to run, ensure a `.env` file exists in the deployment directory with:
- `PORT`: 5000
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Your security token.
- `FRONTEND_URL`: Your CloudFront URL.

---

## 📄 License
This project is licensed under the ISC License.
