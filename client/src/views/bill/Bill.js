import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

import { useLocation } from 'react-router-dom'

// Import Component Date Format
import dateFormat from 'src/components/date/dateFormat'
import fomatPriceToThai from 'src/components/convertToThai/convertToThai'

const Bill = () => {
  const search = useLocation().search
  const apCode = new URLSearchParams(search).get('ap')

  const [appointmentCode, setAppointmentCode] = useState('')
  const [dateAppointment, setDateAppointment] = useState('')
  const [dateAppointmentSuccess, setDateAppointmentSucess] = useState('')
  const [tel, setTel] = useState('')
  const [license_plate, setLicense_plate] = useState('')
  const [brand_name, setBrand_name] = useState('')
  const [cuse_case, setCuse_case] = useState('')
  const [color, setColor] = useState('')
  const [fullName, setFullName] = useState('')
  const [remarkAppointment, setRemarkAppointment] = useState('')
  const [company, setCompany] = useState('')
  const [total_charge, setTotal_charge] = useState('')
  const [charge, setCharge] = useState('')
  const [appointmentItem, setAppointmentItem] = useState([])

  const [showBill, setShowBill] = useState(false)

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch(`http://localhost:3001/api/getDetailBill/${apCode}`)
        .then((res) => res.json())
        .then((result) => {
          let data = result.data
          let appointment = data.appointment[0]
          let appointmentDetail = data.appointmentDetail[0]

          if (appointment.length !== 0 && appointmentDetail.length !== 0) {
            setAppointmentCode(appointment.ap_code)
            setDateAppointment(new Date(appointment.date_appointment))
            setDateAppointmentSucess(appointment.updated)
            setTel(appointment.tel)
            setLicense_plate(appointment.license_plate)
            setBrand_name(appointment.brand_name)
            setCuse_case(appointment.cuse_case)
            setColor(appointment.color)
            setFullName(appointmentDetail.fullName)
            setRemarkAppointment(appointment.remarkAppointment)
            setTotal_charge(appointment.total_charge)
            setCharge(appointment.charge)
            setCompany(appointment.company)
            setAppointmentItem(appointmentDetail.appointmentDetail)

            setShowBill(true)
          }
        })
    }
    fetdata()
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-start">
      {showBill && (
        <CContainer style={{ border: '1px solid', marginTop: '20px' }}>
          <br />
          <CRow className="justify-content-center">
            <h1 className="justify-content-center" style={{ display: 'flex' }}>
              BILL PAYMENT
            </h1>
          </CRow>
          <br />
          <CContainer>
            <CRow xs={{ gutter: 2 }}>
              <CCol xs={{ span: 6 }}>
                <div className="p-3 border bg-light">
                  <p>
                    <b>ร้าน Phet Garage</b>
                  </p>
                  <p>
                    <b>เบอร์โทร</b> 0882889838
                  </p>
                  <p>
                    <b>ที่อยู่</b>&nbsp;&nbsp;&nbsp; 355/115-116 หมู่ 15 ถ.พหลโยธิน ต.คูคต อ.ลำลูกกา
                    จ.ปทุมธานี 12130
                  </p>
                </div>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <div className="p-3 border bg-light">
                  <CContainer>
                    <div className="row justify-content-md-end">
                      <CCol xs lg={8}>
                        <b>หมายเลขการจอง</b> {appointmentCode}
                      </CCol>
                    </div>
                    <div className="row justify-content-md-end">
                      <CCol xs lg={8}>
                        <b>วันที่ซ่อม</b> {new Date(dateAppointment).toDateString()}
                      </CCol>
                    </div>
                    <div className="row justify-content-md-end">
                      <CCol xs lg={8}>
                        <b>วันที่ซ่อมสำเร็จ</b> {dateAppointmentSuccess}
                      </CCol>
                    </div>
                  </CContainer>
                </div>
              </CCol>

              <CCol xs={{ span: 6 }}>
                <div className="p-3 border bg-light">
                  <p>
                    <b>ข้อมูลลูกค้า</b>
                  </p>
                  <p>
                    <b>บริษัท</b> {company}
                  </p>
                  <p>
                    <b>คุณ</b> {fullName}
                  </p>
                  <p>
                    <b>เบอร์โทร</b> {tel}
                  </p>
                  {/* <p>
                    <b>ที่อยู่</b>&nbsp;&nbsp;&nbsp; 355/115-116 หมู่ 15 ถ.พหลโยธิน ต.คูคต อ.ลำลูกกา
                    จ.ปทุมธานี 12130
                  </p> */}
                </div>
              </CCol>

              <CCol xs={{ span: 6 }}>
                <div className="p-3 border bg-light">
                  <b>ข้อมูลรถเเละรายละเอียดการซ่อม</b>
                  <CContainer>
                    <br />
                    <CRow>
                      <CCol>
                        <b>ยี่ห้อรถ</b>&nbsp;{brand_name}
                      </CCol>
                      <CCol>
                        <b>ทะเบียนรถ</b>&nbsp;&nbsp;{license_plate}
                      </CCol>
                      <CCol>
                        <b>สี</b>&nbsp;&nbsp;{color}
                      </CCol>
                    </CRow>
                  </CContainer>
                </div>
                <div className="p-3 border bg-light">
                  <CContainer>
                    <CRow>
                      <CCol>
                        <b>อาการ</b>&nbsp;&nbsp;{cuse_case}
                      </CCol>
                    </CRow>
                  </CContainer>
                </div>
              </CCol>

              <CCol xs={{ span: 12 }}>
                <div className="p-3 border bg-light">
                  <p>
                    <b>หมายเหตุจากทางร้าน</b>&nbsp;&nbsp;&nbsp;&nbsp; {remarkAppointment}
                  </p>
                </div>
              </CCol>
              <hr />

              <CCol xs={{ span: 12 }} style={{ textAlign: 'center' }}>
                <div className="p-3 border bg-light">
                  <p>
                    <b>รายการการซ่อม</b>
                  </p>
                  <CTable bordered>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">อะไหล่</CTableHeaderCell>
                        <CTableHeaderCell scope="col">จำนวน</CTableHeaderCell>
                        <CTableHeaderCell scope="col">หน่วย</CTableHeaderCell>
                        <CTableHeaderCell scope="col">ราคาสุทธิ</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {appointmentItem.map((item, index) => {
                        return (
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{item.spares}</CTableDataCell>
                            <CTableDataCell>{item.quantity}</CTableDataCell>
                            <CTableDataCell>{item.unitItem}</CTableDataCell>
                            <CTableDataCell>{item.price * item.quantity}</CTableDataCell>
                          </CTableRow>
                        )
                      })}
                      <CTableRow>
                        <CTableDataCell colSpan={3}></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell>
                          <b>ค่าดำเนินการซ่อม</b> {charge} บาท
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan={3}></CTableDataCell>
                        <CTableDataCell>
                          {fomatPriceToThai.ThaiNumberToText(total_charge.toString())}
                        </CTableDataCell>
                        <CTableDataCell>
                          <b>รวมราคาสุทธิ</b> {total_charge} บาทถ้วน
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </div>
              </CCol>
            </CRow>
          </CContainer>
        </CContainer>
      )}
    </div>
  )
}

export default Bill
