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

// GET single client
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDb();
    const { id } = await params;
    const client = await Client.findByPk(id);

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

// PUT update client
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDb();
    const body = await request.json();
    const { name, email, company, phone, status } = body;
    const { id } = await params;

    const client = await Client.findByPk(id);

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    await client.update({
      name: name || client.name,
      email: email || client.email,
      company: company || client.company,
      phone: phone || client.phone,
      status: status || client.status,
    });

    return NextResponse.json(client);
  } catch (error: unknown) {
    console.error('Error updating client:', error);

    if (error && typeof error === 'object' && 'name' in error && error.name === 'SequelizeUniqueConstraintError') {
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

// DELETE client
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDb();
    const { id } = await params;
    const client = await Client.findByPk(id);

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    await client.destroy();

    return NextResponse.json(
      { message: 'Client deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
} 