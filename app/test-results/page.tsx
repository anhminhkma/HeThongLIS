"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TestTube, ArrowLeft, Save, Printer, FileText, Search } from "lucide-react"
import Link from "next/link"

// Sample test results data
const testResults = [
  {
    id: 1,
    testName: "Escherichia coli",
    mic: "",
    micUnit: "S",
    micValue: "I",
    micRange: "R",
    resistance: "Phân giải",
    minValue: "",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
  },
  {
    id: 2,
    testName: "Amikacin",
    mic: "",
    micUnit: "S",
    micValue: "24",
    micRange: "S",
    resistance: "14",
    minValue: "17",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
  },
  {
    id: 3,
    testName: "Cefoperazone",
    mic: "",
    micUnit: "S",
    micValue: "26",
    micRange: "S",
    resistance: "15",
    minValue: "21",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
  },
  {
    id: 4,
    testName: "Cefotaxime",
    mic: "",
    micUnit: "S",
    micValue: "30",
    micRange: "S",
    resistance: "22",
    minValue: "26",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
  },
  {
    id: 5,
    testName: "Meropenem",
    mic: "",
    micUnit: "S",
    micValue: "30",
    micRange: "S",
    resistance: "19",
    minValue: "23",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
  },
  {
    id: 6,
    testName: "Tetracyclin/Clavulanic acid",
    mic: "",
    micUnit: "S",
    micValue: "30",
    micRange: "S",
    resistance: "14",
    minValue: "20",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
  },
  {
    id: 7,
    testName: "Amoxicillin/Clavulanic Acid",
    mic: "16",
    micUnit: "",
    micValue: "",
    micRange: "",
    resistance: "",
    minValue: "",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: true,
  },
  {
    id: 8,
    testName: "Ampicillin",
    mic: "> 32",
    micUnit: "",
    micValue: "",
    micRange: "",
    resistance: "",
    minValue: "",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: true,
  },
  {
    id: 9,
    testName: "Ampicillin/Sulbactam",
    mic: "> 32",
    micUnit: "",
    micValue: "",
    micRange: "",
    resistance: "",
    minValue: "",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: true,
  },
  {
    id: 10,
    testName: "Cefazolin",
    mic: "< 4",
    micUnit: "",
    micValue: "",
    micRange: "",
    resistance: "",
    minValue: "",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
  },
  {
    id: 11,
    testName: "Cefepime",
    mic: "< 1",
    micUnit: "",
    micValue: "",
    micRange: "",
    resistance: "",
    minValue: "",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
  },
  {
    id: 12,
    testName: "Ceftazidime",
    mic: "< 1",
    micUnit: "",
    micValue: "",
    micRange: "",
    resistance: "",
    minValue: "",
    maxValue: "",
    resultTime: "19/08/2024 - 10:46:49",
    approvalTime: "19/08/2024 - 10:46:49",
    technician: "BS. Phan Văn Trường",
    device: "",
    abnormal: false,
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
  testDate: "19/08/2024 - 14:44:45",
  sampleType: "BHYT",
}

export default function TestResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMethod, setFilterMethod] = useState("all")

  const filteredResults = testResults.filter((result) => {
    const matchesSearch = result.testName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý kết quả Kháng sinh đồ</h1>
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
                <div>{patientInfo.testDate}</div>
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

        {/* Test Request Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Yêu cầu: Vi khuẩn nuôi cấy và định danh phương pháp thông thường
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Mẫu vi khuẩn:</label>
                <Select defaultValue="chon">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chon">Chọn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Vi khuẩn:</label>
                <Select defaultValue="chon">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chon">Chọn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phương pháp XN:</label>
                <Select defaultValue="chon">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chon">Chọn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-cyan-600 hover:bg-cyan-700">Thêm</Button>
          </CardContent>
        </Card>

        {/* Test Results Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Bảng kết quả:</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Tìm kiếm
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
                    <TableHead className="font-semibold">Tên kháng sinh đồ</TableHead>
                    <TableHead className="font-semibold text-center">MIC (mg/ml)</TableHead>
                    <TableHead className="font-semibold text-center">S</TableHead>
                    <TableHead className="font-semibold text-center">I</TableHead>
                    <TableHead className="font-semibold text-center">R</TableHead>
                    <TableHead className="font-semibold text-center">MIC Đường</TableHead>
                    <TableHead className="font-semibold text-center">Phân giải</TableHead>
                    <TableHead className="font-semibold text-center">Hồng độ</TableHead>
                    <TableHead className="font-semibold text-center">Min</TableHead>
                    <TableHead className="font-semibold text-center">Max</TableHead>
                    <TableHead className="font-semibold text-center">Giờ nhận KQ</TableHead>
                    <TableHead className="font-semibold text-center">Thời gian duyệt</TableHead>
                    <TableHead className="font-semibold text-center">Người duyệt</TableHead>
                    <TableHead className="font-semibold text-center">Thiết bị</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id} className="hover:bg-gray-50">
                      <TableCell>
                        <input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell className="font-medium">
                        {result.testName}
                        {result.abnormal && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Bất thường
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">{result.mic}</TableCell>
                      <TableCell className="text-center">{result.micUnit}</TableCell>
                      <TableCell className="text-center">{result.micValue}</TableCell>
                      <TableCell className="text-center">{result.micRange}</TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center">{result.resistance}</TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center">{result.minValue}</TableCell>
                      <TableCell className="text-center">{result.maxValue}</TableCell>
                      <TableCell className="text-center text-sm">{result.resultTime}</TableCell>
                      <TableCell className="text-center text-sm">{result.approvalTime}</TableCell>
                      <TableCell className="text-center text-sm">{result.technician}</TableCell>
                      <TableCell className="text-center">{result.device}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-start space-x-4 mt-6">
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Ký số
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Lưu
              </Button>
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
