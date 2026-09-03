import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { experienceSummary, personalData, experiences, projects, skills } from "@/lib/data";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type PortfolioProject = {
  title: { en: string; id: string };
  subtitle: { en: string; id: string };
  description: { en: string; id: string };
  tags: string[];
  organization?: { en: string; id: string };
  contributionHighlights?: { en: string[]; id: string[] };
  githubUrl?: string;
  githubUrls?: { label: string; url: string }[];
  liveUrl?: string;
  role?: { en: string; id: string };
};

type CompletionResponse = {
  choices?: Array<{ message?: { content?: unknown } }>;
};

type ErrorPayload = {
  error?: { message?: unknown };
};

const ninerouterBaseUrl = (process.env.NINEROUTER_BASE_URL || "").replace(/\/+$/, "");
const ninerouterApiKey = process.env.NINEROUTER_API_KEY || "";
const ninerouterModel = process.env.NINEROUTER_MODEL || "cx/gpt-5.2-codex";
const openRouterApiKey = process.env.OPENROUTER_API_KEY || "";
const openRouterModel = process.env.OPENROUTER_MODEL || "openrouter/free";
const geminiApiKey = process.env.GEMINI_API_KEY || "";
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const formattedExperiences = experiences.map((experience) => {
  const company = experience.company;
  return `- ${experience.title.en} at ${company} (${experience.year.en}):
    Description: ${experience.description.en.join(". ")}
    Technologies used: ${experience.tags.join(", ")}`;
}).join("\n");

const formattedProjects = projects.map((project) => {
  const portfolioProject = project as PortfolioProject;
  const sourceLinks = portfolioProject.githubUrls
    ? portfolioProject.githubUrls.map((link) => `${link.label}: ${link.url}`).join(", ")
    : (portfolioProject.githubUrl || "N/A");
  const highlights = portfolioProject.contributionHighlights?.en?.join(" | ") || "N/A";

  return `- ${portfolioProject.title.en} (${portfolioProject.subtitle.en}):
    Organization: ${portfolioProject.organization?.en || "Personal project"}
    Description: ${portfolioProject.description.en}
    Contribution highlights: ${highlights}
    Tech stack: ${portfolioProject.tags.join(", ")}
    Source: ${sourceLinks}
    Live demo: ${portfolioProject.liveUrl || "N/A"}
    My role: ${portfolioProject.role?.en || "Full Stack Developer"}`;
}).join("\n");

const systemInstruction = `
You are a friendly, professional AI assistant representing Aulia El Ihza Fariz Rafiqi (often called Fariz Rafiqi) on his portfolio website.
Your job is to answer visitor questions about Fariz's background, skills, projects, and work experience using only the factual context below.

Factual context:
- Full name: ${personalData.name}
- Job title: ${personalData.title.en} / ${personalData.title.id}
- Bio: Fariz has been building software since 2018. His professional experience includes freelance full-stack delivery and a Fullstack Engineer role at Solusi Teknologi Kreatif (STK) from September 2025 through September 2026. He works across web, mobile, backend, frontend, and AI-enabled products.
- Experience summary: ${experienceSummary.professional.en} professional years; ${experienceSummary.journey.en} years in his software journey. The professional figure is based on freelance and company work; internships are shown in the timeline but are not added to that professional total.
- Location: ${personalData.location}
- Email: ${personalData.email}
- Website: ${personalData.website}
- GitHub: ${personalData.socials.github}
- LinkedIn: ${personalData.socials.linkedin}

Skills:
- Frontend: ${skills.frontend.map((skill) => skill.name).join(", ")}
- Backend: ${skills.backend.map((skill) => skill.name).join(", ")}
- Tools: ${skills.tools.map((skill) => skill.name).join(", ")}
- Interests: ${skills.interests.join(", ")}

Work and education:
${formattedExperiences}

Projects:
${formattedProjects}

Instructions:
1. Be helpful, professional, warm, and concise.
2. Answer in the same language as the user's message, usually English or Indonesian.
3. Emphasize substantive ownership and contribution highlights when describing projects. Do not inflate small fixes into major achievements.
4. Never invent metrics, responsibilities, technologies, employers, or project outcomes that are not in the context.
5. For collaboration or hiring questions, direct visitors to ${personalData.email} or ${personalData.socials.linkedin}.
6. For unrelated questions, politely guide the visitor back to Fariz's work and technical skills.
`;

function normalizeMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 20) return [];

  return value
    .map((message): ChatMessage | null => {
      if (!message || typeof message !== "object") return null;
      const candidate = message as { role?: unknown; content?: unknown };
      const content = typeof candidate.content === "string" ? candidate.content.trim() : "";
      if (!content || content.length > 4000) return null;
      return {
        role: candidate.role === "assistant" ? "assistant" : "user",
        content,
      };
    })
    .filter((message): message is ChatMessage => message !== null);
}

function getCompatibleEndpoint(baseUrl: string) {
  return baseUrl.endsWith("/v1") ? `${baseUrl}/chat/completions` : `${baseUrl}/v1/chat/completions`;
}

function readCompletionContent(data: unknown) {
  const content = (data as CompletionResponse)?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content.map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object" && "text" in part && typeof part.text === "string") return part.text;
      return "";
    }).join("").trim();
  }
  return "";
}

async function requestCompatibleChat(baseUrl: string, apiKey: string, model: string, messages: ChatMessage[]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch(getCompatibleEndpoint(baseUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: systemInstruction }, ...messages],
        temperature: 0.35,
        max_tokens: 700,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as ErrorPayload;
      const message = typeof errorData.error?.message === "string" ? errorData.error.message : `${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    const content = readCompletionContent(await response.json());
    if (!content) throw new Error("The provider returned an empty response");
    return content;
  } finally {
    clearTimeout(timeout);
  }
}

async function requestGemini(messages: ChatMessage[]) {
  if (!geminiApiKey) throw new Error("Gemini fallback is not configured");

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const history = messages.slice(0, -1).map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
  const model = genAI.getGenerativeModel({ model: geminiModel, systemInstruction });
  const chat = model.startChat({ history });
  return (await chat.sendMessage(messages[messages.length - 1].content)).response.text();
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { messages?: unknown };
    const messages = normalizeMessages(body?.messages);
    if (messages.length === 0) {
      return NextResponse.json({ error: "A non-empty messages array is required." }, { status: 400 });
    }

    const errors: string[] = [];

    if (ninerouterBaseUrl) {
      try {
        const content = await requestCompatibleChat(ninerouterBaseUrl, ninerouterApiKey, ninerouterModel, messages);
        return NextResponse.json({ role: "assistant", content, provider: "ninerouter" });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "request failed";
        errors.push(`9Router: ${message}`);
        console.error("9Router chat error:", error);
      }
    }

    if (openRouterApiKey) {
      try {
        const content = await requestCompatibleChat("https://openrouter.ai/api", openRouterApiKey, openRouterModel, messages);
        return NextResponse.json({ role: "assistant", content, provider: "openrouter" });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "request failed";
        errors.push(`OpenRouter: ${message}`);
        console.error("OpenRouter chat error:", error);
      }
    }

    if (geminiApiKey) {
      try {
        const content = await requestGemini(messages);
        return NextResponse.json({ role: "assistant", content, provider: "gemini" });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "request failed";
        errors.push(`Gemini: ${message}`);
        console.error("Gemini chat error:", error);
      }
    }

    return NextResponse.json(
      {
        error: "No chat provider is available. Configure 9Router, OpenRouter, or Gemini on the server.",
        details: process.env.NODE_ENV === "development" ? errors : undefined,
      },
      { status: 503 },
    );
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Unable to process the chat request." }, { status: 500 });
  }
}
