"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, Search, Filter, MoreHorizontal, Copy, Pencil, Trash, Eye } from "lucide-react"

export default function PromptsPage() {
  // Mock data for prompts
  const promptsData = [
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
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")

  // Filter prompts based on search query and filters
  const filteredPrompts = promptsData.filter((prompt) => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || prompt.status === statusFilter
    const matchesTag = tagFilter === "all" || prompt.tags.includes(tagFilter)
    return matchesSearch && matchesStatus && matchesTag
  })

  // Get unique tags for filter dropdown
  const uniqueTags = Array.from(new Set(promptsData.flatMap((prompt) => prompt.tags)))

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Prompts</h1>
        <Button asChild>
          <a href="/prompts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Prompt
          </a>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
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
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrompts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No prompts found. Try adjusting your filters or create a new prompt.
                </TableCell>
              </TableRow>
            ) : (
              filteredPrompts.map((prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell className="font-medium">
                    <a href={`/prompts/${prompt.id}`} className="hover:underline">
                      {prompt.title}
                    </a>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={prompt.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{prompt.updatedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a href={`/prompts/${prompt.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/prompts/${prompt.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </a>
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

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Draft":
      return <Badge variant="outline">Draft</Badge>
    case "Submitted":
      return <Badge variant="secondary">Submitted</Badge>
    case "Approved":
      return <Badge variant="default">Approved</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
