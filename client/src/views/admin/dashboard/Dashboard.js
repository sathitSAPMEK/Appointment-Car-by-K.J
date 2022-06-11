import React, { useState, useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ModalImage from 'react-modal-image'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CWidgetStatsC,
  CTableRow,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
  CFormSwitch,
  CFormTextarea,
} from '@coreui/react'

import { CModalHeader, CModal, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'

import {
  cilPeople,
  cilUserFollow,
  cilBasket,
  cilChartPie,
  cilSpeedometer,
  cilSpeech,
  cilClipboard,
  cilDiamond,
  cilTask,
  cilTruck,
  cilDollar,
} from '@coreui/icons'

// Import Mui Style
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
// Import Mui Style
import Box from '@mui/material/Box'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import UpdateIcon from '@mui/icons-material/Update'

// Import CoreUI
import { CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'

// Import Calendar
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

// Import Date-fns
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import { useSelector, useDispatch } from 'react-redux'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// const myEventsList = [
//   {
//     id: 0,
//     title: 'test',
//     allDay: true,
//     start: new Date('Tue May 24 2022 12:00:00 GMT+0700 (Indochina Time)'),
//     end: new Date('Tue May 24 2022 12:00:00 GMT+0700 (Indochina Time)'),
//   },
//   {
//     id: 1,
//     title: 'Long Event',
//     allDay: true,
//     start: new Date('Tue May 24 2022 13:00:13 GMT+0700 (Indochina Time)'),
//     end: new Date('Tue May 24 2022 13:00:13 GMT+0700 (Indochina Time)'),
//   },

//   {
//     id: 2,
//     title: 'DTS STARTS',
//     allDay: true,
//     start: new Date('Tue May 24 2022 14:00:13 GMT+0700 (Indochina Time)'),
//     end: new Date('Tue May 24 2022 14:00:13 GMT+0700 (Indochina Time)'),
//   },
// ]

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: '100%',
    renderCell: (params) => {
      return (
        <div>
          <Button variant="contained" startIcon={<RemoveRedEyeOutlinedIcon />}>
            View
          </Button>
          <Button variant="contained" startIcon={<EditOutlinedIcon />}>
            Edit
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </div>
      )
    },
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

const Dashboard = () => {
  const [dataAppointmentEvent, setDataAppointmentEvent] = useState([])
  const [dataAppointment, setDataAppointment] = useState([])
  const [showTable, setShowTable] = useState([])

  const [visibleFormView, setVisibleFormView] = useState(false)

  const [dataStatus, setDataStatus] = useState([])
  const [summary, setSummary] = useState([])

  // State Data Form
  const [id, setId] = useState('')
  const [ap_code, setAp_code] = useState('')
  const [imageCauseView, setImageCauseView] = useState([])
  const [imageCause, setImageCause] = useState([])
  const [valueDate, setValueDate] = useState(new Date())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [tel, setTel] = useState('')
  const [brand_name, setBrand_name] = useState('')
  const [license_plate, setLicense_plate] = useState('')
  const [color, setColor] = useState('')
  const [cuse_case, setCuse_case] = useState('')
  const [remark, setRemark] = useState('')

  const dataStore = useSelector((state) => state.userData)

  console.log(dataStore)

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch('http://localhost:3001/appointment/getAppointment')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDataAppointmentEvent(data.data)
          setShowTable(true)
        })
    }
    fetdata()
  }, [])

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch(`http://localhost:3001/appointment/summaryDashboard`)
        .then((res) => res.json())
        .then((data) => {
          setSummary(data.data)
        })
    }
    fetdata()
  }, [])

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch('http://localhost:3001/appointment/getAll')
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setDataAppointment(data.data)
          setShowTable(true)
        })
    }
    fetdata()
  }, [])

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch('http://localhost:3001/api/getStatus')
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setDataStatus(data.data)
          setShowTable(true)
        })
    }
    fetdata()
  }, [])

  // Update State Form to Empty
  const setValueEmpty = () => {
    setAp_code('')
    setImageCause([])
    setValueDate(new Date())
    setFirstName('')
    setLastName('')
    setTel('')
    setBrand_name('')
    setLicense_plate('')
    setColor('')
    setCuse_case('')
    setRemark('')
  }

  // Add Data To Modal
  const sendDataToModalView = (data) => {
    console.log(data)
    let {
      ap_code,
      brand_name,
      color,
      created,
      cuse_case,
      first_name,
      id,
      index,
      last_name,
      license_plate,
      linkImage,
      remark,
      repair_status,
      status,
      tel,
      updated,
      user_id,
      date_appointment,
    } = data
    setValueEmpty()
    setVisibleFormView(true)
    setAp_code(ap_code)
    setImageCauseView(linkImage)
    setValueDate(date_appointment)
    setFirstName(first_name)
    setLastName(last_name)
    setTel(tel)
    setBrand_name(brand_name)
    setLicense_plate(license_plate)
    setColor(color)
    setCuse_case(cuse_case)
    setRemark(remark)
  }

  const columns = [
    { field: 'index', headerName: '#', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    {
      field: 'tel',
      headerName: 'Telephone',
      type: 'text',
      width: 120,
    },
    {
      field: 'cuse_case',
      headerName: 'Cause',
      type: 'text',
      width: 160,
    },
    {
      field: 'updated',
      headerName: 'Last Update',
      type: 'text',
      width: 160,
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'text',
      width: 160,
      renderCell: (params) => {
        let status = params.row.status
        let statusName = dataStatus
          .filter((item) => {
            if (item.status_id === status) {
              return item.name
            }
          })
          .map((item) => item.name)
        return statusName[0]
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 400,
      renderCell: (params) => {
        // console.log(params.row.id)
        return (
          <Box sx={{ '& button': { m: 1 } }}>
            <Button
              variant="contained"
              size="small"
              color="info"
              startIcon={<RemoveRedEyeOutlinedIcon />}
              onClick={() => {
                sendDataToModalView(params.row)
              }}
            >
              View
            </Button>
            {/* <Button
              variant="contained"
              size="small"
              color="warning"
              startIcon={<UpdateIcon />}
              onClick={async () => {
                await updateStatus(params.row)
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => {
                // confirmAppointment(params.row)
                setVisibleFormConfirmAppointment(true)
              }}
              startIcon={<CheckIcon />}
            >
              Confirm
            </Button> */}
          </Box>
        )
      },
    },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={6} md={3}>
              <CWidgetStatsC
                color="info"
                icon={<CIcon icon={cilDiamond} height={36} />}
                value={summary.total === 0 ? '0' : summary.total}
                title="การจองทั้งหมด"
                inverse
                progress={{ value: summary.total }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={3}>
              <CWidgetStatsC
                color="warning"
                icon={<CIcon icon={cilTruck} height={36} />}
                value={summary.countFix === 0 ? '0' : summary.countFix}
                title="ดำเนินการซ่อม"
                inverse
                progress={{ value: summary.countFix }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={3}>
              <CWidgetStatsC
                color="success"
                icon={<CIcon icon={cilTask} height={36} />}
                value={summary.countSuccess === 0 ? '0' : summary.countSuccess}
                title="สำเร็จ"
                inverse
                progress={{ value: summary.countSuccess }}
                className="mb-4"
              />
            </CCol>
            <CCol sm={6} md={3}>
              <CWidgetStatsC
                color="primary"
                icon={<CIcon icon={cilDollar} height={36} />}
                value={summary.totalCharge + 'บาท'}
                title="รายได้ทั้งหมด"
                inverse
                progress={{ value: summary.totalCharge }}
                className="mb-4"
              />
            </CCol>
          </CRow>
        </CCardBody>

        <CContainer lg>
          <div>
            <Calendar
              localizer={localizer}
              events={dataAppointmentEvent.map((item) => {
                return { start: new Date(item.start), end: new Date(item.end), title: item.title }
              })}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </div>
        </CContainer>

        <CContainer style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={dataAppointment}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            rowsPerPageOptions={[5]}
            className="mt-2"
          />
        </CContainer>
        {/* Modal View Appointment */}
        <CModal
          scrollable
          visible={visibleFormView}
          size="lg"
          onClose={() => setVisibleFormView(false)}
        >
          <CModalHeader>
            <CModalTitle>View Appointment</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3 needs-validation">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  id="apointmentCode"
                  label="รหัสการซ่อม"
                  value={ap_code}
                  readOnly
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  id="dateView"
                  label="วันจองซ่อม"
                  value={format(new Date(valueDate), 'yyyy-MM-dd HH:mm:ss')}
                  readOnly
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  id="firstName"
                  label="ชื่อจริง"
                  value={firstName}
                  readOnly
                />
              </CCol>
              <CCol md={6}>
                <CFormInput type="text" id="lastName" label="นามสกุล" value={lastName} readOnly />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  id="tel"
                  label="เบอร์โทรศัพท์"
                  pattern="\d{3}[\-]\d{7}"
                  placeholder="รูปเเบบ xxx-xxxxxxx"
                  value={tel}
                  readOnly
                />
              </CCol>
              <CCol md={6}>
                <CFormInput id="bran_name" label="ยี่ห้อรถ" value={brand_name} readOnly />
              </CCol>
              <CCol md={6}>
                <CFormInput id="license_plate" label="ทะเบียนรถ" value={license_plate} readOnly />
              </CCol>
              <CCol md={6}>
                <CFormInput id="color" label="สี" value={color} readOnly />
              </CCol>
              <CCol md={6}>
                <CFormTextarea
                  id="cuse_case"
                  label="อาการ"
                  rows="3"
                  value={cuse_case}
                  readOnly
                ></CFormTextarea>
              </CCol>
              <CCol md={6}>
                <CFormTextarea
                  id="remark"
                  label="ข้อความส่งในเจ้าของอู่"
                  rows="3"
                  value={remark}
                  readOnly
                ></CFormTextarea>
              </CCol>
              <CCol md={12} style={{ border: '1px solid', padding: '8px' }}>
                <Box sx={{ width: '100%', height: '100%' }}>
                  <ImageList variant="masonry" cols={3} gap={8}>
                    {imageCauseView.map((item, index) => (
                      <ModalImage key={index} small={item} large={item} alt="รูปภาพประกอบ" />
                      // <ImageListItem key={index}>
                      //   <img
                      //     src={`${item}?w=248&fit=crop&auto=format`}
                      //     srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      //     alt={index}
                      //     loading="lazy"
                      //   />
                      // </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              </CCol>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleFormView(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      </CCard>
    </>
  )
}

export default Dashboard
