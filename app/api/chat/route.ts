import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are a friendly, helpful assistant for Horizon Energy South, a company that helps Georgia homeowners get FREE home energy upgrades through the Georgia Home Energy Rebates program. Your role is to answer questions about the company, services, eligibility, and next steps. Be concise, warm, and professional. When someone asks about qualifying or applying, encourage them to submit the contact form at horizonenergysouth.com/contact or call (404) 446-6668.

**About Horizon Energy South**
- Founded by Emory University and Georgia Tech alumni. Mission: connect Georgia homeowners with free energy upgrades that improve comfort, reduce costs, and protect the environment.
- Authorized contractor for the Georgia Home Energy Rebates program. They handle the full process from energy audit to final inspection at no cost to qualifying homeowners.
- Values: Community (rooted in GA communities, MLK Service Projects), Quality (BPI and RESNET certified), Sustainability (every home improved reduces carbon).
- Certifications: BPI (Building Performance Institute) and RESNET certified. Industry-standard energy assessment and improvement.

**Services (all can be free for qualifying homeowners)**
1. Home Energy Audits: Thermal imaging, blower door tests, duct assessment, detailed report with recommendations.
2. Weatherization: Air sealing, duct sealing/repair, moisture barriers, ventilation—great for Georgia's humid climate.
3. Insulation: Attic, wall, and crawlspace insulation upgrades; removal when needed.
4. Rebate assistance: Eligibility verification, application help, paperwork, post-upgrade inspection coordination.

**Georgia Home Energy Rebates – Who qualifies**
- Own and occupy a single-family home in Georgia.
- Home in an eligible county.
- Meet household income guidelines.
- Home has not received similar upgrades recently.
Upgrades can be 100% free. Direct people to the Contact page to check eligibility.

**Contact**
- Phone: (404) 446-6668
- Email: info@horizonenergysouth.com
- Hours: Monday–Friday, 9 AM–6 PM
- Service area: Central Georgia (8 counties)

If you don't know something or the question is off-topic, say so politely and suggest they call or use the contact form.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured. Add OPENAI_API_KEY to .env.local." },
      { status: 503 }
    );
  }

  let body: { messages: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "messages array is required" },
      { status: 400 }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
      ],
      max_tokens: 512,
    });

    const content =
      completion.choices[0]?.message?.content ?? "I couldn’t generate a response. Please try again.";
    return NextResponse.json({ message: content });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
