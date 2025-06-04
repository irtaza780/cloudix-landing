import { NextRequest, NextResponse } from 'next/server';
import sequelize from '@/lib/database';
import Client from '@/models/Client';

// Initialize database connection
async function initDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

// GET all clients
export async function GET() {
  try {
    await initDb();
    const clients = await Client.findAll({
      order: [['created_at', 'DESC']],
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST new client
export async function POST(request: NextRequest) {
  try {
    await initDb();
    const body = await request.json();
    const { name, email, company, phone, status } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Name, email, and company are required' },
        { status: 400 }
      );
    }

    const client = await Client.create({
      name,
      email,
      company,
      phone,
      status: status || 'active',
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error: any) {
    console.error('Error creating client:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
} 