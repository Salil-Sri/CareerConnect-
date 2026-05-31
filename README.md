# CareerConnect – AI Tutoring, Learning & Job Platform

CareerConnect is a comprehensive platform that bridges the gap between learning and employment by providing AI-powered tutoring, skill assessments, job opportunities, and career guidance. The platform helps students and job seekers enhance their skills, evaluate their knowledge, and connect with relevant career opportunities.

##  Features

###  Student Features

* User Registration & Authentication
* AI-Powered Learning Assistance
* Skill-Based Assessments & Tests
* Job Search & Application Tracking
* Personalized Career Recommendations
* Resume Upload & Analysis
* Performance Dashboard
* Progress Tracking

###  Recruiter Features

* Create and Manage Job Postings
* View Candidate Applications
* Shortlist and Manage Applicants
* Track Recruitment Process
* Access Candidate Profiles

###  Admin Features

* User Management
* Job Management
* Skill Assessment Management
* Platform Analytics & Reports
* Content Moderation

##  Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

### AI & Additional Services

* Gemini API
* Resume Analysis
* Skill Recommendation Engine

##  Project Structure

```bash
CareerConnect/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .env
├── README.md
└── package.json
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Salil-Sri/CareerConnect.git
cd CareerConnect
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🚀 Usage

1. Register/Login to the platform.
2. Complete your profile.
3. Take skill assessments.
4. Explore learning resources and AI tutoring.
5. Apply for jobs matching your skills.
6. Track your progress through the dashboard.

## 🔒 Security Features

* JWT Authentication
* Password Hashing with bcrypt
* Protected Routes
* Role-Based Access Control

## 📈 Future Enhancements

* AI Mock Interviews
* Video Interview Integration
* Real-Time Chat
* Skill Gap Analysis
* Course Recommendations
* Placement Analytics

##  Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

##  License

This project is licensed under the MIT License.

##  Author

**Salil Srivastava**

GitHub: https://github.com/Salil-Sri

---

⭐ If you found this project useful, please consider giving it a star.
