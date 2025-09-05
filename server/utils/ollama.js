import axios from "axios";

export const analyzeJournal = async (text) => {
  const prompt = `
You are a supportive mental wellness AI.

Based on the following journal entry, return only valid JSON with 4 fields:
1. "mood" - user's emotion (e.g., happy, sad, angry, anxious, grateful, etc.)
2. "emoji" - emoji that matches the mood (like 😊, 😢, 😡, 😰, 🙏)
3. "feedback" - a gentle motivational one-liner tailored to the user's emotion
4. "prompt" - a new reflective journaling question

Journal Entry:
"""${text}"""

Respond ONLY with JSON like this (Remember this is an example...not your response):
{
  "mood": "angry",
  "emoji": "😡",
  "feedback": "It's okay to feel angry. What matters is how you deal with it.",
  "prompt": "What triggered your frustration today, and how did you respond?"
}
`;

  try {
    console.log("Ollama prompt:", prompt); // Log the prompt being sent
    
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral", // or 'mistral'
        prompt: prompt,
        stream: false,
      }
    );

    const output = response.data.response;
    console.log("Ollama raw output:", output);

    // Try to extract JSON from response
    const match = output.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (parseError) {
        console.warn("Failed to parse JSON. Logging raw output:");
        console.warn(match[0]);
      }
    }

    // fallback if match or parse fails
    throw new Error("Invalid AI response format");

  } catch (error) {
    console.error("Ollama error:", error.message);
    return {
      mood: "unknown",
      emoji: "❓",
      feedback: "We couldn't analyze your journal.",
      prompt: "Write freely about how you're feeling today.",
    };
  }
};