import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { Users, TestTube, FileText, AlertTriangle, Search, Bell, Settings } from "lucide-react"

// Sample data for charts
const dailySampleData = [
  { day: "Thứ Hai", samples: 180 },
  { day: "Thứ Ba", samples: 320 },
  { day: "Thứ Tư", samples: 380 },
  { day: "Thứ Năm", samples: 280 },
  { day: "Thứ Sáu", samples: 500 },
  { day: "Thứ Bảy", samples: 280 },
  { day: "Chủ Nhật", samples: 450 },
]

const testTypeData = [
  { name: "Huyết học", value: 45, color: "#0891b2" },
  { name: "Sinh hóa", value: 35, color: "#f59e0b" },
  { name: "Vi sinh", value: 20, color: "#6b7280" },
]

const sampleTypeData = [
  { name: "Máu", value: 40, color: "#0891b2" },
  { name: "Nước tiểu", value: 25, color: "#f59e0b" },
  { name: "Phân", value: 15, color: "#10b981" },
  { name: "Khác", value: 20, color: "#6b7280" },
]

const monthlyTrendData = [
  { month: "01/2024", positive: 200, negative: 180 },
  { month: "02/2024", positive: 190, negative: 220 },
  { month: "03/2024", positive: 200, negative: 195 },
  { month: "04/2024", positive: 220, negative: 180 },
  { month: "05/2024", positive: 240, negative: 150 },
  { month: "06/2024", positive: 280, negative: 120 },
  { month: "07/2024", positive: 260, negative: 140 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TestTube className="h-8 w-8 text-cyan-600" />
              <h1 className="text-2xl font-bold text-gray-900">G-LIS</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-cyan-600 font-medium">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-gray-600" asChild>
                <Link href="/patients">Quản lý bệnh nhân</Link>
              </Button>
              <Button variant="ghost" className="text-gray-600" asChild>
                <Link href="/test-results">Quản lý kết quả</Link>
              </Button>
              <Button variant="ghost" className="text-gray-600" asChild>
                <Link href="/sample-collection">Tiếp nhận bệnh phẩm</Link>
              </Button>
              <Button variant="ghost" className="text-gray-600" asChild>
                <Link href="/quality-control">Kiểm soát chất lượng</Link>
              </Button>
              <Button variant="ghost" className="text-gray-600" asChild>
                <Link href="/reports">Báo cáo & Thống kê</Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="text-sm text-gray-600">
              Đăng nhập: <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng số bệnh nhân</CardTitle>
              <Users className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">3545</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng số bệnh phẩm</CardTitle>
              <TestTube className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4575</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng số xét nghiệm</CardTitle>
              <FileText className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4575</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">TAT trung bình</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">14</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Samples Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Số lượng mẫu theo ngày</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Bar dataKey="samples" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Test Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Tỷ lệ số lượng xét nghiệm các nhóm</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={testTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {testTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sample Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Tỷ lệ mẫu theo đối tượng</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={sampleTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {sampleTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Số lượng BN xét nghiệm (dương tính, âm tính)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="positive" stroke="#0891b2" strokeWidth={2} name="Dương tính" />
                  <Line type="monotone" dataKey="negative" stroke="#06b6d4" strokeWidth={2} name="Âm tính" />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
