import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookTemplate, ArrowRight, Pencil } from "lucide-react"

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  // Mock data for a template
  const template = {
    id: params.id,
    title: "Customer Support FAQ Generator",
    description: "Create comprehensive FAQ answers for customer support inquiries",
    category: "Support",
    usageCount: 54,
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
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/templates">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{template.title}</h1>
          <p className="text-muted-foreground">{template.description}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" asChild>
            <a href={`/templates/${template.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Template
            </a>
          </Button>
          <Button asChild>
            <a href={`/prompts/new?template=${template.id}`}>
              Use Template
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {template.components.map((component, index) => (
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
              <CardTitle className="text-lg">Template Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Category</h3>
                <Badge variant="outline" className="mt-1">
                  {template.category}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium">Usage</h3>
                <p className="text-sm text-muted-foreground">{template.usageCount} prompts created</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Components</h3>
                <p className="text-sm text-muted-foreground">{template.components.length} components</p>
              </div>
              <Separator />
              <div className="pt-2">
                <Button className="w-full" asChild>
                  <a href={`/prompts/new?template=${template.id}`}>
                    <BookTemplate className="mr-2 h-4 w-4" />
                    Create Prompt from Template
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                <BookTemplate className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Technical Support Guide</p>
                  <p className="text-sm text-muted-foreground">For technical product issues</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                <BookTemplate className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Billing Support Template</p>
                  <p className="text-sm text-muted-foreground">For payment and billing inquiries</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                <BookTemplate className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Product Comparison Guide</p>
                  <p className="text-sm text-muted-foreground">Compare features across products</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
