export interface Prompt {
    id?: number;
    title?: string;
    status?: 'Draft' | 'Submitted' | 'Approved';
    tags?: string[];
    context?: string;
    role?: Role;
    instructions?: string;
    guidelines?: string[];
    guardrails?: string[];
    outputFormat?: string;
    outputExample?: string;
    selfCheck?: string[];
    createdBy?: string;
    updatedBy?: string;
    updatedAt?: string;
    createdAt?: string;
}

export interface Role {
  id?: number;
  name?: string;
  description?: string;
}

export interface Llm {
    id?: number;
    name?: string;
    description?: string;
}

export type PromptStatus = 'Draft' | 'Submitted' | 'Approved'; 