import { PrismaClient } from "@prisma/client";
import { analyzeJournal } from "../utils/ollama.js";
import axios from "axios";
const prisma = new PrismaClient();

// Create journal
export const createJournal = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    // Call Ollama AI
    const analysis = await analyzeJournal(content);

    const newEntry = await prisma.journal.create({
      data: {
        content,
        mood: analysis.mood,
        emoji: analysis.emoji,
        feedback: analysis.feedback,
        prompt: analysis.prompt,
        userId,
      },
    });

    res.status(201).json({ msg: "Journal created with AI ✅", entry: newEntry });
  } catch (error) {
    console.error("Create Journal Error:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
// Get all journals
export const getAllJournals = async (req, res) => {
  try {
    const userId = req.user.userId;

    const journals = await prisma.journal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(journals);
  } catch (error) {
    console.error("Get Journals Error:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};


//For Default Prompt
export const getDefaultPrompt = async (req, res) => {
  try {
    const promptResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama2",  // or any model you're using
        prompt: `
You are a friendly journaling assistant.
Give one gentle journaling prompt for someone writing their journal for the first time.
Respond with ONLY the JSON in this format:
{ "prompt": "..." }
        `,
        stream: false,
      }
    );

    const output = promptResponse.data.response;
    const match = output.match(/\{[\s\S]*\}/);
    if (match) {
      const promptJSON = JSON.parse(match[0]);
      return res.status(200).json(promptJSON);
    } else {
      throw new Error("Failed to parse prompt from AI response.");
    }

  } catch (error) {
    console.error("Default Prompt Error:", error.message);
    return res.status(500).json({
      prompt: "How are you feeling right now?",
      msg: "Fallback prompt due to error",
    });
  }
};