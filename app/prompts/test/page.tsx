import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Pencil, Copy, MessageSquare, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function PromptDetailPage({ params }: { params: { id: string } }) {
  // Mock data for a prompt
  const prompt = {
    id: params.id,
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

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/prompts">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{prompt.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Created by {prompt.createdBy.name}</span>
            <span>•</span>
            <span>Updated {prompt.updatedAt}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <StatusBadge status={prompt.status} />
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button asChild>
            <a href={`/prompts/${prompt.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="prompt">
        <TabsList>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews
            <Badge variant="secondary" className="ml-2">
              {prompt.reviews.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt" className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {prompt.components.map((component, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{component.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Array.isArray(component.content) ? (
                      <ul className="list-disc pl-6 space-y-1">
                        {component.content.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : component.type === "Example" ? (
                      <pre className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">{component.content}</pre>
                    ) : (
                      <p>{component.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Status</h3>
                    <StatusBadge status={prompt.status} className="mt-1" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Tags</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {prompt.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Created By</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={prompt.createdBy.avatar || "/placeholder.svg"} alt={prompt.createdBy.name} />
                        <AvatarFallback>{prompt.createdBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{prompt.createdBy.name}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Last Updated</h3>
                    <p className="text-sm text-muted-foreground">{prompt.updatedAt}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">AI Self-Review</CardTitle>
                  <CardDescription>Automated analysis of prompt quality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Clear audience definition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Well-defined output format</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Could use more specific examples</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Good guardrails in place</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-6 pt-4">
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
  )
}

function StatusBadge({ status, className }: { status: string; className?: string }) {
  const badgeProps = {
    variant: "outline" as const,
    className,
  }

  switch (status) {
    case "Draft":
      badgeProps.variant = "outline"
      break
    case "Submitted":
      badgeProps.variant = "secondary"
      break
    case "Approved":
      badgeProps.variant = "default"
      break
    default:
      badgeProps.variant = "outline"
  }

  return <Badge {...badgeProps}>{status}</Badge>
}
