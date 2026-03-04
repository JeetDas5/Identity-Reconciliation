import { NextRequest, NextResponse } from "next/server";
import { identifyContact } from "@/services/contact.service";
import { identifySchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const parsed = identifySchema.safeParse(body);

    if (!parsed.success) {
      console.log("Failed to parse request body. ", parsed.error);
      return NextResponse.json(
        {
          error: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const { email, phoneNumber } = parsed.data;

    const result = await identifyContact({
      email: email ?? undefined,
      phoneNumber: phoneNumber ?? undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Identify API Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
