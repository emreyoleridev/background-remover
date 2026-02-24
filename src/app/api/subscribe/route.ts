import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, source, toolName, timestamp } = await req.json();

        const endpoint = process.env.GOOGLE_SHEETS_ENDPOINT;

        if (!endpoint) {
            console.error("GOOGLE_SHEETS_ENDPOINT is not configured");
            return NextResponse.json(
                { error: "Subscription endpoint not configured" },
                { status: 500 }
            );
        }

        const payload = {
            email,
            source,
            toolName,
            timestamp,
        };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Google Sheets responded with ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json(
            { error: "Failed to process subscription" },
            { status: 500 }
        );
    }
}
