import { LLM } from "../types/llm";

export const llms: LLM[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    description: "Most capable model, best for complex tasks requiring deep understanding",
    maxTokens: 8192,
    costPer1KTokens: 0.03,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "Fast and efficient, great for most tasks",
    maxTokens: 4096,
    costPer1KTokens: 0.002,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Most capable Claude model, excellent for complex reasoning",
    maxTokens: 200000,
    costPer1KTokens: 0.015,
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    description: "Balanced performance and cost, good for most tasks",
    maxTokens: 200000,
    costPer1KTokens: 0.003,
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Google's latest model, strong performance across tasks",
    maxTokens: 32768,
    costPer1KTokens: 0.0005,
  },
]; 