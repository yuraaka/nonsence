# Notes Application

A modern, full-stack notes application built with **Next.js** (frontend) and **Go** (backend), featuring an iOS-inspired design and containerized deployment with **Kong API Gateway**.

## Architecture

- **Frontend**: Next.js 15 with TypeScript, modern React patterns, and iOS-inspired UI
- **Backend**: Go REST API with in-memory storage and CORS support
- **API Gateway**: Kong with PostgreSQL for advanced routing and middleware
- **Deployment**: Docker Compose for local development and production

## Features

- ✨ **Modern UI**: iOS-inspired design with smooth animations
- 🚀 **Full-Stack**: Complete CRUD operations for notes
- 🔄 **Real-time Updates**: Optimistic UI updates with error handling
- 📱 **Responsive**: Works seamlessly on desktop and mobile
- 🐳 **Containerized**: Easy deployment with Docker
- 🛡️ **Type Safe**: Full TypeScript support
- 🚦 **API Gateway**: Kong for routing and middleware

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Go 1.21+ (for local development)

### Development Setup

1. **Start the infrastructure:**
   ```bash
   docker compose up -d --force-recreate
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Kong Admin: http://localhost:8002

3. **Stop the infrastructure:**
   ```bash
   docker compose down
   ```

### Local Development

For development with hot reload:

1. **Backend:**
   ```bash
   cd backend
   go mod tidy
   go run main.go
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## API Endpoints

The Go backend provides the following REST endpoints:

- `GET /notes` - Retrieve all notes
- `POST /notes` - Create a new note (body: `{"content": "note text"}`)
- `DELETE /notes?id=<note_id>` - Delete a note
- `GET /health` - Health check endpoint

## Project Structure

```
├── backend/           # Go REST API
│   ├── main.go       # Server and API handlers
│   ├── go.mod        # Go dependencies
│   └── Dockerfile    # Backend container
├── frontend/         # Next.js application
│   ├── app/          # App router pages
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   ├── types/        # TypeScript definitions
│   ├── styles/       # CSS styles
│   └── controller/   # API client logic
├── apigw/           # Kong API Gateway config
└── docker-compose.yaml # Multi-service orchestration
```

## Architecture Improvements

This refactored version includes:

- **Simplified State Management**: Removed Redux in favor of custom React hooks
- **Unified Components**: Consolidated scattered components into a single `NotesApp`
- **Real Backend**: Replaced mock data with actual Go REST API
- **Better Error Handling**: Comprehensive error states and loading indicators
- **Improved Styling**: Modern, responsive CSS with iOS inspiration
- **Type Safety**: Consistent TypeScript usage throughout
- **Docker Integration**: Full containerization with health checks

## Future Enhancements

- [ ] Persistent database storage (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Real-time collaboration with WebSockets
- [ ] Note categories and tags
- [ ] Search and filtering
- [ ] Rich text editing
- [ ] Mobile app with React Native
