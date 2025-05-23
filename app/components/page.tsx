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
  const componentsData = [
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

  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")

  // Filter components based on search query and filters
  const filteredComponents = componentsData.filter((component) => {
    const matchesSearch = component.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || component.type === typeFilter
    const matchesTag = tagFilter === "all" || component.tags.includes(tagFilter)
    return matchesSearch && matchesType && matchesTag
  })

  // Get unique types and tags for filter dropdowns
  const uniqueTypes = Array.from(new Set(componentsData.map((component) => component.type)))
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
                    <div className="truncate max-w-md">{component.content}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{component.type}</Badge>
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
