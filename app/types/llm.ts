export interface LLM {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  costPer1KTokens: number;
}

export type LLMId = string; 