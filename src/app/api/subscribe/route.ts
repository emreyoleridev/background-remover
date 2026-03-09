import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, source, toolName } = await req.json();

        // Use Beehiiv V2 API
        // https://developers.beehiiv.com/api-reference/subscriptions/create
        const apiKey = process.env.BEEHIIV_API_KEY;
        const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

        if (!apiKey || !publicationId) {
            console.error("Beehiiv configuration is missing (BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID)");
            return NextResponse.json(
                { error: "Subscription service not configured" },
                { status: 500 }
            );
        }

        const beehiivUrl = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;

        const payload = {
            email,
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: "image-background-remover",
            utm_medium: "referral",
            utm_campaign: toolName || "newsletter-signup",
            referring_site: source || "https://background-remover.tools.emreyoleri.dev"
        };

        const response = await fetch(beehiivUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Beehiiv response error:", errorData);
            throw new Error(`Beehiiv responded with ${response.status}`);
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
