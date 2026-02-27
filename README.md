# IoT Telemetry API

This project is a Node.js backend service for managing IoT devices and telemetry data using Express.js and MongoDB (Mongoose).

It provides APIs to:
- Register and manage IoT devices
- Store telemetry data from devices
- Query telemetry data and statistics
- Detect alerts such as low battery and offline devices
- Perform geospatial queries to find nearby devices

--------------------------------------------------

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman (API documentation)

--------------------------------------------------

## Project Setup

### 1. Clone the Repository

git clone <repository-url>
cd telemetryApi

--------------------------------------------------

### 2. Install Dependencies

npm install

--------------------------------------------------

### 3. Configure Environment Variables

Create a `.env` file in the root folder.

Example:

MONGO_URI=mongodb://localhost:27017/telemetry

--------------------------------------------------

### 4. Start MongoDB

Make sure MongoDB is running locally.

Example:

mongod

--------------------------------------------------

### 5. Run the Server

npm run dev

or

node server.js

Server will start at:

http://localhost:5000

--------------------------------------------------

## API Documentation

The project includes a Postman collection for testing all APIs.

Import the file:

iot-telemetry-api.postman_collection.json

into Postman.

Base URL:

http://localhost:5000

--------------------------------------------------

## Main API Endpoints

### Device Management

POST /devices  
Register a new device

PATCH /devices/:deviceId/status  
Update device status

GET /devices/:deviceId  
Get device details

GET /devices  
List devices with pagination

GET /devices?type=temperature&status=inactive  
Filter devices

--------------------------------------------------

### Geospatial Query

GET /devices/nearby/search  

Example:

/devices/nearby/search?lat=19.0760&long=72.8777&radius=5000

Returns devices within a given radius.

--------------------------------------------------

### Telemetry Management

POST /telemetry  
Insert telemetry data

POST /telemetry/bulk  
Bulk telemetry insert

GET /telemetry/:deviceId  
Get telemetry by device

GET /telemetry/latest  
Get latest telemetry per device

--------------------------------------------------

### Analytics

GET /telemetry/:deviceId/stats  

Example:

/telemetry/dev-101/stats?metric=temperature&start=...&end=...

Returns average, minimum and maximum values for a metric.

--------------------------------------------------

### Alerts

GET /telemetry/alerts/low-battery  
Returns devices with battery below threshold.

GET /telemetry/alerts/offline  
Returns devices that have not sent telemetry for 15 minutes.

--------------------------------------------------

## Database Optimization

The system uses several MongoDB optimizations:

Indexes
- deviceId
- timestamp
- deviceId + timestamp

TTL Index
- Automatically deletes telemetry data older than 90 days

2dsphere Index
- Enables geospatial queries for nearby devices

--------------------------------------------------

## Bonus Features

- Real-time alert logging for low battery devices
- Geospatial device queries
- Bulk telemetry ingestion
- Aggregation-based statistics
