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
import { ArrowLeft, Plus, X, Save, Send, Sparkles, BookTemplate } from "lucide-react"
import { llms } from "@/app/data/llms"
import { LLM, LLMId } from "@/app/types/llm"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function NewPromptPage() {
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

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/prompts">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Prompt</h1>
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
          <Card>
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
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="components">Prompt Components</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="execute">Execute</TabsTrigger>
              <TabsTrigger value="Review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="components" className="space-y-6 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Audience</CardTitle>
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
                        onClick={() => {
                          // TODO: Implement execution logic
                          console.log("Executing with LLMs:", selectedLLMs)
                        }}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Execute with {selectedLLMs.length} LLM{selectedLLMs.length > 1 ? "s" : ""}
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
            <TabsContent value="Review" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Review Prompt</CardTitle>
                  <CardDescription>This is how your prompt will appear when used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md space-y-4">
                    <div>
                      <h3 className="font-medium">Audience:</h3>
                      <p>Customer support representatives who need to quickly generate accurate FAQ responses.</p>
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
