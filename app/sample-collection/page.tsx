"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TestTube, ArrowLeft, Calendar, Plus, Save, Printer } from "lucide-react"
import Link from "next/link"

// Sample collection data
const sampleCollections = [
  {
    id: 1,
    sampleId: "XN/HH00",
    testName: "Tổng phân tích tế bào máu ngoại vi (Bằng máy tự động)",
    result: "XN huyết học",
    status: "collected",
    collectionDate: "19/08/2024 - 13:50",
    sampleNumber: "240819000001",
  },
  {
    id: 2,
    sampleId: "XN/SH00",
    testName: "Vi khuẩn nuôi cấy và định danh phương pháp thông thường",
    result: "XN vi sinh",
    status: "collected",
    collectionDate: "19/08/2024 - 13:50",
    sampleNumber: "240819000001",
  },
  {
    id: 3,
    sampleId: "GP800",
    testName: "Sinh thái phách, cơ thần kinh và các vi dưỡng chất → GPR",
    result: "Giải phẫu bệnh",
    status: "collected",
    collectionDate: "19/08/2024 - 13:50",
    sampleNumber: "240819200001",
  },
  {
    id: 4,
    sampleId: "GP800",
    testName: "XN tế bào học tụy xương",
    result: "XN huyết học",
    status: "collected",
    collectionDate: "19/08/2024 - 13:50",
    sampleNumber: "240819300001",
  },
]

const patientInfo = {
  pid: "252904295",
  sid: "281123-10",
  name: "NGUYỄN VĂN AN",
  birthYear: "1990",
  gender: "Nam",
  phone: "097 578 8888",
  address: "Xã Cẩm Khê, Thị xã Phú Thọ",
  cccd: "252904295",
  doctor: "Mai Thị Phương",
  department: "HO - Cao huyết áp và cơ cần",
  collectionDate: "19/08/2024",
  collectionTime: "14:44:45",
  sampleType: "BHYT",
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "collected":
      return "bg-green-500"
    case "pending":
      return "bg-yellow-500"
    case "processing":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "collected":
      return "Đã lấy mẫu"
    case "pending":
      return "Chờ lấy mẫu"
    case "processing":
      return "Đang xử lý"
    default:
      return "Không xác định"
  }
}

export default function SampleCollectionPage() {
  const [selectedDate, setSelectedDate] = useState("19/08/2024")
  const [notes, setNotes] = useState("")

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
              <h1 className="text-2xl font-bold text-gray-900">Tiếp nhận bệnh phẩm</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Patient Information Card */}
        <Card className="mb-6">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-lg font-semibold text-gray-900">Thông tin bệnh nhân - Điều trị</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">PID:</span>
                <div className="font-semibold">{patientInfo.pid}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Quốc tịch:</span>
                <div>Việt Nam</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">SID:</span>
                <div className="font-semibold">{patientInfo.sid}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">G.Phòng:</span>
                <div>{patientInfo.department}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Mã tiếp nhận:</span>
                <div>{patientInfo.pid}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">SĐT:</span>
                <div>{patientInfo.phone}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Số phiếu:</span>
                <div>240819000001</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Người lấy mẫu:</span>
                <div>Nguyễn Ngọc Mai</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Họ tên:</span>
                <div className="font-semibold">{patientInfo.name}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Phòng khám 2</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Khoa Phòng:</span>
                <div>Khoa Xét nghiệm</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Thời gian lấy:</span>
                <div>
                  {patientInfo.collectionDate} - {patientInfo.collectionTime}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Năm sinh:</span>
                <div>{patientInfo.birthYear}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Địa chỉ:</span>
                <div>{patientInfo.address}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Chỉ định:</span>
                <div>{patientInfo.department}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Khoa Phòng:</span>
                <div>Khoa Xét nghiệm</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Giới tính:</span>
                <div>{patientInfo.gender}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Đối tượng:</span>
                <div>{patientInfo.sampleType}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Bác sĩ CD:</span>
                <div>{patientInfo.doctor}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Collection Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Thông tin lấy mẫu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Ngày tiếp nhận *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input type="date" value="2024-08-19" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Mã tiếp nhận *</label>
                <Input placeholder="Mã tiếp nhận" value="240819000001" readOnly className="bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Tên nhà cung cấp</label>
                <Input placeholder="Tên nhà cung cấp" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Dịch vụ</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xn-huyet-hoc">XN Huyết học</SelectItem>
                    <SelectItem value="xn-vi-sinh">XN Vi sinh</SelectItem>
                    <SelectItem value="giai-phau-benh">Giải phẫu bệnh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Người khác</label>
                <Input placeholder="Người khác" />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 mb-2 block">Ghi chú</label>
              <Textarea
                placeholder="Nhập ghi chú..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sample Collection List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Danh sách các chỉ định (5)</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm mẫu
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-8">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead className="font-semibold">Danh sách các chỉ định (5)</TableHead>
                    <TableHead className="font-semibold">Danh sách cần cấu (9)</TableHead>
                    <TableHead className="font-semibold">Danh sách loại mẫu (1)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleCollections.map((sample) => (
                    <TableRow key={sample.id} className="hover:bg-gray-50">
                      <TableCell>
                        <input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(sample.status)}`} />
                          <div>
                            <div className="font-medium">{sample.sampleId}</div>
                            <div className="text-sm text-gray-600">{sample.testName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {sample.result}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{sample.collectionDate}</div>
                          <div className="text-gray-600">{sample.sampleNumber}</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Collection Summary */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-gray-600">Nhận xét đại thể</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-gray-600">Nhận xét vi thể</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-gray-600">Chẩn đoán giải phẫu bệnh lý</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-gray-600">Sự phù hợp với chẩn đoán lâm sàng</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-start space-x-4 mt-6">
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Ký số
              </Button>
              <Button variant="outline">Lưu</Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                In
              </Button>
              <Button variant="outline">Hẹn trả kết quả</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
