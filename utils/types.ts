export interface Prompt {
    id: number;
    title: string;
    status: 'Draft' | 'Submitted' | 'Approved';
    tags: string[];
    updatedAt: string;
  }
  
export type PromptStatus = 'Draft' | 'Submitted' | 'Approved'; 