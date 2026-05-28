import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { personalData, experiences, projects, skills } from "@/lib/data";

const openRouterApiKey = process.env.OPENROUTER_API_KEY || "";
const openRouterModel = process.env.OPENROUTER_MODEL || "openrouter/free";
const geminiApiKey = process.env.GEMINI_API_KEY || "";

// Helper to format experiences for the system instructions
const formattedExperiences = experiences.map((exp: any) => {
  return `- ${exp.title.en} at ${typeof exp.company === 'string' ? exp.company : exp.company.en} (${exp.year.en}):
    Description: ${exp.description.en.join(". ")}
    Technologies used: ${exp.tags.join(", ")}`;
}).join("\n");

// Helper to format projects for the system instructions
const formattedProjects = projects.map((p: any) => {
  const gitUrlStr = p.githubUrls 
    ? p.githubUrls.map((u: any) => `${u.label}: ${u.url}`).join(", ")
    : (p.githubUrl || "N/A");
  
  return `- ${p.title.en} (${p.subtitle.en}):
    Description: ${p.description.en}
    Tech Stack: ${p.tags.join(", ")}
    GitHub: ${gitUrlStr}
    ${p.oldRepoUrl ? `Old GitHub Repo: ${p.oldRepoUrl}` : ""}
    Live Demo: ${p.liveUrl || "N/A"}
    My Role: ${p.role?.en || "Full Stack Developer"}
    Team/Collaborators: ${p.contributors ? `Team of ${p.contributors} ${p.isLead ? "(Lead)" : ""}` : "Solo Project"}`;
}).join("\n");

const systemInstruction = `
You are a friendly, professional AI Assistant representing Aulia El Ihza Fariz Rafiqi (often called Fariz Rafiqi) on his portfolio website.
Your goal is to answer visitor questions about Fariz's background, skills, projects, and work experience.

Here is the factual context about Fariz Rafiqi:
- **Full Name**: ${personalData.name}
- **Job Title**: ${personalData.title.en} / ${personalData.title.id}
- **Bio**: Fariz is a fresh graduate informatics student with experience in software engineering since 2018. Currently working as a Fullstack Engineer at Solusi Teknologi Kreatif. He is highly passionate about Web Development, Mobile Development, and AI & Machine Learning.
- **Location**: ${personalData.location}
- **Email**: ${personalData.email}
- **Website**: ${personalData.website}
- **GitHub**: ${personalData.socials.github}
- **LinkedIn**: ${personalData.socials.linkedin}

**Skills**:
- Frontend: ${skills.frontend.map(s => s.name).join(", ")}
- Backend: ${skills.backend.map(s => s.name).join(", ")}
- Tools: ${skills.tools.map(s => s.name).join(", ")}
- Interests/Exploring: ${skills.interests.join(", ")}

**Work & Education Experience**:
${formattedExperiences}

**Projects**:
${formattedProjects}

**Instructions**:
1. Be helpful, professional, and warm.
2. Answer in the same language as the user's message (mostly English or Indonesian).
3. Keep your answers concise, clear, and focused. Avoid overly long replies.
4. If a visitor asks about collaborating or hiring Fariz, encourage them to reach out via email at ${personalData.email} or connect on LinkedIn at ${personalData.socials.linkedin}.
5. If the query is completely unrelated to Fariz, his work, or computer science/engineering, politely guide the topic back to his portfolio (e.g., "I'm here to help you learn more about Fariz's work and technical skills. Do you have any questions about his projects?").
6. Do not make up facts. Only state what is mentioned above.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request body: 'messages' array is required." },
        { status: 400 }
      );
    }

    // 1. OpenRouter (Primary if OPENROUTER_API_KEY is configured)
    if (openRouterApiKey) {
      try {
        const formattedHistory = messages.slice(0, -1).map((msg: any) => {
          return {
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.content,
          };
        });

        const latestMessage = messages[messages.length - 1]?.content || "";

        const apiMessages = [
          { role: "system", content: systemInstruction },
          ...formattedHistory,
          { role: "user", content: latestMessage }
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openRouterApiKey}`,
            "HTTP-Referer": "https://farizrafiqi.dev",
            "X-Title": "Fariz Rafiqi Portfolio",
          },
          body: JSON.stringify({
            model: openRouterModel,
            messages: apiMessages,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData?.error?.message || `OpenRouter responded with status ${response.status}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || "";

        return NextResponse.json({ role: "assistant", content: text });
      } catch (error: any) {
        console.error("OpenRouter API Error:", error);
        if (!geminiApiKey) {
          return NextResponse.json(
            { error: error?.message || "OpenRouter error and no Gemini fallback key configured" },
            { status: 500 }
          );
        }
        console.log("Attempting fallback to Gemini API...");
      }
    }

    // 2. Direct Google Gemini API (Fallback or Primary if OpenRouter key is not set)
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "No API key configured (neither OPENROUTER_API_KEY nor GEMINI_API_KEY found)" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    // Format chat history for Gemini SDK
    const formattedHistory = messages.slice(0, -1).map((msg: any) => {
      const role = msg.role === "assistant" ? "model" : "user";
      return {
        role,
        parts: [{ text: msg.content }],
      };
    });

    const latestMessage = messages[messages.length - 1]?.content || "";

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(latestMessage);
    const text = result.response.text();

    return NextResponse.json({ role: "assistant", content: text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
