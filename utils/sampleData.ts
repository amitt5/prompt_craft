import { Prompt, Llm, PromptComponent } from '@/utils/types';

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

export  const componentsData: PromptComponent[] = [
  // CONTEXT
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410404",
    "name": "Internal Policy Document",
    "description": "Generating or editing content for internal banking policy updates.",
    "component_type": "Context",
    "tags": ["policy", "internal"],
    "usageCount": 12
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410405",
    "name": "Retail Customer Communication",
    "description": "Crafting clear and compliant content for retail customer outreach.",
    "component_type": "Context",
    "tags": ["retail", "customer"],
    "usageCount": 18
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410406",
    "name": "Corporate Banking Overview",
    "description": "Explaining services and insights for large enterprise clients.",
    "component_type": "Context",
    "tags": ["corporate", "b2b"],
    "usageCount": 6
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410407",
    "name": "Marketing Campaign Brief",
    "description": "Setting the context for generating promotional materials.",
    "component_type": "Context",
    "tags": ["marketing", "campaign"],
    "usageCount": 9
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410408",
    "name": "Sustainability Report Summary",
    "description": "Used when summarizing bank ESG initiatives for reports.",
    "component_type": "Context",
    "tags": ["sustainability", "report"],
    "usageCount": 7
  },

  // ROLE
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410409",
    "name": "Sustainability Officer",
    "description": "Expert in ESG policy and banking compliance.",
    "component_type": "Role",
    "tags": ["ESG", "expert"],
    "usageCount": 22
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410410",
    "name": "Retail Banking Advisor",
    "description": "Communicates new features and offers to retail customers.",
    "component_type": "Role",
    "tags": ["advisor", "retail"],
    "usageCount": 16
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410411",
    "name": "Compliance Manager",
    "description": "Reviews communications for regulatory alignment.",
    "component_type": "Role",
    "tags": ["legal", "compliance"],
    "usageCount": 14
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410412",
    "name": "Copywriter",
    "description": "Specialist in bank’s tone and copy style.",
    "component_type": "Role",
    "tags": ["creative", "tone"],
    "usageCount": 11
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410413",
    "name": "Digital Product Owner",
    "description": "Explains banking features to technical and non-technical audiences.",
    "component_type": "Role",
    "tags": ["digital", "product"],
    "usageCount": 8
  },

  // GUIDELINES
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410414",
    "name": "Clear and Compliant",
    "description": "Maintain clarity while following regulatory language.",
    "component_type": "Guidelines",
    "tags": ["clarity", "compliance"],
    "usageCount": 21
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410415",
    "name": "Customer-first tone",
    "description": "Keep language simple, warm, and focused on benefits.",
    "component_type": "Guidelines",
    "tags": ["customer", "friendly"],
    "usageCount": 19
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410416",
    "name": "Avoid Technical Jargon",
    "description": "Keep terms easy to understand unless targeting experts.",
    "component_type": "Guidelines",
    "tags": ["simple", "accessibility"],
    "usageCount": 10
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410417",
    "name": "Consistent Branding",
    "description": "Align with the tone, structure, and vocabulary of ABN AMRO style guide.",
    "component_type": "Guidelines",
    "tags": ["brand", "consistency"],
    "usageCount": 13
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410418",
    "name": "Respect Cultural Nuances",
    "description": "Avoid language that might be misinterpreted across markets.",
    "component_type": "Guidelines",
    "tags": ["international", "inclusive"],
    "usageCount": 6
  },

  // GUARDRAILS
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410419",
    "name": "No Personal Financial Advice",
    "description": "Avoid providing advice that could be interpreted as personalized recommendations.",
    "component_type": "Guardrails",
    "tags": ["legal", "risk"],
    "usageCount": 25
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410420",
    "name": "Verify All Figures",
    "description": "All numbers must be cited from official sources or databases.",
    "component_type": "Guardrails",
    "tags": ["data", "accuracy"],
    "usageCount": 17
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410421",
    "name": "Exclude Internal Terms",
    "description": "Don’t include internal system names or team references.",
    "component_type": "Guardrails",
    "tags": ["confidentiality"],
    "usageCount": 13
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410422",
    "name": "No Sensitive Data",
    "description": "Avoid names, account numbers, or personal identifiers.",
    "component_type": "Guardrails",
    "tags": ["privacy", "security"],
    "usageCount": 11
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410423",
    "name": "Neutral on Investments",
    "description": "Do not promote or discourage any financial product.",
    "component_type": "Guardrails",
    "tags": ["investment", "neutrality"],
    "usageCount": 10
  },

  // OUTPUT FORMAT
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410424",
    "name": "Customer Email Format",
    "description": "Professional, friendly email format for customers.",
    "component_type": "Output Format",
    "tags": ["email", "formal"],
    "usageCount": 11
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410425",
    "name": "Short Push Notification",
    "description": "Max 120 characters, used for app alerts.",
    "component_type": "Output Format",
    "tags": ["app", "alert"],
    "usageCount": 8
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410426",
    "name": "Internal Report Paragraph",
    "description": "Formal paragraph suitable for internal documentation.",
    "component_type": "Output Format",
    "tags": ["report", "internal"],
    "usageCount": 14
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410427",
    "name": "Bullet Point Summary",
    "description": "Three to five concise bullet points highlighting key takeaways.",
    "component_type": "Output Format",
    "tags": ["summary", "bullets"],
    "usageCount": 9
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410428",
    "name": "Table with Columns",
    "description": "Structured table with labeled columns for features or comparisons.",
    "component_type": "Output Format",
    "tags": ["table", "data"],
    "usageCount": 7
  },

  // SELF CHECK
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410429",
    "name": "Clarity Check",
    "description": "Is the content easy for a retail customer to understand?",
    "component_type": "Self Check",
    "tags": ["clarity", "retail"],
    "usageCount": 10
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410430",
    "name": "Tone Consistency",
    "description": "Does this reflect our tone: professional, accessible, helpful?",
    "component_type": "Self Check",
    "tags": ["tone", "brand"],
    "usageCount": 14
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410431",
    "name": "Factual Accuracy",
    "description": "Are all the facts and numbers verified?",
    "component_type": "Self Check",
    "tags": ["facts", "validation"],
    "usageCount": 11
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410432",
    "name": "Legal Risk Review",
    "description": "Could any part of this create a legal or compliance issue?",
    "component_type": "Self Check",
    "tags": ["compliance", "legal"],
    "usageCount": 8
  },
  {
    "id": "a3b7158a-3e60-4a52-8ff6-693789410433",
    "name": "Bias Review",
    "description": "Does the text unintentionally favor or exclude certain groups?",
    "component_type": "Self Check",
    "tags": ["bias", "neutral"],
    "usageCount": 6
  }
]