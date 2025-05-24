import { Prompt, Llm } from '@/utils/types';

export const promptsData: Prompt[] = [
  {
    id: 1,
    title: "Customer Support FAQ Generator",
    status: "Draft",
    tags: ["Support", "FAQ"],
    updatedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Product Description Writer",
    status: "Submitted",
    tags: ["Marketing", "Product"],
    updatedAt: "1 day ago",
  },
  {
    id: 3,
    title: "Social Media Post Creator",
    status: "Approved",
    tags: ["Social", "Marketing"],
    updatedAt: "3 days ago",
  },
  {
    id: 4,
    title: "Email Subject Line Generator",
    status: "Draft",
    tags: ["Email", "Marketing"],
    updatedAt: "5 days ago",
  },
  {
    id: 5,
    title: "Blog Post Outline Creator",
    status: "Approved",
    tags: ["Content", "Blog"],
    updatedAt: "1 week ago",
  },
  {
    id: 6,
    title: "SEO Meta Description Generator",
    status: "Submitted",
    tags: ["SEO", "Marketing"],
    updatedAt: "1 week ago",
  },
  {
    id: 7,
    title: "Customer Testimonial Formatter",
    status: "Approved",
    tags: ["Marketing", "Testimonial"],
    updatedAt: "2 weeks ago",
  },
]; 

export const llms: Llm[] = [
  { id: 101, name: "GPT-4 Turbo" },
  { id: 102, name: "Claude 3 Opus" },
  { id: 103, name: "Claude 3 Sonnet" },
  { id: 104, name: "Gemini 1.5 Pro" },
  { id: 105, name: "Mistral Large" },
  { id: 106, name: "Mixtral 8x7B" },
  { id: 107, name: "Command R+" },
  { id: 108, name: "LLaMA 3 70B" },
  { id: 109, name: "Yi-34B" },
  { id: 110, name: "Zephyr" }
];