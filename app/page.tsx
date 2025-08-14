"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Users,
  TestTube,
  FileText,
  AlertTriangle,
  Search,
  Bell,
  Settings,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
} from "lucide-react"

// Sample data for charts
const dailySampleData = [
  { day: "Thứ Hai", samples: 180, percentage: 36 },
  { day: "Thứ Ba", samples: 320, percentage: 64 },
  { day: "Thứ Tư", samples: 380, percentage: 76 },
  { day: "Thứ Năm", samples: 280, percentage: 56 },
  { day: "Thứ Sáu", samples: 500, percentage: 100 },
  { day: "Thứ Bảy", samples: 280, percentage: 56 },
  { day: "Chủ Nhật", samples: 450, percentage: 90 },
]

const testTypeData = [
  { name: "Huyết học", value: 45, color: "bg-primary-500" },
  { name: "Sinh hóa", value: 35, color: "bg-warning-500" },
  { name: "Vi sinh", value: 20, color: "bg-success-500" },
]

const sampleTypeData = [
  { name: "Máu", value: 40, color: "bg-primary-500" },
  { name: "Nước tiểu", value: 25, color: "bg-warning-500" },
  { name: "Phân", value: 15, color: "bg-success-500" },
  { name: "Khác", value: 20, color: "bg-purple-500" },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="glass-effect sticky top-0 z-50 px-6 py-4 border-b border-primary-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="icon-bg-primary">
                <TestTube className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-heading">G-LIS</h1>
                <p className="text-xs text-gray-500">Laboratory Information System</p>
              </div>
            </div>
            <nav className="hidden lg:flex space-x-2">
              <Button variant="ghost" className="nav-item nav-item-active">
                <Activity className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" className="nav-item" asChild>
                <Link href="/sample-collection">
                  <TestTube className="h-4 w-4 mr-2" />
                  Tiếp nhận mẫu
                </Link>
              </Button>
              <Button variant="ghost" className="nav-item" asChild>
                <Link href="/patients">
                  <Users className="h-4 w-4 mr-2" />
                  Quản lý bệnh nhân
                </Link>
              </Button>
              <Button variant="ghost" className="nav-item" asChild>
                <Link href="/quality-control">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Kiểm soát chất lượng
                </Link>
              </Button>
              <Button variant="ghost" className="nav-item" asChild>
                <Link href="/test-results">
                  <FileText className="h-4 w-4 mr-2" />
                  Kết quả xét nghiệm
                </Link>
              </Button>
              <Button variant="ghost" className="nav-item" asChild>
                <Link href="/reports">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Báo cáo & Thống kê
                </Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hover:bg-primary-50 hover:border-primary-300 bg-transparent">
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary-50 hover:border-primary-300 relative bg-transparent"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-danger-500 rounded-full animate-pulse-soft"></span>
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-primary-50 hover:border-primary-300 bg-transparent">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Admin</div>
                <div className="text-gray-500">Quản trị viên</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <Card className="card-glow border-l-4 border-l-primary-500 bg-gradient-to-br from-white to-primary-50/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng số bệnh nhân</CardTitle>
              <div className="icon-bg-primary">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">3,545</div>
              <p className="text-xs text-primary-600 font-medium">↗ +12% so với tháng trước</p>
            </CardContent>
          </Card>

          <Card className="card-glow border-l-4 border-l-warning-500 bg-gradient-to-br from-white to-warning-50/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng số bệnh phẩm</CardTitle>
              <div className="icon-bg-warning">
                <TestTube className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">4,575</div>
              <p className="text-xs text-warning-600 font-medium">↗ +8% so với tháng trước</p>
            </CardContent>
          </Card>

          <Card className="card-glow border-l-4 border-l-success-500 bg-gradient-to-br from-white to-success-50/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng số xét nghiệm</CardTitle>
              <div className="icon-bg-success">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">4,575</div>
              <p className="text-xs text-success-600 font-medium">↗ +15% so với tháng trước</p>
            </CardContent>
          </Card>

          <Card className="card-glow border-l-4 border-l-danger-500 bg-gradient-to-br from-white to-danger-50/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">TAT trung bình</CardTitle>
              <div className="icon-bg-danger">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                14<span className="text-lg text-gray-500">h</span>
              </div>
              <p className="text-xs text-danger-600 font-medium">↘ -5% so với tháng trước</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
          {/* Daily Samples Bar Chart */}
          <Card className="card-hover chart-container">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold gradient-heading flex items-center">
                <div className="icon-bg-primary mr-3">
                  <BarChart3 className="h-5 w-5" />
                </div>
                Số lượng mẫu theo ngày
              </CardTitle>
              <p className="text-sm text-gray-500">Thống kê 7 ngày gần nhất</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailySampleData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 w-24">
                      <span className="text-sm font-medium text-gray-700">{item.day}</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm font-semibold text-gray-900">{item.samples}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Type Distribution */}
          <Card className="card-hover chart-container">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold gradient-heading flex items-center">
                <div className="icon-bg-primary mr-3">
                  <PieChart className="h-5 w-5" />
                </div>
                Tỷ lệ xét nghiệm theo nhóm
              </CardTitle>
              <p className="text-sm text-gray-500">Phân bố theo loại xét nghiệm</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${item.value * 2}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-8">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sample Type Distribution */}
          <Card className="card-hover chart-container">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold gradient-heading flex items-center">
                <div className="icon-bg-primary mr-3">
                  <PieChart className="h-5 w-5" />
                </div>
                Tỷ lệ mẫu theo loại
              </CardTitle>
              <p className="text-sm text-gray-500">Phân bố theo loại bệnh phẩm</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${item.value * 2.5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-8">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card className="card-hover chart-container">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold gradient-heading flex items-center">
                <div className="icon-bg-primary mr-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                Xu hướng kết quả xét nghiệm
              </CardTitle>
              <p className="text-sm text-gray-500">Dương tính vs Âm tính theo tháng</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
                    <span>Dương tính</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                    <span>Âm tính</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {monthlyTrendData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{item.month}</span>
                        <span>{item.positive + item.negative} tổng</span>
                      </div>
                      <div className="flex space-x-1 h-4">
                        <div
                          className="bg-danger-500 rounded-l transition-all duration-1000 ease-out"
                          style={{ width: `${(item.positive / (item.positive + item.negative)) * 100}%` }}
                        ></div>
                        <div
                          className="bg-success-500 rounded-r transition-all duration-1000 ease-out"
                          style={{ width: `${(item.negative / (item.positive + item.negative)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
