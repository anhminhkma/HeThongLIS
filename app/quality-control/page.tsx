"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TestTube, ArrowLeft, Search, CheckCircle, XCircle, AlertTriangle, BarChart3 } from "lucide-react"
import Link from "next/link"

// Quality control sample data
const qualityControlSamples = [
  {
    id: 1,
    sampleId: "ABXMTX120",
    sampleType: "Tổng phân tích kết bào máu",
    lot: "20072383",
    status: "passed",
    testDate: "19/08/2025",
    expiryDate: "19/08/2025",
    technician: "Peretra(DX120)",
    result: "5",
    unit: "3",
    controlType: "Ngoại kiểm",
    qcLevel: "Level 1",
  },
  {
    id: 2,
    sampleId: "ABXMTX120",
    sampleType: "Tổng phân tích kết bào máu",
    lot: "20072383",
    status: "passed",
    testDate: "19/08/2025",
    expiryDate: "19/08/2025",
    technician: "AU680",
    result: "5",
    unit: "3",
    controlType: "Ngoại kiểm",
    qcLevel: "Level 2",
  },
  {
    id: 3,
    sampleId: "AU680",
    sampleType: "Tổng phân tích kết bào máu",
    lot: "20072383",
    status: "failed",
    testDate: "19/08/2025",
    expiryDate: "19/08/2025",
    technician: "AU680",
    result: "5",
    unit: "3",
    controlType: "Nội kiểm",
    qcLevel: "Level 1",
  },
  {
    id: 4,
    sampleId: "AST-ST03",
    sampleType: "Mẫu lọc thận nhân tạo lọc",
    lot: "20072383",
    status: "pending",
    testDate: "19/08/2025",
    expiryDate: "19/08/2025",
    technician: "Manual",
    result: "1",
    unit: "1",
    controlType: "Nội kiểm",
    qcLevel: "Level 3",
  },
  {
    id: 5,
    sampleId: "O3004489190 PRECILEAN",
    sampleType: "Mẫu lọc thận nhân tạo lọc",
    lot: "20072383",
    status: "passed",
    testDate: "19/08/2025",
    expiryDate: "19/08/2025",
    technician: "Manual",
    result: "1",
    unit: "1",
    controlType: "Ngoại kiểm",
    qcLevel: "Level 2",
  },
  {
    id: 6,
    sampleId: "Mẫu lọc thận nhân tạo lọc",
    sampleType: "Mẫu lọc thận nhân tạo lọc",
    lot: "20072383",
    status: "passed",
    testDate: "19/08/2025",
    expiryDate: "19/08/2025",
    technician: "Manual",
    result: "1",
    unit: "1",
    controlType: "Nội kiểm",
    qcLevel: "Level 1",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "passed":
      return "bg-green-500"
    case "failed":
      return "bg-red-500"
    case "pending":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "passed":
      return "Đạt"
    case "failed":
      return "Không đạt"
    case "pending":
      return "Chờ kiểm tra"
    default:
      return "Không xác định"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "passed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "failed":
      return <XCircle className="h-4 w-4 text-red-600" />
    case "pending":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-600" />
  }
}

export default function QualityControlPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedDate, setSelectedDate] = useState("19/08/2024")
  const [qcDate, setQcDate] = useState("2024-08-19")

  const filteredSamples = qualityControlSamples.filter((sample) => {
    const matchesSearch =
      sample.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.sampleType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || sample.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const qcStats = {
    total: qualityControlSamples.length,
    passed: qualityControlSamples.filter((s) => s.status === "passed").length,
    failed: qualityControlSamples.filter((s) => s.status === "failed").length,
    pending: qualityControlSamples.filter((s) => s.status === "pending").length,
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Kiểm soát chất lượng</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* QC Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng số mẫu QC</CardTitle>
              <BarChart3 className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{qcStats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Mẫu đạt chuẩn</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{qcStats.passed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Mẫu không đạt</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{qcStats.failed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chờ kiểm tra</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{qcStats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quality Control Tabs */}
        <Tabs defaultValue="samples" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="samples">Mẫu kiểm soát chất lượng</TabsTrigger>
            <TabsTrigger value="statistics">Thống kê hoạt động</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo QC</TabsTrigger>
          </TabsList>

          <TabsContent value="samples">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Khai báo định mức hoá chất</CardTitle>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-600">Ngày:</label>
                      <Input type="date" value={qcDate} onChange={(e) => setQcDate(e.target.value)} className="w-40" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-600">Máy XN:</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Chọn</SelectItem>
                          <SelectItem value="au680">AU680</SelectItem>
                          <SelectItem value="dx120">DX120</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm mẫu QC..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Lọc theo trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="passed">Đạt chuẩn</SelectItem>
                      <SelectItem value="failed">Không đạt</SelectItem>
                      <SelectItem value="pending">Chờ kiểm tra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* QC Samples Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Tên hoá chất</TableHead>
                        <TableHead className="font-semibold">Số lượng</TableHead>
                        <TableHead className="font-semibold">Đơn vị</TableHead>
                        <TableHead className="font-semibold">Giá trị quy đổi</TableHead>
                        <TableHead className="font-semibold">Số lượng đổi</TableHead>
                        <TableHead className="font-semibold">Đơn vị nhỏ</TableHead>
                        <TableHead className="font-semibold">Dịch vụ</TableHead>
                        <TableHead className="font-semibold">Nguồn khác</TableHead>
                        <TableHead className="font-semibold">Nội kiểm</TableHead>
                        <TableHead className="font-semibold">Ngoại kiểm</TableHead>
                        <TableHead className="font-semibold">Cấp</TableHead>
                        <TableHead className="font-semibold">Khác</TableHead>
                        <TableHead className="font-semibold">Ngày thống kê</TableHead>
                        <TableHead className="font-semibold">Lock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSamples.map((sample) => (
                        <TableRow key={sample.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(sample.status)}
                              <div>
                                <div className="font-medium">{sample.sampleId}</div>
                                <div className="text-sm text-gray-600">{sample.sampleType}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{sample.lot}</TableCell>
                          <TableCell className="text-center">Tháng</TableCell>
                          <TableCell className="text-center">418</TableCell>
                          <TableCell className="text-center">13794</TableCell>
                          <TableCell className="text-center">1</TableCell>
                          <TableCell className="text-center">DY3829</TableCell>
                          <TableCell className="text-center">Tổng phân tích...</TableCell>
                          <TableCell className="text-center">20072383</TableCell>
                          <TableCell className="text-center">{sample.testDate}</TableCell>
                          <TableCell className="text-center">{sample.expiryDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                sample.status === "passed"
                                  ? "default"
                                  : sample.status === "failed"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {getStatusText(sample.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{sample.testDate}</TableCell>
                          <TableCell className="text-center">
                            <input type="checkbox" className="rounded" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-start space-x-4 mt-6">
                  <Button className="bg-cyan-600 hover:bg-cyan-700">Thêm mới</Button>
                  <Button variant="outline">Xuất Excel</Button>
                  <Button variant="outline">In báo cáo</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Thống kê hoạt động kiểm soát chất lượng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-semibold">Tỷ lệ đạt chuẩn theo tháng</h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Biểu đồ tỷ lệ đạt chuẩn</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-md font-semibold">Phân bố mẫu QC theo loại</h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Biểu đồ phân bố mẫu</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Báo cáo kiểm soát chất lượng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Từ ngày</label>
                      <Input type="date" defaultValue="2024-08-01" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Đến ngày</label>
                      <Input type="date" defaultValue="2024-08-31" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Loại báo cáo</label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Báo cáo hàng ngày</SelectItem>
                          <SelectItem value="weekly">Báo cáo hàng tuần</SelectItem>
                          <SelectItem value="monthly">Báo cáo hàng tháng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="bg-cyan-600 hover:bg-cyan-700">Tạo báo cáo</Button>
                    <Button variant="outline">Xuất PDF</Button>
                    <Button variant="outline">Gửi email</Button>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-md font-semibold mb-4">Báo cáo gần đây</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Báo cáo QC tháng 8/2024</div>
                          <div className="text-sm text-gray-600">Tạo ngày: 19/08/2024</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Tải xuống
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Báo cáo QC tuần 33/2024</div>
                          <div className="text-sm text-gray-600">Tạo ngày: 15/08/2024</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Tải xuống
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
