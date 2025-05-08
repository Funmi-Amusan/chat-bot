import { registerUserURL } from "@/utils/end-point";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    const response = await fetch(registerUserURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Registration failed' }, 
        { status: response.status }
      );
    }
    
    return NextResponse.json(
      { message: data.message || 'Registration successful' }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: 'An error occurred during registration' }, 
      { status: 500 }
    );
  }
}