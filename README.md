# VIKASA Docker Setup 🐋

## Prerequisites
* Docker

* Docker Compose

### Setup Instructions
1. Clone the Repository

bash
```
git clone https://github.com/jyotendra/vikasa-form-app.git
cd vikasa-form-app
```

2. Build and Start Services

bash
```
docker-compose up --build
```
3. Access the Application

Frontend: http://localhost:3000

Backend API: http://localhost:8002

DynamoDB: http://localhost:8000

4. Stop Services

bash
```
docker-compose down
```