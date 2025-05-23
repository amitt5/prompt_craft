import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookTemplate, Search, PlusCircle, ArrowRight } from "lucide-react"

export default function TemplatesPage() {
  // Mock data for templates
  const templates = [
    {
      id: 1,
      title: "Content Writer",
      description: "Create engaging blog posts and articles",
      category: "Content",
      usageCount: 156,
    },
    {
      id: 2,
      title: "Email Marketer",
      description: "Craft compelling email campaigns",
      category: "Marketing",
      usageCount: 98,
    },
    {
      id: 3,
      title: "SEO Optimizer",
      description: "Generate SEO-friendly content",
      category: "SEO",
      usageCount: 87,
    },
    {
      id: 4,
      title: "Product Description Writer",
      description: "Create compelling product descriptions",
      category: "E-commerce",
      usageCount: 76,
    },
    {
      id: 5,
      title: "Social Media Manager",
      description: "Create engaging social media posts",
      category: "Social Media",
      usageCount: 65,
    },
    {
      id: 6,
      title: "Customer Support FAQ Generator",
      description: "Generate comprehensive FAQ answers",
      category: "Support",
      usageCount: 54,
    },
    {
      id: 7,
      title: "Technical Documentation Writer",
      description: "Create clear technical documentation",
      category: "Technical",
      usageCount: 43,
    },
    {
      id: 8,
      title: "Legal Document Drafter",
      description: "Draft legal documents and disclaimers",
      category: "Legal",
      usageCount: 32,
    },
  ]

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <Button asChild>
          <a href="/templates/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Template
          </a>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.category}</Badge>
                    <span className="text-xs text-muted-foreground">{template.usageCount} uses</span>
                  </div>
                  <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookTemplate className="mr-2 h-4 w-4" />
                    <span>8 components</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/templates/${template.id}`}>View Details</a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={`/prompts/new?template=${template.id}`}>
                      Use Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="content" className="pt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates
              .filter((template) => template.category === "Content")
              .map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.category}</Badge>
                      <span className="text-xs text-muted-foreground">{template.usageCount} uses</span>
                    </div>
                    <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookTemplate className="mr-2 h-4 w-4" />
                      <span>8 components</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/templates/${template.id}`}>View Details</a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={`/prompts/new?template=${template.id}`}>
                        Use Template
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  )
}
