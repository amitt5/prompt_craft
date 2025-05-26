import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Layers, Clock, TrendingUp, CheckCircle, AlertCircle, BarChart3 } from "lucide-react"

export default function Dashboard() {
  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      title: "Product Description Template",
      action: "Approved by Sarah Chen (Prompt Librarian)",
      time: "2 hours ago",
      status: "Approved",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
    {
      id: 2,
      title: "GDPR Compliance Guardrail",
      action: "New component added to Legal Library",
      time: "4 hours ago",
      status: "New",
      icon: Layers,
      iconColor: "text-blue-500",
    },
    {
      id: 3,
      title: "Customer Support Response Template",
      action: "Updated by Marketing Team",
      time: "6 hours ago",
      status: "Updated",
      icon: AlertCircle,
      iconColor: "text-orange-500",
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to PromptFlow</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Activity
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Zap className="mr-2 h-4 w-4" />
            New Prompt
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Prompts</p>
                <p className="text-3xl font-bold">24</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Components</p>
                <p className="text-3xl font-bold">156</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8 new this week
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Layers className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">2 require your review</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quality Score</p>
                <p className="text-3xl font-bold">94%</p>
                <p className="text-sm text-green-600">Above target (90%)</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <activity.icon className={`h-5 w-5 mt-0.5 ${activity.iconColor}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "Approved" ? "default" : activity.status === "New" ? "secondary" : "outline"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <CardTitle>Performance Metrics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Quality Score</p>
                <p className="text-xs text-muted-foreground">Average prompt quality this month</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">94%</p>
                <p className="text-xs text-green-600">↗ +2.5%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Usage Rate</p>
                <p className="text-xs text-muted-foreground">Components being actively used</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">89%</p>
                <p className="text-xs text-green-600">↗ +12%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Approval Time</p>
                <p className="text-xs text-muted-foreground">Average time for approval workflow</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">2.1d</p>
                <p className="text-xs text-green-600">↗ -0.8d</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Reuse Rate</p>
                <p className="text-xs text-muted-foreground">Components reused across prompts</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">76%</p>
                <p className="text-xs text-green-600">↗ +8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
