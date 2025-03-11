# Chat Bot Full-Stack Application Project

## Overview
This is a full-stack web application with a Next.js frontend, Express.js backend, and PostgreSQL database hosted on Neon. The application has been containerized using Docker for consistent deployment across environments.

## Tech Stack
- **Frontend**: Next.js 
- **Backend**: Express.js
- **Database**: PostgreSQL (Neon cloud database)
- **ORM**: Prisma
- **Containerization**: Docker & Docker Compose

## Architecture
The application follows a three-tier architecture:
- **Presentation Layer**: Next.js client application
- **Application Layer**: Express.js API server
- **Data Layer**: PostgreSQL database on Neon

## Prerequisites
- Docker and Docker Compose installed
- Git for version control
- Node.js and npm (for local development without Docker)
- A Neon PostgreSQL database instance

## Getting Started

### Clone the Repository
```bash
git clone [https://github.com/Funmi-Amusan/chat-bot.git]
cd [chat-bot]
```

### Environment Setup
Create a `.env` file in the server folder with the following variable:
```
# Database connection
DATABASE_URL=postgresql://neondb_owner:npg_tHl4kPQj9pKa@ep-shy-rain-abtjgbsv-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
```

Create a `.env` file in the client folder with the following variable:
```
# API URL for client
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running with Docker
```bash
# Build and start the containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the containers
docker-compose down
```

### Local Development (Without Docker)
#### Frontend (Client)
```bash
cd client
npm install
npm run dev
```

#### Backend (Server)
```bash
npm install
npm run dev
```

### Accessing the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Documentation
For detailed API documentation, refer to the API documentation page at `/api/docs` when running the server.
