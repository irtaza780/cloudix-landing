# CloudIX Tech Solutions - Web Application

A simple Next.js web application for CloudIX Tech Solutions, a multinational health information technology corporation. This application provides client management functionality with full CRUD operations.

## Features

- **Modern Homepage**: Professional design showcasing CloudIX Tech Solutions
- **Client Management**: Complete CRUD operations for client data
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **API Integration**: RESTful API endpoints for data operations
- **Database Integration**: PostgreSQL with Sequelize ORM

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Sequelize ORM
- **Styling**: Tailwind CSS

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 18 or later)
- PostgreSQL database server
- npm or yarn package manager

## Installation

1. **Clone and navigate to the project**:
   ```bash
   cd cloudix-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**:
   - Create a PostgreSQL database named `cloudix_db`
   - Update the database credentials in `.env.local` if needed

4. **Configure environment variables**:
   The `.env.local` file is already configured with default values:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=cloudix_db
   DB_USER=postgres
   DB_PASSWORD=password
   ```
   Update these values according to your PostgreSQL setup.

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Clients API

- `GET /api/clients` - Retrieve all clients
- `POST /api/clients` - Create a new client
- `GET /api/clients/[id]` - Retrieve a specific client
- `PUT /api/clients/[id]` - Update a specific client
- `DELETE /api/clients/[id]` - Delete a specific client

### Client Data Structure

```typescript
{
  id?: number;
  name: string;
  email: string;
  company: string;
  phone?: string;
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
}
```

## Database Setup

The application uses Sequelize ORM with PostgreSQL. The database tables will be automatically created when you first run the application and make an API call.

### Manual Database Setup (Alternative)

If you prefer to set up the database manually:

1. Connect to your PostgreSQL server
2. Create the database:
   ```sql
   CREATE DATABASE cloudix_db;
   ```

## Project Structure

```
cloudix-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── clients/
│   │   │       ├── route.ts
│   │   │       └── [id]/route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── lib/
│   │   └── database.ts
│   └── models/
│       └── Client.ts
├── .env.local
├── package.json
└── README.md
```

## Usage

1. **Homepage**: View the CloudIX Tech Solutions homepage with company information
2. **Add Clients**: Use the "Add New Client" button to create new client records
3. **View Clients**: All clients are displayed in a responsive table
4. **Edit Clients**: Click "Edit" to modify existing client information
5. **Delete Clients**: Click "Delete" to remove clients (with confirmation)

## Development

To contribute to this project:

1. Make your changes
2. Test the application thoroughly
3. Ensure all CRUD operations work correctly
4. Check responsive design on different screen sizes

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check database credentials in `.env.local`
- Ensure the database `cloudix_db` exists

### API Issues

- Check browser console for error messages
- Verify API endpoints are accessible at `http://localhost:3000/api/clients`

## Security Note

This is a demonstration application. In a production environment, implement proper:
- Authentication and authorization
- Input validation and sanitization  
- Environment variable security
- Database security measures
- HTTPS encryption

## License

This project is for educational and demonstration purposes for CloudIX Tech Solutions.
