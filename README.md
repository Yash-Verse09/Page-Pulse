# 🚀 Page Pulse

Page Pulse is a web-based URL auditing tool that analyzes any webpage and provides technical insights about the website structure and response.

The application allows users to enter any valid URL and generates an audit report containing:

- HTTP status
- Response time
- Page title
- Meta description
- H1 heading count
- Images missing alt attributes
- Approximate word count

Built as part of the **Digital Heroes Software Development Engineer (SDE) Training Task**.

---

# 🌐 Live Demo

🚀 **Live Website:**  

[Click here to visit Page Pulse](https://page-pulse-phi-nine.vercel.app)

---

# ✨ Features

## Website Analysis

- Analyze any publicly accessible webpage
- Fetch HTML content from URL
- Extract important webpage metadata
- Generate a structured audit report


## Report Information

The tool provides:

- HTTP response status
- Website response time
- Page title
- Meta description
- Number of H1 tags
- Images without alt text
- Approximate word count


## Error Handling

Handles:

- Invalid URLs
- Website unreachable errors
- Request timeout
- Non HTML responses
- Server errors

The application never crashes and returns meaningful error messages.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- CSS


## Backend

- Node.js
- Express.js
- Axios
- Cheerio
- Jest

---

# 🏗️ System Architecture

Page Pulse follows a client-server architecture.

```text
                    User
                      |
                      |
                      ▼

              React Frontend
                      |
                      |
             HTTP API Request
                      |
                      |
                      ▼

          Node.js + Express Backend
                      |
                      |
                      ▼

              URL Analyzer Service
                      |
                      |
                      ▼

            External Website Server
```

---

# 🎨 Frontend Architecture

```text
              React Frontend


                    App.jsx
                       |
                       |
              React Router
                       |
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼

    ┌───────────┐             ┌────────────┐
    │ Home.jsx  │             │ Result.jsx │
    │           │             │            │
    │ URL Input │             │ Report UI  │
    │ API Call  │             │ Metrics    │
    │ Errors    │             │            │
    └─────┬─────┘             └─────▲──────┘
          │                         │
          │                         │
          └─────────┬───────────────┘
                    |
                    ▼

              Axios Request

                    |
                    ▼

          Express Backend API
```

---

# ⚙️ Backend Architecture

```text
              Node.js Backend


                  Client Request
                         |
                         |
                         ▼

                ┌──────────────┐
                │  server.js   │
                │              │
                │ Express API  │
                │ Routes       │
                └──────┬───────┘
                       |
                       |
                       ▼

                ┌──────────────┐
                │ analyzer.js  │
                │              │
                │ URL Validate │
                │ Axios Fetch  │
                │ Cheerio Parse│
                └──────┬───────┘
                       |
                       |
                       ▼

                JSON Response
```

---

# 🔄 Application Workflow

## Step 1: User Input

User enters a website URL from the frontend.

Example:

```
https://example.com
```

---

## Step 2: Frontend Request

React sends a POST request to backend:

```
POST /api/audit
```

Request:

```json
{
  "url": "https://example.com"
}
```

---

## Step 3: Backend Processing

`server.js` receives the request and:

- Validates request body
- Handles API routing
- Calls analyzer service


---

## Step 4: URL Analysis

`analyzer.js` performs:

- URL validation
- Website fetching using Axios
- Response time calculation
- HTML parsing using Cheerio


---

## Step 5: Data Extraction

The analyzer extracts:

- Title
- Meta description
- H1 count
- Missing image alt attributes
- Word count


---

## Step 6: Response

Backend returns JSON response.

Frontend displays the report.

---

# 📂 Project Structure

```text
Page-Pulse
│
├── Frontend
│   │
│   ├── src
│   │   │
│   │   ├── App.jsx
│   │   │      Application routing
│   │   │
│   │   ├── Home.jsx
│   │   │      URL input and API request
│   │   │
│   │   ├── Result.jsx
│   │   │      Audit report display
│   │   │
│   │   ├── App.css
│   │   │      Component styling
│   │   │
│   │   └── index.css
│   │          Global styling
│   │
│   └── package.json
│
│
├── backend
│   │
│   ├── server.js
│   │      Express server and routes
│   │
│   ├── analyzer.js
│   │      URL analysis logic
│   │
│   ├── tests
│   │   │
│   │   └── analyzer.test.js
│   │          Jest test cases
│   │
│   └── package.json
│
└── README.md
```

---


# ⚡ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Yash-Verse09/Page-Pulse.git
```

Navigate:

```bash
cd Page-Pulse
```

---

# Backend Setup

Go to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start server:

```bash
node server.js
```

Backend runs:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

Frontend runs:

```
http://localhost:5173
```

---

# 🔌 API Documentation

## Analyze URL

### Endpoint

```
POST /api/audit
```

---

## Request

```json
{
  "url": "https://example.com"
}
```

---

## Response

```json
{
  "url": "https://example.com",
  "httpStatus":200,
  "responseTimeMs":306,
  "pageTitle":"Example Domain",
  "metaDescription":"Example description",
  "h1Count":1,
  "imagesMissingAlt":0,
  "wordCount":17
}
```

---

# ❌ Error Handling

## Invalid URL

Example:

```
abc123
```

Response:

```json
{
 "error":"Invalid URL format."
}
```

---

## Website Not Reachable

Response:

```json
{
 "error":"Could not reach the website. Please check the URL."
}
```

---

## Timeout Error

Response:

```json
{
 "error":"Request timed out while trying to reach the website."
}
```

---

## Non HTML Response

Response:

```json
{
 "error":"The URL did not return an HTML page."
}
```

---

# 🧪 Testing

The project includes automated tests for the URL analyzer logic.

Tests cover:

1. Happy Path
- Successfully analyzes a valid webpage
- Extracts title, metadata, headings, images and word count


2. Invalid URL Handling
- Rejects malformed URLs
- Returns a meaningful error message


3. Unreachable Website Handling
- Handles websites that cannot be accessed
- Prevents application crashes


Run tests:
cd backend
npm test

---

# 💡 Design Decisions

## 1. Separation of Concerns

The application separates responsibilities:

### server.js

Handles:

- Express server
- API routes
- Middleware
- Responses


### analyzer.js

Handles:

- URL fetching
- HTML parsing
- Data extraction


This makes the application easier to maintain.

---

## 2. Cheerio HTML Parsing

Cheerio was used instead of manual HTML parsing because:

- It provides DOM-like selectors
- Makes extraction cleaner
- Avoids unreliable string parsing

---

## 3. Error Handling Strategy

Different failures are handled separately:

- Invalid URL
- Timeout
- Network failure
- Non HTML content

The API always returns meaningful responses.

---


# 🎥 Loom Demo

A walkthrough video explaining:
- Application workflow
- Backend API
- Analyzer logic
- Testing approach
- One improvement I would make with additional development time

Demo Link:

(Add Loom URL here)

# 🚀 Future Improvements

Possible improvements:

- SEO score generation
- Performance scoring
- Accessibility analysis
- Broken link checker
- Screenshot generation
- Database integration
- User authentication
- Previous audit history

---

# 👨‍💻 Developer

## Yash Gupta

BCA Final Year Student at ITM University

Aspiring Software Engineer | Web Developer | Tech Enthusiast


---

# 📜 Credit

Built for Digital Heroes Training Task

Website:

https://digitalheroesco.com
