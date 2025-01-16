import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('jwtToken')?.value;

    if (token) {
      return NextResponse.json({ message: 'Token found' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'No token found' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
