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

import {
  cilPeople,
  cilUserFollow,
  cilBasket,
  cilChartPie,
  cilSpeedometer,
  cilSpeech,
} from '@coreui/icons'

import { CModalHeader, CModal, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
import cookie from 'react-cookies'

// Import Mui Style
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

// Import Date Fns
import { format } from 'date-fns'

// Import CoreUI
import { CContainer } from '@coreui/react'

// Import Axios
import Axios from 'axios'

// Import Alert Component
import alertComponent from 'src/components/alertSwal/alertComponent'
import MaterialUIPickers from 'src/components/datePicker/datePicker'

// Import Modules Alert
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// Import Component Date Format
import dateFormat from 'src/components/date/dateFormat'
import PreviewPicture from 'src/components/picture/previewPicture'

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: 'File Appointment',
          delimiter: ';',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  )
}

const Appointment = () => {
  const [visibleFormAdd, setVisibleFormAdd] = useState(false)
  const [visibleFormView, setVisibleFormView] = useState(false)
  const [visibleFormEdit, setVisibleFormEdit] = useState(false)
  const [visibleFormDelete, setVisibleFormDelete] = useState([])

  // Validate Form
  const [validated, setValidated] = useState(false)

  // Data API
  const [dataAppointment, setDataAppointment] = useState([])
  const [dataStatus, setDataStatus] = useState([])

  // State Table
  const [showTable, setShowTable] = useState(false)

  const [userName, setUserName] = useState(cookie.load('userId').userName)

  // Sate Data Form
  const [id, setId] = useState('')
  const [ap_code, setAp_code] = useState('')
  const [imageCauseView, setImageCauseView] = useState([])
  const [imageCause, setImageCause] = useState([])
  const [valueDate, setValueDate] = useState(new Date())
  const [firstName, setFirstName] = useState('')
  const [company, setCompany] = useState('')
  const [lastName, setLastName] = useState('')
  const [tel, setTel] = useState('')
  const [brand_name, setBrand_name] = useState('')
  const [license_plate, setLicense_plate] = useState('')
  const [color, setColor] = useState('')
  const [cuse_case, setCuse_case] = useState('')
  const [remark, setRemark] = useState('')

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch(`http://localhost:3001/appointment/getList/${userName}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDataAppointment(data.data)
          setShowTable(true)
        })
    }
    fetdata()
  }, [visibleFormAdd, visibleFormEdit, visibleFormDelete])

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch('http://localhost:3001/api/getStatus')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDataStatus(data.data)
          setShowTable(true)
        })
    }
    fetdata()
  }, [visibleFormAdd, visibleFormEdit, visibleFormDelete])

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
        let status = params.row.repair_status
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
                // setValueEmpty()
                sendDataToModalView(params.row)
              }}
            >
              View
            </Button>
            <Button
              variant="contained"
              size="small"
              color="warning"
              startIcon={<EditOutlinedIcon />}
              onClick={() => {
                setValidated(false)
                setValueEmpty()
                sendDataToModalEdit(params.row)
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                deleteData(params)
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        )
      },
    },
  ]

  // Update State Form to Empty
  const setValueEmpty = () => {
    setValidated(false)
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
    setCompany('')
    setRemark('')
  }

  // Send Data To API
  const handleSubmitAddAppointment = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()

      const formData = new FormData()

      for (let i = 0; i < imageCause.length; i++) {
        formData.append('profileImg', imageCause[i])
      }

      formData.append('user_id', userName)
      formData.append('ap_code', 'AP' + dateFormat('dateFormat', 'yyyyMMddHHmmss'))
      formData.append('date_appointment', valueDate)
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('tel', tel)
      formData.append('brand_name', brand_name)
      formData.append('license_plate', license_plate)
      formData.append('color', color)
      formData.append('cuse_case', cuse_case)
      formData.append('remark', remark)
      formData.append('status', 0)
      formData.append('repair_status', 0)
      formData.append('company', company)
      formData.append('created', dateFormat('dateFormat', 'yyyy-MM-dd HH:mm:ss'))
      formData.append('updated', dateFormat('dateFormat', 'yyyy-MM-dd HH:mm:ss'))

      Axios.post('http://localhost:3001/appointment/checkMaxAppointment', {
        dateAppointment: valueDate,
      })
        .then((result) => {
          let checkAppointment = result.data.data
          if (checkAppointment >= 3) {
            alertComponent('error', `คิวเต็มกรุณาเลือกวันใหม่ เพื่อทำการจองการซ่อม!`)
          } else {
            Axios.post('http://localhost:3001/appointment/add', formData)
              .then((result) => {
                console.log(result)
                if (result.status === 200) {
                  alertComponent('success', result.data.message)
                  setVisibleFormAdd(false)
                }
              })
              .catch((error) => {
                alertComponent('error', `Can't Add Please Try Again!`)
              })
          }
        })
        .catch((error) => {
          alertComponent('error', `Can't Add Please Try Again!`)
        })
    }

    setValidated(true)
  }

  // Send Data To API
  const handleSubmitEditAppointment = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()

      const playLoad = {
        id: id,
        user_id: userName,
        ap_code: `AP${dateFormat('dateFormat', 'yyyyMMddHHmmss')}`,
        date_appointment: valueDate,
        first_name: firstName,
        last_name: lastName,
        tel: tel,
        brand_name: brand_name,
        license_plate: license_plate,
        color: color,
        cuse_case: cuse_case,
        remark: remark,
        company: company,
        updated: dateFormat('dateFormat', 'yyyy-MM-dd HH:mm:ss'),
      }

      Axios.put('http://localhost:3001/appointment/edit', playLoad)
        .then((result) => {
          console.log(result)
          if (result.status === 200) {
            alertComponent('success', result.data.message)
            setVisibleFormEdit(false)
          }
        })
        .catch((error) => {
          alertComponent('error', `Can't Update Appointment Please Try Again!`)
        })
    }

    setValidated(true)
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
      company,
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
    setCompany(company)
    setRemark(remark)
  }

  // Add Data To Edit
  const sendDataToModalEdit = (data) => {
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
      company,
      date_appointment,
    } = data
    setValueEmpty()
    setId(id)
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
    setCompany(company)
    setVisibleFormEdit(true)
  }

  // Delete Data
  const deleteData = (data) => {
    setVisibleFormDelete(false)
    Swal.fire({
      title: 'Are you sure?',
      text: `คุณต้องการลบรหัสการซ่อม ${data.row.ap_code}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `ใช้, ต้องการลบ!`,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/appointment/delete/${data.row.id}`)
          .then((result) => {
            if (result.status === 200) {
              setVisibleFormDelete(true)
              alertComponent('success', `Delete ${data.row.ap_code} Successfully!`)
            }
          })
          .catch(() => {
            alertComponent('error', `Can't Delete ${data.row.ap_code} Please Try Again!`)
          })
      }
    })
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CButton
            color="info"
            onClick={() => {
              // setValueEmpty()
              setVisibleFormAdd(!visibleFormAdd)
            }}
            className="float-end"
          >
            Add Appointment
          </CButton>
          <br />
          <br />
          <CContainer style={{ height: 450, width: '400' }}>
            {showTable && (
              <DataGrid
                rows={dataAppointment}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                components={{
                  Toolbar: CustomToolbar,
                }}
                className="mt-2"
              />
            )}
          </CContainer>
          {/* Modal Add Appointment */}
          <CModal
            scrollable
            visible={visibleFormAdd}
            size="lg"
            onClose={() => setVisibleFormAdd(false)}
          >
            <CModalHeader>
              <CModalTitle>Add Appointment</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmitAddAppointment}
              >
                <CCol md={12}>
                  <MaterialUIPickers
                    setValueDate={setValueDate}
                    format={'DD/MM/YYYY HH:mm:ss'}
                    valueDate={valueDate}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    id="company"
                    label="ชื่อบริษัท"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid First Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="firstName"
                    label="ชื่อจริง"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid First Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="lastName"
                    label="นามสกุล"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Last Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="tel"
                    label="เบอร์โทรศัพท์"
                    pattern="\d{3}\d{7}"
                    placeholder="เบอร์โทรศัพท์ตัวเลขเท่านั้น"
                    value={tel}
                    onChange={(e) => {
                      setTel(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Telephone."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="bran_name"
                    label="ยี่ห้อรถ"
                    value={brand_name}
                    onChange={(e) => {
                      setBrand_name(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Band Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="license_plate"
                    label="ทะเบียนรถ"
                    value={license_plate}
                    onChange={(e) => {
                      setLicense_plate(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid License Plate."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="color"
                    label="สี"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Color."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormTextarea
                    id="cuse_case"
                    label="อาการ"
                    rows="3"
                    text="เช่นขับรถเเล้วมีเสียดังที่ห้องเครื่อง"
                    value={cuse_case}
                    onChange={(e) => {
                      setCuse_case(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Cuse Case."
                    feedbackValid="Look Good!"
                    required
                  ></CFormTextarea>
                </CCol>
                <CCol md={6}>
                  <CFormTextarea
                    id="remark"
                    label="ข้อความส่งในเจ้าของอู่"
                    rows="3"
                    value={remark}
                    onChange={(e) => {
                      setRemark(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Remark."
                    feedbackValid="Look Good!"
                  ></CFormTextarea>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="file"
                    id="image"
                    label="รูปภาพประกอบเพิ่มเติม (อัพโหลดได้ไม่เกิน 5 รูป)"
                    onChange={(e) => {
                      setImageCause(e.target.files)
                    }}
                    multiple
                    feedbackInvalid="Please Upload Image Cause."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisibleFormAdd(false)}>
                    Close
                  </CButton>
                  <CButton color="success" type="submit">
                    Submit
                  </CButton>
                </CModalFooter>
              </CForm>
            </CModalBody>
          </CModal>
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
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    id="apointmentCode"
                    label="รหัสการซ่อม"
                    value={ap_code}
                    readOnly
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput type="text" id="company" label="บริษัท" value={company} readOnly />
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
          {/* Modal Edit Apointment */}
          <CModal
            scrollable
            visible={visibleFormEdit}
            size="lg"
            onClose={() => setVisibleFormEdit(false)}
          >
            <CModalHeader>
              <CModalTitle>Edit Appointment</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmitEditAppointment}
              >
                <CCol md={12}>
                  <MaterialUIPickers setValueDate={setValueDate} valueDate={valueDate} />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    id="company"
                    label="บริษัท"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid First Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="firstName"
                    label="ชื่อจริง"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid First Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="lastName"
                    label="นามสกุล"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Last Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="tel"
                    label="เบอร์โทรศัพท์"
                    pattern="\d{3}\d{7}"
                    placeholder="รูปเเบบ xxx-xxxxxxx"
                    value={tel}
                    onChange={(e) => {
                      setTel(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Telephone."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="bran_name"
                    label="ยี่ห้อรถ"
                    value={brand_name}
                    onChange={(e) => {
                      setBrand_name(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Band Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="license_plate"
                    label="ทะเบียนรถ"
                    value={license_plate}
                    onChange={(e) => {
                      setLicense_plate(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid License Plate."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="color"
                    label="สี"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Color."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormTextarea
                    id="cuse_case"
                    label="อาการ"
                    rows="3"
                    text="เช่นขับรถเเล้วมีเสียดังที่ห้องเครื่อง"
                    value={cuse_case}
                    onChange={(e) => {
                      setCuse_case(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Cuse Case."
                    feedbackValid="Look Good!"
                    required
                  ></CFormTextarea>
                </CCol>
                <CCol md={6}>
                  <CFormTextarea
                    id="remark"
                    label="ข้อความส่งในเจ้าของอู่"
                    rows="3"
                    value={remark}
                    onChange={(e) => {
                      setRemark(e.target.value)
                    }}
                    feedbackInvalid="Please provide a valid Remark."
                    feedbackValid="Look Good!"
                  ></CFormTextarea>
                </CCol>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisibleFormEdit(false)}>
                    Close
                  </CButton>
                  <CButton color="success" type="submit">
                    Submit
                  </CButton>
                </CModalFooter>
              </CForm>
            </CModalBody>
          </CModal>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Appointment
