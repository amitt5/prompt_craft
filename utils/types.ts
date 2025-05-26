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

export interface PromptComponent {
    id?: number;
    component_type: PromptComponentType;
    name?: string;
    description?: string;
    user_id?: string | null; // null for default/system-defined components
    tags?: string[];
    usageCount?: number;
    created_at: string; // ISO timestamp
    is_default: boolean;
}

export type PromptStatus = 'Draft' | 'Submitted' | 'Approved'; 

export type PromptComponentType = 
'Context' | 
'Role' | 
'Task Instruction' | 
'Guidelines' | 
'Guardrails' | 
'Output Format' | 
'Output Example' | 
'Self Check';