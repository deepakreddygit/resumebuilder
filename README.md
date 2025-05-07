# resumebuilder

# ProResume -  Resume Builder

ProResume is a full-stack web application designed to help users easily create professional, role-specific resumes with real-time preview functionality. The app supports template selection, dynamic form fields, and PDF export.

##  Tech Stack

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Database**: MongoDB (via PyMongo)
- **Authentication**: Session Based
- **Cloud Services**: Cloudinary (for image/file handling)



## Project Structure

```
resumebuilder/
├── client/                         # React frontend
│   ├── public/
│   │   ├── assets/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── templates/
│   │   │   ├── Navbar.js
│   │   │   ├── ResumeTemplate.js
│   │   │   ├── ResumeAnalytics.js
│   │   │   ├── ReviewForm.js
│   │   │   ├── ReviewsSlider.js
│   │   │   ├── Sidebar.js
│   │   │   └── TipsPanel.js
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   └── reportWebVitals.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── flask-server/                   # Flask backend
│   ├── backend_templates/
│   ├── routes/
│   ├── venv/                       # Virtual environment (do not include in ZIP)
│   ├── .env
│   ├── config.py
│   ├── db.py
│   ├── extensions.py
│   ├── server.py
│   └── requirements.txt
│
├── README.md
```



## Setup Instructions

### 1. Backend (Flask)

```bash
cd flask-server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python server.py
```

### 2. Frontend (React)

```bash
cd ../client
npm install
npm start
```

> Ensure MongoDB URI, Cloudinary config, and secret keys are set in your `.env` file.

---

## Features

- User Authentication (Signup/Login)
- Real-time Resume Preview
- Role-specific Dynamic Forms
- Template Selection
- Autofill basic details
- Progress bar
- CURD Operations for Resume
- Cloudinary File Upload
- Resume Download as PDF
- Dashboard with Analytics
- User Reviews



## Deployment

- **Frontend (React App)**:  
  Deploy on [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/) for fast and seamless hosting.  
  These platforms automatically detect the React project and handle build/deployment with minimal configuration.

- **Backend (Flask Server)**:  
  Use [Render](https://render.com/), [Railway](https://railway.app/), or [Heroku](https://www.heroku.com/) to deploy the Flask API.  
  Ensure all environment variables are securely added in the deployment settings, and MongoDB is accessible via connection URI.

- **Serving Location**:  
This project is already deployed on http://proresume.kentcs.org:8316/dashboard

## Dependencies

From `requirements.txt`:

- `flask`
- `flask_cors`
- `flask_mail`
- `pyjwt`
- `pymongo`
- `bcrypt`
- `cloudinary`
- `python-dotenv`



## Authors

Group 5 –  
- Deepak Reddy  
- Varshini Kilaru
- Meenakshi Menchu
- Siva Macharla Vimjam
- Jaswini Pamulapati
- Monisha Chakka



