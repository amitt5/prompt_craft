"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, X, Save, Send, Sparkles, BookTemplate, Loader2, Copy, Check, Clock, MessageSquare, Pencil } from "lucide-react"
import { llms } from "@/app/data/llms"
import { LLM, LLMId } from "@/app/types/llm"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NewPromptPage({ params }: { params: { id: string } }) {

  const prompt = {
    id: 1,
    // id: params.id,
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

  
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
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
  const [promptTitle, setPromptTitle] = useState(params.id === "new" ? "Prompt Name" : prompt.title)

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
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

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/prompts">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
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
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Submit for Review
          </Button>
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
                  <CardTitle className="text-lg">Context</CardTitle>
                  <CardDescription>Why are we doing this and for whom?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe the target audience for this prompt"
                    rows={3}
                    defaultValue="Customer support representatives who need to quickly generate accurate FAQ responses."
                  />
                </CardContent>
              </Card>


              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Role</CardTitle>
                  <CardDescription>From which perspective will the AI be writing?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe the target audience for this prompt"
                    rows={3}
                    defaultValue="Customer support representatives who need to quickly generate accurate FAQ responses."
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Task Instruction</CardTitle>
                  <CardDescription>What should the AI do?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Provide clear instructions for the AI"
                    rows={3}
                    defaultValue="Generate comprehensive FAQ answers for common customer support questions related to our product."
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Guidelines</CardTitle>
                  <CardDescription>Best practices for the AI to follow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Guardrails</CardTitle>
                  <CardDescription>Constraints and limitations for the AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Output Format</CardTitle>
                  <CardDescription>How should the AI structure its response?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe the desired output format"
                    rows={3}
                    defaultValue="Structured FAQ response with a clear question heading, concise answer, and any relevant follow-up information or links."
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Example</CardTitle>
                  <CardDescription>Provide an example of the expected output</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Add an example of the expected output"
                    rows={6}
                    defaultValue={`Q: How do I reset my password?

A: To reset your password, please follow these steps:

1. Click on the "Forgot Password" link on the login page
2. Enter the email address associated with your account
3. Check your email for a password reset link
4. Click the link and follow the instructions to create a new password

If you don't receive the email within a few minutes, please check your spam folder or contact support at support@example.com.`}
                  />
                </CardContent>
              </Card>


              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Self Check</CardTitle>
                  <CardDescription>Define who will use this prompt</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe the target audience for this prompt"
                    rows={3}
                    defaultValue="Customer support representatives who need to quickly generate accurate FAQ responses."
                  />
                </CardContent>
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
              <CardTitle className="text-lg">Saved Components</CardTitle>
              <CardDescription>Reuse components from your library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Guidelines</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select saved guidelines" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Support Guidelines</SelectItem>
                    <SelectItem value="marketing">Marketing Guidelines</SelectItem>
                    <SelectItem value="technical">Technical Guidelines</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Guardrails</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select saved guardrails" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Guardrails</SelectItem>
                    <SelectItem value="legal">Legal Guardrails</SelectItem>
                    <SelectItem value="privacy">Privacy Guardrails</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Output Formats</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select saved format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faq">FAQ Format</SelectItem>
                    <SelectItem value="step">Step-by-Step Format</SelectItem>
                    <SelectItem value="bullet">Bullet Points Format</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Manage Components
              </Button>
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
