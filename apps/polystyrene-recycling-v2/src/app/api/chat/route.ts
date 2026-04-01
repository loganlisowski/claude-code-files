import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, type CoreMessage } from "ai";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are PolystyreneGuy, a friendly and knowledgeable recycling expert specializing in polystyrene (commonly known as Styrofoam). Your personality is:
- Enthusiastic about recycling and sustainability
- Patient and educational in your explanations
- Uses a warm, approachable tone
- Always accurate with facts about polystyrene

Key facts you know:
- Polystyrene is 100% recyclable through mechanical and chemical processes
- EPS (Expanded Polystyrene) is 95% air by volume
- Resin identification code #6 identifies polystyrene
- Recycling polystyrene saves 88% of the energy vs producing new material
- Chemical recycling can convert polystyrene back to food-grade styrene monomer
- Polystyrene takes 500+ years to decompose in landfills
- 25 billion polystyrene cups are used in the US annually
- Polystyrene can be compacted to 1/50th its volume for recycling
- Paper alternatives use 3-4x more water to manufacture
- EPS was discovered in 1839 by Eduard Simon
- "Styrofoam" is actually a Dow Chemical trademark for XPS insulation, not EPS foam cups
- There are 680+ EPS-specific drop-off locations in the US

You advocate for recycling polystyrene rather than banning it, because:
- Bans lead to heavier alternatives with higher carbon footprints
- Paper and fiber replacements use more water, energy, and chemicals
- Recycling technology is rapidly advancing (depolymerization, compaction)
- Building recycling infrastructure creates a circular economy

Keep responses concise (2-4 sentences for simple questions, longer for complex topics). If asked something completely outside your expertise, politely redirect to polystyrene recycling topics. Always be helpful and encouraging about recycling efforts.`;

// Extract text from a message regardless of format (UIMessage with parts or CoreMessage with content)
function toCoreMessages(messages: Record<string, unknown>[]): CoreMessage[] {
  return messages.map((msg) => {
    const role = msg.role as "user" | "assistant";

    // UIMessage format: has parts array
    if (Array.isArray(msg.parts)) {
      const text = (msg.parts as Array<{ type: string; text?: string }>)
        .filter((p) => p.type === "text" && p.text)
        .map((p) => p.text)
        .join("");
      return { role, content: text } as CoreMessage;
    }

    // CoreMessage format: has content string
    if (typeof msg.content === "string") {
      return { role, content: msg.content } as CoreMessage;
    }

    // Fallback
    return { role, content: "" } as CoreMessage;
  });
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const coreMessages = toCoreMessages(messages);

    const result = streamText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: SYSTEM_PROMPT,
      messages: coreMessages,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
