
# Library Management System (LMS)

**Access the Application Here (after following the installation guide):** 

[Library Management System Website](http://127.0.0.1:8001/auth/)

## Project Overview

- Full-stack Python web app using microservices
- Built for digital media management in libraries
- Supports user login, borrowing, searching, and returning materials
- Hosts an entire admin login and management system
- Deployed using Docker, Kubernetes, Google Cloud, and Nginx

## Installation Guide

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- **Docker Desktop**  
  Make sure you have Docker Desktop installed. You can download it from [here](https://www.docker.com/products/docker-desktop).

- **Python 3.10 or higher**  
  Check your Python version:
  ```sh
  python --version
  ```

- **Node.js**  
  Check your Node.js version:
  ```sh
  npm -v
  ```

### Steps to Run the Backend with Docker

1. **Clone the entire repository:**
   ```sh
   git clone https://github.com/mansijp/LMS_CAPSTONE_2025.git
   cd LMS_CAPSTONE_2025
   ```

2. **Create or verify the ```docker-compose.yml``` file:**

   This file should be at the **root of the repository** and configured to build and run all the microservices on their respective ports.

3. **Run all microservices together using Docker Compose:**

   Make sure you have Docker Desktop installed (link provided above), and run the following command in a new terminal:
   ```sh
   docker-compose up --build
   ```
   This command will build and run all the Docker images automatically.

5. **Access the microservices:**

   After running the Docker containers, you can access the application through the first microservice
   ```sh
   http://127.0.0.1:8001/auth
   ```

6. **To stop all services:**

   In the terminal where Docker Compose is running, press ```Ctrl + C``` or run:
   ```sh
   docker-compose down
   ```

### Microservice Folder Names and Ports

| No. | Microservice Name    | Port  |
|-----|--------------------------|-------|
| 1   | Customer_Authentication  | 8001  |
| 2   | Catalog_Management       | 8002  |
| 3   | Search                   | 8003  |
| 4   | Reservations             | 8004  |
| 5   | MyLibrary                | 8005  |
| 6   | User_Management          | 8006  |
| 7   | Notifications            | 8008  |

## Technologies Used

### Backend

- Python, FastAPI
- MongoDB

### Frontend

- JavaScript, Bootstrap, CSS, HTML

### DevOps

- Docker, Kubernetes
- Nginx Ingress, Google Cloud

## System Architecture

- Microservices for independent features
- Nginx Ingress for inter-service and frontend-backend communication
- MongoDB for data storage (epubs, mp3s, images, text)
- SendInBlue (Brevo) for external email communication service
- Secure authentication using JWT tokens and session cookies

## Contributors
- Mansi Patel
- Vaishali Jadon
- Astha Patel
- Atiya Azeez


## Original Repository:

**Note:** The original repository may not be available, so the current repository reflects the deployed web application.

>[LMS_CAPSTONE_2025](https://github.com/asthapatel1125/LMS_CAPSTONE_2025)