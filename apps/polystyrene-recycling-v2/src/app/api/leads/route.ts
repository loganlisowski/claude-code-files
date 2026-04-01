import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Validation Schema ───
const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10),
  inquiryType: z.enum([
    "General Inquiry",
    "Recycling Consultation",
    "Partnership Opportunity",
    "Educational Resources",
    "Speaking Engagement",
  ]),
});

// ─── In-Memory Rate Limiting ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

// Clean up stale entries periodically
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    const entries = Array.from(rateLimitMap.entries());
    for (const [ip, entry] of entries) {
      if (now > entry.resetAt) {
        rateLimitMap.delete(ip);
      }
    }
  }, 10 * 60 * 1000); // every 10 minutes
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: result.error.issues.map((i) => ({
            field: i.path[0],
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const lead = result.data;

    // ─── Supabase Storage (if configured) ───
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase.from("leads").insert({
          name: lead.name,
          email: lead.email,
          company: lead.company || null,
          phone: lead.phone || null,
          message: lead.message,
          inquiry_type: lead.inquiryType,
          created_at: new Date().toISOString(),
        });
        if (error) {
          console.error("[Leads] Supabase insert error:", error);
        }
      } catch (err) {
        console.error("[Leads] Supabase connection error:", err);
      }
    }

    // ─── Resend Email Notification (if configured) ───
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (resendApiKey && notificationEmail) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { Resend } = await (import("resend" as string) as Promise<any>);
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "PolyRecycle <noreply@polyrecycle.com>",
          to: notificationEmail,
          subject: `New Lead: ${lead.inquiryType} from ${lead.name}`,
          html: `
            <h2>New Lead Submission</h2>
            <p><strong>Name:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Company:</strong> ${lead.company || "N/A"}</p>
            <p><strong>Phone:</strong> ${lead.phone || "N/A"}</p>
            <p><strong>Inquiry Type:</strong> ${lead.inquiryType}</p>
            <p><strong>Message:</strong></p>
            <p>${lead.message}</p>
          `,
        });
      } catch (err) {
        console.error("[Leads] Resend email error:", err);
      }
    }

    // ─── Demo Mode Fallback ───
    if (!supabaseUrl && !resendApiKey) {
      console.log("[Leads] Demo mode  -  lead captured:");
      console.log(JSON.stringify(lead, null, 2));
    }

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Leads] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
