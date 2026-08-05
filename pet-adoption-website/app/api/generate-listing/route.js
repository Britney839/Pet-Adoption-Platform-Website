import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { petListingSchema } from "@/lib/schemas";

export async function POST(req) {
  const { name, species, breed, age, intakeNotes } = await req.json();

  const result = await generateObject({
    model: groq("openai/gpt-oss-20b"),
    schema: petListingSchema,
    prompt: `You are writing an adoption listing for a pet shelter website.

Pet details:
- Name: ${name}
- Species/Breed: ${species} / ${breed}
- Age: ${age}
- Staff notes on temperament and history: ${intakeNotes}

Write a warm, honest, adoption-ad-style listing based on this information. Do not invent medical or behavioral facts that contradict the staff notes.`,
  });

  return Response.json(result.object);
}