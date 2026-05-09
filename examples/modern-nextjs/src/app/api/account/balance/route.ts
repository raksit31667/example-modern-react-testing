import { NextResponse } from 'next/server'

export async function GET() {
  // Mock data - in a real app, this would fetch from a database
  const balance = {
    balance: 15000.50,
    currency: 'USD',
    availableBalance: 14500.50,
  }

  return NextResponse.json(balance)
}
