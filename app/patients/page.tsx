"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TestTube, ArrowLeft, Phone, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

// Sample patient data
const patients = [
  {
    id: 1,
    stt: 1,
    sid: 10,
    pid: 10,
    name: "NGUYỄN VĂN AN",
    birthYear: 1990,
    status: "active",
    patientId: "252904295",
    phone: "097 578 8888",
    address: "Xã Cẩm Khê, Thị xã Phú Thọ",
    gender: "Nam",
    cccd: "252904295",
    doctor: "Mai Thị Phương",
    department: "Khoa Xét nghiệm",
    testDate: "19/08/2024 - 14:44:45",
  },
  {
    id: 2,
    stt: 2,
    sid: 8,
    pid: 8,
    name: "ĐẶNG NHƯ QUỲNH",
    birthYear: 2001,
    status: "pending",
    patientId: "252904296",
    phone: "098 123 4567",
    address: "Phường Đông Hải, TP Thanh Hóa",
    gender: "Nữ",
    cccd: "252904296",
    doctor: "Bs. Nguyễn Văn B",
    department: "Khoa Nội",
    testDate: "19/08/2024 - 15:30:22",
  },
  {
    id: 3,
    stt: 3,
    sid: 6,
    pid: 6,
    name: "ĐẶNG KIÊN",
    birthYear: 1994,
    status: "completed",
    patientId: "252904297",
    phone: "091 234 5678",
    address: "Quận Ba Đình, Hà Nội",
    gender: "Nam",
    cccd: "252904297",
    doctor: "Bs. Trần Thị C",
    department: "Khoa Ngoại",
    testDate: "19/08/2024 - 16:15:10",
  },
  {
    id: 4,
    stt: 4,
    sid: 5,
    pid: 5,
    name: "HOÀNG VĂN MINH",
    birthYear: 1988,
    status: "active",
    patientId: "252904298",
    phone: "092 345 6789",
    address: "Huyện Gia Lâm, Hà Nội",
    gender: "Nam",
    cccd: "252904298",
    doctor: "Bs. Lê Văn D",
    department: "Khoa Tim mạch",
    testDate: "19/08/2024 - 17:00:45",
  },
  {
    id: 5,
    stt: 5,
    sid: 11,
    pid: 4,
    name: "HOÀNG TUẤN",
    birthYear: 2000,
    status: "pending",
    patientId: "252904299",
    phone: "093 456 7890",
    address: "Quận Cầu Giấy, Hà Nội",
    gender: "Nam",
    cccd: "252904299",
    doctor: "Bs. Phạm Thị E",
    department: "Khoa Nhi",
    testDate: "19/08/2024 - 18:20:30",
  },
  {
    id: 6,
    stt: 6,
    sid: 14,
    pid: 3,
    name: "NGUYỄN VĂN THẢO",
    birthYear: 2003,
    status: "completed",
    patientId: "252904300",
    phone: "094 567 8901",
    address: "Huyện Đông Anh, Hà Nội",
    gender: "Nam",
    cccd: "252904300",
    doctor: "Bs. Hoàng Văn F",
    department: "Khoa Xét nghiệm",
    testDate: "19/08/2024 - 19:45:15",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-red-500"
    case "pending":
      return "bg-yellow-500"
    case "completed":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Chờ tiếp nhận"
    case "pending":
      return "Đã tiếp nhận"
    case "completed":
      return "Đã có kết quả"
    default:
      return "Không xác định"
  }
}

export default function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.patientId.includes(searchTerm)
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus
    return matchesSearch && matchesStatus
  })

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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý bệnh nhân</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Patient List Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm SID, PID, Tên bệnh nhân, Mã phiếu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Chờ tiếp nhận</SelectItem>
                  <SelectItem value="pending">Đã tiếp nhận</SelectItem>
                  <SelectItem value="completed">Đã có kết quả</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Patient List Header */}
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600">
              <div className="col-span-1">STT</div>
              <div className="col-span-2">SID</div>
              <div className="col-span-2">PID</div>
              <div className="col-span-5">Họ tên</div>
              <div className="col-span-2">Năm sinh</div>
            </div>
          </div>

          {/* Patient List */}
          <div className="flex-1 overflow-y-auto">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedPatient.id === patient.id ? "bg-blue-50 border-l-4 border-l-cyan-600" : ""
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)} mr-2`} />
                    <span className="text-sm">{patient.stt}</span>
                  </div>
                  <div className="col-span-2 text-sm">{patient.sid}</div>
                  <div className="col-span-2 text-sm">{patient.pid}</div>
                  <div className="col-span-5 text-sm font-medium">{patient.name}</div>
                  <div className="col-span-2 text-sm">{patient.birthYear}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              Tổng cộng: <span className="font-medium">{filteredPatients.length}</span> bệnh nhân
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Thông tin bệnh nhân - Chi tiết</span>
                <Badge variant="outline" className="text-sm">
                  {getStatusText(selectedPatient.status)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">PID:</label>
                    <div className="text-lg font-semibold">{selectedPatient.patientId}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Mã tiếp nhận:</label>
                    <div className="text-lg">{selectedPatient.patientId}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Họ tên:</label>
                    <div className="text-lg font-semibold">{selectedPatient.name}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Năm sinh:</label>
                    <div className="text-lg">{selectedPatient.birthYear}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">SID:</label>
                    <div className="text-lg">{selectedPatient.patientId.slice(-2)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Số phiếu:</label>
                    <div className="text-lg">{selectedPatient.patientId}00001</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Giới tính:</label>
                    <div className="text-lg">{selectedPatient.gender}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Quốc tịch:</label>
                    <div className="text-lg">Việt Nam</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-600">Số điện thoại:</label>
                        <div className="text-lg">{selectedPatient.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                      <div>
                        <label className="text-sm font-medium text-gray-600">Địa chỉ:</label>
                        <div className="text-lg">{selectedPatient.address}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">CCCD:</label>
                      <div className="text-lg">{selectedPatient.cccd}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Bác sĩ chỉ định:</label>
                      <div className="text-lg">{selectedPatient.doctor}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin y tế</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Khoa/Phòng:</label>
                    <div className="text-lg">{selectedPatient.department}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Thời gian tiếp nhận:</label>
                      <div className="text-lg">{selectedPatient.testDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6 flex space-x-4">
                <Button className="bg-cyan-600 hover:bg-cyan-700">Xem kết quả xét nghiệm</Button>
                <Button variant="outline">Chỉnh sửa thông tin</Button>
                <Button variant="outline">In phiếu</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
