"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, Search, Filter, MoreHorizontal, Copy, Pencil, Trash, Eye } from "lucide-react"

export default function ComponentsPage() {
  // Mock data for components
  const componentsData1 = [
    {
      id: 1,
      content: "Use a friendly, helpful tone",
      type: "Guideline",
      tags: ["Tone", "Support"],
      usageCount: 24,
    },
    {
      id: 2,
      content: "Keep responses concise but thorough",
      type: "Guideline",
      tags: ["Length", "Clarity"],
      usageCount: 18,
    },
    {
      id: 3,
      content: "Never make up information about product features",
      type: "Guardrail",
      tags: ["Accuracy", "Product"],
      usageCount: 32,
    },
    {
      id: 4,
      content: "Don't provide specific pricing information unless explicitly included in the prompt",
      type: "Guardrail",
      tags: ["Pricing", "Confidentiality"],
      usageCount: 15,
    },
    {
      id: 5,
      content:
        "Structured FAQ response with a clear question heading, concise answer, and any relevant follow-up information or links.",
      type: "Output Format",
      tags: ["FAQ", "Structure"],
      usageCount: 27,
    },
    {
      id: 6,
      content: "Customer support representatives who need to quickly generate accurate FAQ responses.",
      type: "Audience",
      tags: ["Support", "Internal"],
      usageCount: 12,
    },
    {
      id: 7,
      content: "Generate comprehensive FAQ answers for common customer support questions related to our product.",
      type: "Task Instruction",
      tags: ["FAQ", "Support"],
      usageCount: 19,
    },
  ]

  const componentsData = [
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
  

  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")

  // Filter components based on search query and filters
  const filteredComponents = componentsData.filter((component) => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || component.component_type === typeFilter
    const matchesTag = tagFilter === "all" || component.tags.includes(tagFilter)
    return matchesSearch && matchesType && matchesTag
  })

  // Get unique types and tags for filter dropdowns
  const uniqueTypes = Array.from(new Set(componentsData.map((component) => component.component_type)))
  const uniqueTags = Array.from(new Set(componentsData.flatMap((component) => component.tags)))

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Components Library</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Component
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {uniqueTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComponents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No components found. Try adjusting your filters or create a new component.
                </TableCell>
              </TableRow>
            ) : (
              filteredComponents.map((component) => (
                <TableRow key={component.id}>
                  <TableCell className="font-medium">
                    <div className="truncate max-w-md">{component.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{component.component_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {component.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{component.usageCount} prompts</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
