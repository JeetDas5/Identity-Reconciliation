import db from "@/db";
import { NextResponse } from "next/server";
import { contacts } from "@/db/schema";

export async function GET() {
  try {
    await db.select().from(contacts).limit(1);

    const healthStatus = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      uptime: process.uptime(),
    };

    return NextResponse.json(healthStatus, { status: 200 });
  } catch (error) {
    console.error("Health check error:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: "Database connection failed",
      },
      { status: 503 },
    );
  }
}
