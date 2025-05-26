"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, X, Save, Send, Sparkles, BookTemplate, Loader2, Copy, Check, Clock, MessageSquare, Pencil, ChevronDown, ChevronUp, Search } from "lucide-react"
import { llms } from "@/app/data/llms"
import { LLM, LLMId } from "@/app/types/llm"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NewPromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)  // ✅ unwrap the promise

  const prompt = {
    id: 1,
    // id: id,
    title: "Customer Support FAQ Generator",
    status: "Submitted",
    tags: ["Support", "FAQ"],
    createdBy: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    updatedAt: "2 hours ago",
    components: [
      {
        type: "Audience",
        content: "Customer support representatives who need to quickly generate accurate FAQ responses.",
      },
      {
        type: "Task Instruction",
        content: "Generate comprehensive FAQ answers for common customer support questions related to our product.",
      },
      {
        type: "Guidelines",
        content: [
          "Use a friendly, helpful tone",
          "Keep responses concise but thorough",
          "Include relevant links to documentation when appropriate",
          "Avoid technical jargon unless necessary",
          "Format responses with clear headings and bullet points when needed",
        ],
      },
      {
        type: "Guardrails",
        content: [
          "Never make up information about product features",
          "Don't provide specific pricing information unless explicitly included in the prompt",
          "Avoid making promises about future features",
          "Don't provide legal advice",
        ],
      },
      {
        type: "Output Format",
        content:
          "Structured FAQ response with a clear question heading, concise answer, and any relevant follow-up information or links.",
      },
      {
        type: "Example",
        content: `Q: How do I reset my password?

A: To reset your password, please follow these steps:

1. Click on the "Forgot Password" link on the login page
2. Enter the email address associated with your account
3. Check your email for a password reset link
4. Click the link and follow the instructions to create a new password

If you don't receive the email within a few minutes, please check your spam folder or contact support at support@example.com.`,
      },
    ],
    reviews: [
      {
        id: 1,
        reviewer: {
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        status: "Requested Changes",
        comment:
          "The guidelines need to be more specific about tone. Also, please add more examples for different types of questions.",
        createdAt: "1 day ago",
      },
    ],
  }
  
  const [tags, setTags] = useState<string[]>(id === "new" ? [] : prompt.tags)
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [guidelines, setGuidelines] = useState<string[]>([
    "Use a friendly, helpful tone",
    "Keep responses concise but thorough",
  ])
  const [guidelineInput, setGuidelineInput] = useState("")
  const [guardrails, setGuardrails] = useState<string[]>(["Never make up information about product features"])
  const [guardrailInput, setGuardrailInput] = useState("")
  const [activeTab, setActiveTab] = useState("components")
  const [selectedLLMs, setSelectedLLMs] = useState<LLMId[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [llmResponses, setLlmResponses] = useState<Record<LLMId, string>>({})
  const [finalResponse, setFinalResponse] = useState("")
  const [copiedLLM, setCopiedLLM] = useState<LLMId | null>(null)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [promptTitle, setPromptTitle] = useState(id === "new" ? "Prompt Name" : prompt.title)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    context: true,
    role: false,
    taskInstruction: false,
    guidelines: false,
    guardrails: false,
    outputFormat: false,
    example: false,
    selfCheck: false
  })

  // Add state for role search
  const [roleSearchQuery, setRoleSearchQuery] = useState("")
  const [roleInput, setRoleInput] = useState("")
  const [guidelineSearchQuery, setGuidelineSearchQuery] = useState("")
  const [guardrailSearchQuery, setGuardrailSearchQuery] = useState("")
  const [contextSearchQuery, setContextSearchQuery] = useState("")
  const [outputFormatSearchQuery, setOutputFormatSearchQuery] = useState("")
  const [selfCheckSearchQuery, setSelfCheckSearchQuery] = useState("")

  // Add state for context and output format
  const [selectedContext, setSelectedContext] = useState("")
  const [selectedOutputFormat, setSelectedOutputFormat] = useState("")
  const [selfChecks, setSelfChecks] = useState<string[]>([])
  const [selfCheckInput, setSelfCheckInput] = useState("")

  // Add mock data for roles
  const existingRoles = [
    {
      id: 1,
      name: "Customer Support Agent",
      description: "A friendly and helpful support representative who provides clear, concise solutions to customer inquiries."
    },
    {
      id: 2,
      name: "Technical Expert",
      description: "A knowledgeable technical specialist who provides detailed, accurate technical guidance and solutions."
    },
    {
      id: 3,
      name: "Product Specialist",
      description: "An expert in product features and capabilities who helps users maximize the value of the product."
    },
    {
      id: 4,
      name: "Sales Representative",
      description: "A persuasive communicator who helps customers understand product benefits and make informed decisions."
    }
  ]

  // Add mock data for guidelines
  const existingGuidelines = [
    {
      id: 1,
      text: "Use a friendly, helpful tone",
      category: "Tone"
    },
    {
      id: 2,
      text: "Keep responses concise but thorough",
      category: "Style"
    },
    {
      id: 3,
      text: "Include relevant links to documentation when appropriate",
      category: "Content"
    },
    {
      id: 4,
      text: "Avoid technical jargon unless necessary",
      category: "Style"
    },
    {
      id: 5,
      text: "Format responses with clear headings and bullet points when needed",
      category: "Format"
    },
    {
      id: 6,
      text: "Always acknowledge the user's question before answering",
      category: "Tone"
    },
    {
      id: 7,
      text: "Provide step-by-step instructions for complex processes",
      category: "Format"
    }
  ]

  // Add mock data for guardrails
  const existingGuardrails = [
    {
      id: 1,
      text: "Never make up information about product features",
      category: "Accuracy"
    },
    {
      id: 2,
      text: "Don't provide specific pricing information unless explicitly included in the prompt",
      category: "Privacy"
    },
    {
      id: 3,
      text: "Avoid making promises about future features",
      category: "Accuracy"
    },
    {
      id: 4,
      text: "Don't provide legal advice",
      category: "Legal"
    },
    {
      id: 5,
      text: "Never share internal company information",
      category: "Privacy"
    },
    {
      id: 6,
      text: "Don't provide medical advice",
      category: "Legal"
    },
    {
      id: 7,
      text: "Avoid discussing competitor products",
      category: "Business"
    }
  ]

  // Add mock data for existing contexts
  const existingContexts = [
    {
      id: 1,
      text: "Customer support representatives who need to quickly generate accurate FAQ responses",
      category: "Support"
    },
    {
      id: 2,
      text: "Technical writers creating product documentation",
      category: "Documentation"
    },
    {
      id: 3,
      text: "Sales team members preparing product presentations",
      category: "Sales"
    },
    {
      id: 4,
      text: "Marketing team creating social media content",
      category: "Marketing"
    }
  ]

  // Add mock data for output formats
  const existingOutputFormats = [
    {
      id: 1,
      text: "Structured FAQ response with a clear question heading, concise answer, and any relevant follow-up information or links",
      category: "FAQ"
    },
    {
      id: 2,
      text: "Step-by-step guide with numbered instructions and optional tips",
      category: "Guide"
    },
    {
      id: 3,
      text: "Bullet-point list with main points and sub-points",
      category: "List"
    },
    {
      id: 4,
      text: "Detailed explanation with sections and subsections",
      category: "Documentation"
    }
  ]

  // Add mock data for self checks
  const existingSelfChecks = [
    {
      id: 1,
      text: "Is the response clear and easy to understand?",
      category: "Clarity"
    },
    {
      id: 2,
      text: "Does it address all aspects of the question?",
      category: "Completeness"
    },
    {
      id: 3,
      text: "Is the tone appropriate for the audience?",
      category: "Tone"
    },
    {
      id: 4,
      text: "Are all technical terms explained?",
      category: "Technical"
    },
    {
      id: 5,
      text: "Is the information accurate and up-to-date?",
      category: "Accuracy"
    }
  ]

  // Filter functions
  const filteredRoles = existingRoles.filter(role => 
    role.name.toLowerCase().includes(roleSearchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(roleSearchQuery.toLowerCase())
  )

  const filteredGuidelines = existingGuidelines.filter(guideline => 
    guideline.text.toLowerCase().includes(guidelineSearchQuery.toLowerCase()) ||
    guideline.category.toLowerCase().includes(guidelineSearchQuery.toLowerCase())
  )

  const filteredGuardrails = existingGuardrails.filter(guardrail => 
    guardrail.text.toLowerCase().includes(guardrailSearchQuery.toLowerCase()) ||
    guardrail.category.toLowerCase().includes(guardrailSearchQuery.toLowerCase())
  )

  const filteredContexts = existingContexts.filter(context => 
    context.text.toLowerCase().includes(contextSearchQuery.toLowerCase()) ||
    context.category.toLowerCase().includes(contextSearchQuery.toLowerCase())
  )

  const filteredOutputFormats = existingOutputFormats.filter(format => 
    format.text.toLowerCase().includes(outputFormatSearchQuery.toLowerCase()) ||
    format.category.toLowerCase().includes(outputFormatSearchQuery.toLowerCase())
  )

  const filteredSelfChecks = existingSelfChecks.filter(check => 
    check.text.toLowerCase().includes(selfCheckSearchQuery.toLowerCase()) ||
    check.category.toLowerCase().includes(selfCheckSearchQuery.toLowerCase())
  )

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
    setIsAddingTag(false)
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const addGuideline = () => {
    if (guidelineInput.trim() && !guidelines.includes(guidelineInput.trim())) {
      setGuidelines([...guidelines, guidelineInput.trim()])
      setGuidelineInput("")
    }
  }

  const removeGuideline = (index: number) => {
    setGuidelines(guidelines.filter((_, i) => i !== index))
  }

  const addGuardrail = () => {
    if (guardrailInput.trim() && !guardrails.includes(guardrailInput.trim())) {
      setGuardrails([...guardrails, guardrailInput.trim()])
      setGuardrailInput("")
    }
  }

  const removeGuardrail = (index: number) => {
    setGuardrails(guardrails.filter((_, i) => i !== index))
  }

  const handleLLMSelection = (llmId: LLMId) => {
    setSelectedLLMs(prev => {
      if (prev.includes(llmId)) {
        return prev.filter(id => id !== llmId)
      }
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, llmId]
    })
  }

  const executePrompt = async () => {
    setIsExecuting(true)
    // Simulate API calls to different LLMs
    const mockResponses: Record<LLMId, string> = {
      "gpt-4": `Here's a comprehensive FAQ response:

Q: How do I reset my password?

A: To reset your password, please follow these steps:

1. Click on the "Forgot Password" link on the login page
2. Enter the email address associated with your account
3. Check your email for a password reset link
4. Click the link and follow the instructions to create a new password

If you don't receive the email within a few minutes, please check your spam folder or contact support at support@example.com.`,
      "gpt-3.5-turbo": `To reset your password:

1. Go to login page
2. Click "Forgot Password"
3. Enter your email
4. Check email for reset link
5. Create new password

Need help? Contact support.`,
      "claude-3-opus": `Password Reset Instructions:

1. Navigate to the login page
2. Locate and click the "Forgot Password" link
3. Enter your registered email address
4. Wait for the password reset email (usually arrives within 2-3 minutes)
5. Open the email and click the reset link
6. Create a new strong password following our security guidelines

Note: If you don't receive the email, please check your spam folder or contact our support team at support@example.com for assistance.`,
      "claude-3-sonnet": `Password Reset Process:

1. Visit login page
2. Click "Forgot Password"
3. Enter email
4. Check inbox for reset link
5. Set new password

Contact support if you need help.`,
      "gemini-pro": `Reset Password Steps:

1. Go to login
2. Click forgot password
3. Enter email
4. Check email for link
5. Set new password

Support: support@example.com`
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const responses: Record<LLMId, string> = {}
    selectedLLMs.forEach(llmId => {
      responses[llmId] = mockResponses[llmId]
    })
    
    setLlmResponses(responses)
    setIsExecuting(false)
    setActiveTab("response")
  }

  const copyToFinalResponse = (llmId: LLMId) => {
    setFinalResponse(llmResponses[llmId])
    setCopiedLLM(llmId)
    toast.success("Response copied to final response")
    // Reset the copied state after 2 seconds
    setTimeout(() => setCopiedLLM(null), 2000)
  }

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditingTitle(false)
    // TODO: Save title to backend
  }

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/prompts">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
        <div className="flex-1 flex items-center gap-4">
          {isEditingTitle ? (
            <form onSubmit={handleTitleSubmit} className="flex-1">
              <Input
                value={promptTitle}
                onChange={(e) => setPromptTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                autoFocus
                className="text-2xl font-bold tracking-tight h-10 px-2"
              />
            </form>
          ) : (
            <div 
              className="flex-1 flex items-center gap-2 cursor-pointer group"
              onClick={() => setIsEditingTitle(true)}
            >
              <h1 className="text-2xl font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors">
                {promptTitle}
              </h1>
              <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
          <div className="flex items-center gap-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded-full hover:bg-muted p-0.5"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {tag}</span>
                </button>
              </Badge>
            ))}
            {isAddingTag ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                  placeholder="Add tag..."
                  className="h-7 w-24"
                  autoFocus
                  onBlur={handleAddTag}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddingTag(true)}
                className="h-7 px-2"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Tag
              </Button>
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          {/* <Button>
            <Send className="mr-2 h-4 w-4" />
            Submit for Review
          </Button> */}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input id="title" placeholder="Enter prompt title" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="rounded-full hover:bg-muted p-0.5"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                  <Button type="button" size="sm" onClick={addTag}>
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card> */}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="components">Prompt Components</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="execute">Execute</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              
            </TabsList>
            <TabsContent value="components" className="space-y-6 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Context</CardTitle>
                      <CardDescription>Why are we doing this and for whom?</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleCard('context')}>
                      {expandedCards.context ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.context && (
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Describe the target audience for this prompt"
                      rows={3}
                      value={selectedContext}
                      onChange={(e) => setSelectedContext(e.target.value)}
                    />
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Existing Contexts</h4>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search contexts..."
                          value={contextSearchQuery}
                          onChange={(e) => setContextSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="grid gap-3">
                        {filteredContexts.length > 0 ? (
                          filteredContexts.map((context) => (
                            <div
                              key={context.id}
                              className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{context.text}</h5>
                                  <Badge variant="secondary" className="text-xs">
                                    {context.category}
                                  </Badge>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8"
                                onClick={() => setSelectedContext(context.text)}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Use context</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-sm text-muted-foreground">
                            No contexts found matching "{contextSearchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Role</CardTitle>
                      <CardDescription>From which perspective will the AI be writing?</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleCard('role')}>
                      {expandedCards.role ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.role && (
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Describe the AI's role and perspective"
                      rows={3}
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                    />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Existing Roles</h4>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Plus className="h-4 w-4 mr-1" />
                          Add New Role
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search roles..."
                          value={roleSearchQuery}
                          onChange={(e) => setRoleSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="grid gap-3">
                        {filteredRoles.length > 0 ? (
                          filteredRoles.map((role) => (
                            <div
                              key={role.id}
                              className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                            >
                              <div className="flex-1">
                                <h5 className="font-medium">{role.name}</h5>
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8"
                                onClick={() => setRoleInput(role.description)}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Use role</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-sm text-muted-foreground">
                            No roles found matching "{roleSearchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Task Instruction</CardTitle>
                      <CardDescription>What should the AI do?</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleCard('taskInstruction')}>
                      {expandedCards.taskInstruction ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.taskInstruction && (
                  <CardContent>
                    <Textarea
                      placeholder="Provide clear instructions for the AI"
                      rows={3}
                    />
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Guidelines</CardTitle>
                      <CardDescription>Best practices for the AI to follow</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleCard('guidelines')}>
                      {expandedCards.guidelines ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.guidelines && (
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a guideline"
                          value={guidelineInput}
                          onChange={(e) => setGuidelineInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addGuideline()
                            }
                          }}
                        />
                        <Button type="button" size="sm" onClick={addGuideline}>
                          Add
                        </Button>
                      </div>
                      <ul className="space-y-2">
                        {guidelines.map((guideline, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="flex-1 bg-muted p-2 rounded-md">{guideline}</div>
                            <Button variant="ghost" size="icon" onClick={() => removeGuideline(index)} className="h-8 w-8">
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Existing Guidelines</h4>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search guidelines..."
                          value={guidelineSearchQuery}
                          onChange={(e) => setGuidelineSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="grid gap-3">
                        {filteredGuidelines.length > 0 ? (
                          filteredGuidelines.map((guideline) => (
                            <div
                              key={guideline.id}
                              className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{guideline.text}</h5>
                                  <Badge variant="secondary" className="text-xs">
                                    {guideline.category}
                                  </Badge>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8"
                                onClick={() => {
                                  if (!guidelines.includes(guideline.text)) {
                                    setGuidelines([...guidelines, guideline.text])
                                  }
                                }}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add guideline</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-sm text-muted-foreground">
                            No guidelines found matching "{guidelineSearchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Guardrails</CardTitle>
                      <CardDescription>Constraints and limitations for the AI</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleCard('guardrails')}>
                      {expandedCards.guardrails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.guardrails && (
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a guardrail"
                          value={guardrailInput}
                          onChange={(e) => setGuardrailInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addGuardrail()
                            }
                          }}
                        />
                        <Button type="button" size="sm" onClick={addGuardrail}>
                          Add
                        </Button>
                      </div>
                      <ul className="space-y-2">
                        {guardrails.map((guardrail, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="flex-1 bg-muted p-2 rounded-md">{guardrail}</div>
                            <Button variant="ghost" size="icon" onClick={() => removeGuardrail(index)} className="h-8 w-8">
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Existing Guardrails</h4>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search guardrails..."
                          value={guardrailSearchQuery}
                          onChange={(e) => setGuardrailSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="grid gap-3">
                        {filteredGuardrails.length > 0 ? (
                          filteredGuardrails.map((guardrail) => (
                            <div
                              key={guardrail.id}
                              className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{guardrail.text}</h5>
                                  <Badge variant="secondary" className="text-xs">
                                    {guardrail.category}
                                  </Badge>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8"
                                onClick={() => {
                                  if (!guardrails.includes(guardrail.text)) {
                                    setGuardrails([...guardrails, guardrail.text])
                                  }
                                }}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add guardrail</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-sm text-muted-foreground">
                            No guardrails found matching "{guardrailSearchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Output Format</CardTitle>
                      <CardDescription>How should the AI structure its response?</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleCard('outputFormat')}>
                      {expandedCards.outputFormat ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.outputFormat && (
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Describe the desired output format"
                      rows={3}
                      value={selectedOutputFormat}
                      onChange={(e) => setSelectedOutputFormat(e.target.value)}
                    />
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Existing Output Formats</h4>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search output formats..."
                          value={outputFormatSearchQuery}
                          onChange={(e) => setOutputFormatSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="grid gap-3">
                        {filteredOutputFormats.length > 0 ? (
                          filteredOutputFormats.map((format) => (
                            <div
                              key={format.id}
                              className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{format.text}</h5>
                                  <Badge variant="secondary" className="text-xs">
                                    {format.category}
                                  </Badge>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8"
                                onClick={() => setSelectedOutputFormat(format.text)}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Use format</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-sm text-muted-foreground">
                            No output formats found matching "{outputFormatSearchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Example</CardTitle>
                      <CardDescription>Provide an example of the expected output</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleCard('example')}>
                      {expandedCards.example ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.example && (
                  <CardContent>
                    <Textarea
                      placeholder="Add an example of the expected output"
                      rows={6}
                    />
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Self Check</CardTitle>
                      <CardDescription>Define who will use this prompt</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleCard('selfCheck')}>
                      {expandedCards.selfCheck ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCards.selfCheck && (
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a self check question"
                          value={selfCheckInput}
                          onChange={(e) => setSelfCheckInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              if (selfCheckInput.trim() && !selfChecks.includes(selfCheckInput.trim())) {
                                setSelfChecks([...selfChecks, selfCheckInput.trim()])
                                setSelfCheckInput("")
                              }
                            }
                          }}
                        />
                        <Button 
                          type="button" 
                          size="sm" 
                          onClick={() => {
                            if (selfCheckInput.trim() && !selfChecks.includes(selfCheckInput.trim())) {
                              setSelfChecks([...selfChecks, selfCheckInput.trim()])
                              setSelfCheckInput("")
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      <ul className="space-y-2">
                        {selfChecks.map((check, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="flex-1 bg-muted p-2 rounded-md">{check}</div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => setSelfChecks(selfChecks.filter((_, i) => i !== index))} 
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Existing Self Checks</h4>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search self checks..."
                          value={selfCheckSearchQuery}
                          onChange={(e) => setSelfCheckSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="grid gap-3">
                        {filteredSelfChecks.length > 0 ? (
                          filteredSelfChecks.map((check) => (
                            <div
                              key={check.id}
                              className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{check.text}</h5>
                                  <Badge variant="secondary" className="text-xs">
                                    {check.category}
                                  </Badge>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8"
                                onClick={() => {
                                  if (!selfChecks.includes(check.text)) {
                                    setSelfChecks([...selfChecks, check.text])
                                  }
                                }}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add self check</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-sm text-muted-foreground">
                            No self checks found matching "{selfCheckSearchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="preview" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prompt Preview</CardTitle>
                  <CardDescription>This is how your prompt will appear when used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md space-y-4">
                    <div>
                      <h3 className="font-medium">Audience:</h3>
                      <p>Customer support representatives who need to quickly generate accurate FAQ responses.</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Task Instruction:</h3>
                      <p>
                        Generate comprehensive FAQ answers for common customer support questions related to our product.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Guidelines:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {guidelines.map((guideline, index) => (
                          <li key={index}>{guideline}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Guardrails:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {guardrails.map((guardrail, index) => (
                          <li key={index}>{guardrail}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Output Format:</h3>
                      <p>
                        Structured FAQ response with a clear question heading, concise answer, and any relevant
                        follow-up information or links.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Example:</h3>
                      <pre className="bg-background p-3 rounded-md text-sm whitespace-pre-wrap">
                        {`Q: How do I reset my password?

  A: To reset your password, please follow these steps:

  1. Click on the "Forgot Password" link on the login page
  2. Enter the email address associated with your account
  3. Check your email for a password reset link
  4. Click the link and follow the instructions to create a new password

  If you don't receive the email within a few minutes, please check your spam folder or contact support at support@example.com.`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
                <CardContent className="flex justify-end pt-4">
                  <Button onClick={() => setActiveTab("execute")}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Save and Run with LLMs
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="execute" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Execute Prompt</CardTitle>
                  <CardDescription>Select up to 3 LLMs to run your prompt</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    {llms.map((llm) => (
                      <div
                        key={llm.id}
                        className={`flex items-start space-x-4 p-4 rounded-lg border ${
                          selectedLLMs.includes(llm.id) ? "border-primary" : "border-border"
                        }`}
                      >
                        <Checkbox
                          id={llm.id}
                          checked={selectedLLMs.includes(llm.id)}
                          onCheckedChange={() => handleLLMSelection(llm.id)}
                          disabled={!selectedLLMs.includes(llm.id) && selectedLLMs.length >= 3}
                        />
                        <div className="space-y-1">
                          <label
                            htmlFor={llm.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {llm.name}
                          </label>
                          <p className="text-sm text-muted-foreground">{llm.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Provider: {llm.provider}</span>
                            <span>Max Tokens: {llm.maxTokens.toLocaleString()}</span>
                            <span>Cost: ${llm.costPer1KTokens}/1K tokens</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedLLMs.length > 0 && (
                    <div className="flex justify-end">
                      <Button
                        onClick={executePrompt}
                        disabled={isExecuting}
                      >
                        {isExecuting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Executing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Execute with {selectedLLMs.length} LLM{selectedLLMs.length > 1 ? "s" : ""}
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {selectedLLMs.length === 0 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Please select at least one LLM to execute your prompt
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="response" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>LLM Responses</CardTitle>
                  <CardDescription>Responses from the selected LLMs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedLLMs.map((llmId) => {
                    const llm = llms.find(l => l.id === llmId)
                    return (
                      <div key={llmId} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{llm?.name}</h3>
                            <p className="text-sm text-muted-foreground">{llm?.provider}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">${llm?.costPer1KTokens}/1K tokens</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToFinalResponse(llmId)}
                              className="h-8"
                            >
                              {copiedLLM === llmId ? (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <pre className="whitespace-pre-wrap text-sm">{llmResponses[llmId]}</pre>
                        </div>
                      </div>
                    )
                  })}

                  <div className="space-y-4 pt-6 border-t">
                    <div>
                      <h3 className="font-medium mb-2">Final Response</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select and edit your preferred response from above, or write your own
                      </p>
                      <Textarea
                        value={finalResponse}
                        onChange={(e) => setFinalResponse(e.target.value)}
                        placeholder="Your final response will appear here..."
                        className="min-h-[200px] font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => {
                        // TODO: Implement submit for review logic
                        toast.success("Response submitted for review")
                      }}
                      disabled={!finalResponse.trim()}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit for Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="review" className="space-y-6 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Review Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">Awaiting Approval</p>
                        <p className="text-sm text-muted-foreground">Submitted 1 day ago</p>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="h-10" />
                    <div>
                      <p className="text-sm font-medium">Reviewer</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={prompt.reviews[0].reviewer.avatar || "/placeholder.svg"}
                            alt={prompt.reviews[0].reviewer.name}
                          />
                          <AvatarFallback>{prompt.reviews[0].reviewer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{prompt.reviews[0].reviewer.name}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {prompt.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} alt={review.reviewer.name} />
                          <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{review.reviewer.name}</p>
                              <p className="text-sm text-muted-foreground">{review.createdAt}</p>
                            </div>
                            <Badge variant="secondary">{review.status}</Badge>
                          </div>
                          <div className="mt-2 space-y-2">
                            <p>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Add Comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={prompt.createdBy.avatar || "/placeholder.svg"} alt={prompt.createdBy.name} />
                      <AvatarFallback>{prompt.createdBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        placeholder="Add your comment..."
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="space-y-6 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Version History</CardTitle>
                  <CardDescription>Track changes to this prompt over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Current Version</p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Updated by {prompt.createdBy.name}</p>
                        <p className="text-sm mt-1">Added more specific guardrails and updated example</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Submitted for Review</p>
                          <p className="text-sm text-muted-foreground">1 day ago</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Updated by {prompt.createdBy.name}</p>
                        <p className="text-sm mt-1">Refined guidelines and added output format</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Initial Draft</p>
                          <p className="text-sm text-muted-foreground">3 days ago</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Created by {prompt.createdBy.name}</p>
                        <p className="text-sm mt-1">Created initial prompt structure</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Template</CardTitle>
              <CardDescription>Start from a pre-built template</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No template</SelectItem>
                  <SelectItem value="faq">FAQ Generator</SelectItem>
                  <SelectItem value="product">Product Description</SelectItem>
                  <SelectItem value="social">Social Media Post</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <BookTemplate className="mr-2 h-4 w-4" />
                  Browse Templates
                </Button>
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription>Get help improving your prompt</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Suggest Improvements
              </Button>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Suggestions:</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Plus className="h-4 w-4 mt-0.5 text-primary" />
                    <span>Add more specific examples for different question types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Plus className="h-4 w-4 mt-0.5 text-primary" />
                    <span>Include guardrail for handling sensitive customer information</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
