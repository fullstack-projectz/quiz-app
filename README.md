# Quiz Application Backend

## Table of Contents

- [Quiz Application Backend](#quiz-application-backend)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

---

## Overview

The **Quiz Application Backend** is a RESTful API built with **Node.js**, **Express.js**, and **TypeScript**. It allows administrators to create and manage quizzes, and users to view and take quizzes. The backend interacts with a **MySQL** database to store and retrieve quiz data, including quiz details and associated questions.

---

## Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MySQL
- **Database Driver:** `mysql2` (for database interactions)
- **Validation:** `express-validator`
- **Environment Management:** `dotenv`
- **Others:** `cors` for handling Cross-Origin Resource Sharing

---

## Features

- **Quiz Management:**
  - Create quizzes with multiple questions.
  - Retrieve a list of all quizzes.
  - Retrieve detailed information about a specific quiz, including its questions.
- **Data Validation:**
  - Request data is validated using `express-validator` to ensure data integrity.
- **Error Handling:**
  - Comprehensive error handling to manage and respond to different error scenarios.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** database
- **Git** (optional, for version control)

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/quiz-app-backend.git
   cd quiz-app-backend
   ```
