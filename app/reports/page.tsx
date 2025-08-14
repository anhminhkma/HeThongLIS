"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  AreaChart,
  Area,
} from "recharts"
import { TestTube, ArrowLeft, Download, FileText, Calendar, TrendingUp, Users, Activity } from "lucide-react"
import Link from "next/link"

// Sample data for reports
const monthlyReportData = [
  { month: "01/2024", samples: 2453, tests: 3424, patients: 1205, abnormal: 124 },
  { month: "02/2024", samples: 2380, tests: 3200, patients: 1150, abnormal: 98 },
  { month: "03/2024", samples: 2650, tests: 3680, patients: 1320, abnormal: 145 },
  { month: "04/2024", samples: 2420, tests: 3350, patients: 1180, abnormal: 112 },
  { month: "05/2024", samples: 2780, tests: 3890, patients: 1450, abnormal: 167 },
  { month: "06/2024", samples: 2590, tests: 3620, patients: 1280, abnormal: 134 },
  { month: "07/2024", samples: 2720, tests: 3780, patients: 1380, abnormal: 156 },
  { month: "08/2024", samples: 2850, tests: 3950, patients: 1420, abnormal: 178 },
]

const departmentData = [
  { name: "Khoa Nội", value: 35, color: "#0891b2", samples: 1580 },
  { name: "Khoa Ngoại", value: 25, color: "#f59e0b", samples: 1125 },
  { name: "Khoa Sản", value: 20, color: "#10b981", samples: 900 },
  { name: "Khoa Nhi", value: 15, color: "#8b5cf6", samples: 675 },
  { name: "Khác", value: 5, color: "#6b7280", samples: 225 },
]

const testTypePerformance = [
  { testType: "Huyết học", total: 1250, completed: 1180, pending: 45, failed: 25, avgTime: 2.5 },
  { testType: "Sinh hóa", total: 980, completed: 920, pending: 35, failed: 25, avgTime: 3.2 },
  { testType: "Vi sinh", total: 650, completed: 580, pending: 50, failed: 20, avgTime: 48.5 },
  { testType: "Miễn dịch", total: 420, completed: 390, pending: 20, failed: 10, avgTime: 4.8 },
  { testType: "Giải phẫu bệnh", total: 180, completed: 165, pending: 10, failed: 5, avgTime: 72.0 },
]

const dailyWorkloadData = [
  { day: "Thứ 2", morning: 180, afternoon: 120, evening: 45 },
  { day: "Thứ 3", morning: 220, afternoon: 150, evening: 60 },
  { day: "Thứ 4", morning: 250, afternoon: 180, evening: 70 },
  { day: "Thứ 5", morning: 200, afternoon: 140, evening: 55 },
  { day: "Thứ 6", morning: 280, afternoon: 200, evening: 80 },
  { day: "Thứ 7", morning: 150, afternoon: 100, evening: 40 },
  { day: "CN", morning: 80, afternoon: 60, evening: 25 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [dateFrom, setDateFrom] = useState("2024-08-01")
  const [dateTo, setDateTo] = useState("2024-08-31")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <TestTube className="h-8 w-8 text-cyan-600" />
              <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Report Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Tùy chọn báo cáo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Từ ngày</label>
                <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Đến ngày</label>
                <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Chu kỳ</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="monthly">Hàng tháng</SelectItem>
                    <SelectItem value="quarterly">Hàng quý</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Khoa/Phòng</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="noi">Khoa Nội</SelectItem>
                    <SelectItem value="ngoai">Khoa Ngoại</SelectItem>
                    <SelectItem value="san">Khoa Sản</SelectItem>
                    <SelectItem value="nhi">Khoa Nhi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="bg-cyan-600 hover:bg-cyan-700 w-full">Tạo báo cáo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
            <TabsTrigger value="quality">Chất lượng</TabsTrigger>
            <TabsTrigger value="financial">Tài chính</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Tổng mẫu tháng này</CardTitle>
                    <TestTube className="h-4 w-4 text-cyan-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">2,850</div>
                    <p className="text-xs text-green-600">+12.5% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Tổng xét nghiệm</CardTitle>
                    <Activity className="h-4 w-4 text-cyan-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">3,950</div>
                    <p className="text-xs text-green-600">+8.3% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Bệnh nhân mới</CardTitle>
                    <Users className="h-4 w-4 text-cyan-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">1,420</div>
                    <p className="text-xs text-green-600">+5.2% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Tỷ lệ bất thường</CardTitle>
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">12.5%</div>
                    <p className="text-xs text-red-600">+2.1% so với tháng trước</p>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Xu hướng theo tháng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Area type="monotone" dataKey="samples" stackId="1" stroke="#0891b2" fill="#0891b2" />
                        <Area type="monotone" dataKey="tests" stackId="1" stroke="#06b6d4" fill="#06b6d4" />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Phân bố theo khoa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={departmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Daily Workload */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Khối lượng công việc hàng ngày</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyWorkloadData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Bar dataKey="morning" stackId="a" fill="#0891b2" name="Sáng" />
                      <Bar dataKey="afternoon" stackId="a" fill="#06b6d4" name="Chiều" />
                      <Bar dataKey="evening" stackId="a" fill="#67e8f9" name="Tối" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Hiệu suất theo loại xét nghiệm</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold">Loại xét nghiệm</TableHead>
                          <TableHead className="font-semibold text-center">Tổng số</TableHead>
                          <TableHead className="font-semibold text-center">Hoàn thành</TableHead>
                          <TableHead className="font-semibold text-center">Đang chờ</TableHead>
                          <TableHead className="font-semibold text-center">Thất bại</TableHead>
                          <TableHead className="font-semibold text-center">Tỷ lệ hoàn thành</TableHead>
                          <TableHead className="font-semibold text-center">Thời gian TB (giờ)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {testTypePerformance.map((test, index) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{test.testType}</TableCell>
                            <TableCell className="text-center">{test.total}</TableCell>
                            <TableCell className="text-center text-green-600">{test.completed}</TableCell>
                            <TableCell className="text-center text-yellow-600">{test.pending}</TableCell>
                            <TableCell className="text-center text-red-600">{test.failed}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${(test.completed / test.total) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{((test.completed / test.total) * 100).toFixed(1)}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">{test.avgTime}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Thời gian xử lý trung bình</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Line type="monotone" dataKey="abnormal" stroke="#f59e0b" strokeWidth={2} name="Thời gian TB" />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Tỷ lệ hoàn thành đúng hạn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Huyết học</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                          </div>
                          <span className="text-sm">94%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sinh hóa</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                          </div>
                          <span className="text-sm">89%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Vi sinh</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "76%" }}></div>
                          </div>
                          <span className="text-sm">76%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Miễn dịch</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                          <span className="text-sm">92%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quality">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">Tỷ lệ QC đạt chuẩn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">96.8%</div>
                    <p className="text-xs text-gray-600">Mục tiêu: ≥95%</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">Mẫu bị từ chối</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">2.1%</div>
                    <p className="text-xs text-gray-600">Mục tiêu: ≤3%</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">Độ chính xác</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">99.2%</div>
                    <p className="text-xs text-gray-600">Mục tiêu: ≥98%</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Xu hướng chất lượng</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyReportData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Line
                        type="monotone"
                        dataKey="abnormal"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="QC đạt chuẩn (%)"
                      />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">Doanh thu tháng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">2.8 tỷ</div>
                    <p className="text-xs text-green-600">+15.2% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">Chi phí vận hành</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">1.2 tỷ</div>
                    <p className="text-xs text-red-600">+8.5% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">Lợi nhuận</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">1.6 tỷ</div>
                    <p className="text-xs text-green-600">+22.1% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">Biên lợi nhuận</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">57.1%</div>
                    <p className="text-xs text-green-600">+4.2% so với tháng trước</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Doanh thu theo loại xét nghiệm</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={testTypePerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="testType" />
                      <YAxis />
                      <Bar dataKey="total" fill="#0891b2" name="Doanh thu (triệu VND)" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Xuất báo cáo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Xuất Excel
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Xuất PDF
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Lên lịch gửi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
