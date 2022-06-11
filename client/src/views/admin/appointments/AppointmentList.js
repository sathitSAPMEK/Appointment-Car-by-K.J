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

// Import Mui Style
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import UpdateIcon from '@mui/icons-material/Update'
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

// Import Modules Alert
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// Import Component Date Format
import dateFormat from 'src/components/date/dateFormat'

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: `Appointment${Date.now()}`,
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  )
}

const Appointment = () => {
  const [visibleFormView, setVisibleFormView] = useState(false)
  const [visibleFormConfirmAppointment, setVisibleFormConfirmAppointment] = useState(false)

  // State Update
  const [update, setUpdate] = useState(false)

  // Data API
  const [dataAppointment, setDataAppointment] = useState([])
  const [dataStatus, setDataStatus] = useState([])
  const [dataSpares, setDataSpares] = useState([])

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
  const [charge, setCharge] = useState(0)

  // Remark Confirm Appointment
  const [appointmentDetail, setAppointmentDetail] = useState('')

  // Confirm Appointment
  const [confrim, setConfirm] = useState(false)

  // State Show Table
  const [showTable, setShowTable] = useState(false)

  // State Validate Form Add Category
  const [validated, setValidated] = useState(false)

  // Send Edit Data Add Category To Server
  const handleSubmitEdit = (event) => {
    setValidated(false)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      setValidated(true)
      let playLoad = {
        id: id,
        ap_code: ap_code,
        firstName: firstName,
        lastName: lastName,
        listItemAppointment: listItemAppointment,
        appointmentDetail: appointmentDetail,
        charge: charge,
        created: dateFormat('dateFormat', 'yyyy-MM-dd HH:mm:ss'),
        updated: dateFormat('dateFormat', 'yyyy-MM-dd HH:mm:ss'),
      }

      console.log(playLoad)

      if (listItemAppointment.length === 0) {
        alertComponent('error', `กรุณาเพิ่มอะไหล่ในรายการบันทึกการซ่อม!`)
      } else {
        Axios.post('http://localhost:3001/appointment/addAppointment', playLoad)
          .then((result) => {
            if (result.status === 200) {
              setConfirm(!confrim)
              alertComponent('success', `Add Pointment ${ap_code} Successfully!`)
              setVisibleFormConfirmAppointment(false)
            }
          })
          .catch((error) => {
            alertComponent('error', `Can't Add Pointment ${ap_code} Please Try Again!`)
          })
      }
    }
  }

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch('http://localhost:3001/appointment/getList')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDataAppointment(data.data)
          setShowTable(true)
        })
    }
    fetdata()
  }, [update, confrim])

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
  }, [update, confrim])

  useEffect(() => {
    const fetdata = async () => {
      await fetch('http://localhost:3001/spares/getAll')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDataSpares(data.data)
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

  // Add Data To Modal Confirm
  const confirmAppointment = (data) => {
    let { ap_code, first_name, last_name, id } = data
    setValueEmpty()
    setAp_code(ap_code)
    setFirstName(first_name)
    setLastName(last_name)
    setId(id)
    setVisibleFormConfirmAppointment(true)
  }

  // Update Status
  const updateStatus = async (data) => {
    let setDataStatus = {}
    dataStatus
      .filter((item) => item.status_id !== '2')
      .map((item) => (setDataStatus[item.status_id] = item.name))
    console.log(setDataStatus)
    const { value: statusApointment } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: setDataStatus,
      inputPlaceholder: 'เลือกสถานะการซ่อม',
      showCancelButton: true,
    })

    if (statusApointment) {
      console.log(statusApointment)
      Axios.put(`http://localhost:3001/appointment/update/sataus`, {
        id: data.id,
        status: statusApointment,
      })
        .then((result) => {
          if (result.status === 200) {
            setUpdate(!update)
            alertComponent('success', `Update Status Successfully!`)
          }
        })
        .catch(() => {
          alertComponent('error', `Can't Status Please Try Again!`)
        })
      // Swal.fire(`You selected: ${statusApointment}`)
    }
  }

  const [listItemAppointment, setListItemAppointment] = useState([])

  const [genId, setGenId] = useState(1)
  const [itemSpares, setItemSpares] = useState('')
  const [itemSparesSKU, setItemSparesSKU] = useState('')
  const [priceItem, setPriceItem] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [unitItem, setUnitItem] = useState('')

  // Update Chrage Item Sapres
  const addChrageItemSpares = () => {
    let setData = {
      id: genId,
      spares: itemSpares,
      itemSparesSKU: itemSparesSKU,
      unitItem: unitItem,
      quantity: quantity,
      price: priceItem,
    }

    setListItemAppointment([setData, ...listItemAppointment])
    setGenId(genId + 1)
  }

  const removeChrageItemSpares = (id) => {
    let newDataChargeItem = listItemAppointment.filter((item) => item.id !== id)
    setListItemAppointment(newDataChargeItem)
  }

  const getSparesDetail = (sparesSKU) => {
    let detailSpares = dataSpares.filter((item) => item.sparesSKU === sparesSKU)
    if (detailSpares.length > 0) {
      setItemSpares(detailSpares[0].sparesName)
      setItemSparesSKU(detailSpares[0].sparesSKU)
      setUnitItem(detailSpares[0].unit)
      setPriceItem(detailSpares[0].price)
    }
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
            <Button
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
                confirmAppointment(params.row)
              }}
              startIcon={<CheckIcon />}
            >
              Confirm
            </Button>
          </Box>
        )
      },
    },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CContainer style={{ height: 500, width: '100%' }}>
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
          {/* Modal Charge Appointment */}
          <CModal
            scrollable
            visible={visibleFormConfirmAppointment}
            size="lg"
            onClose={() => setVisibleFormConfirmAppointment(false)}
          >
            <CModalHeader>
              <CModalTitle>บันทึกการซ่อมเเละค่าใช้จ่าย</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmitEdit}
              >
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
                    id="full-name"
                    label="ชื่อ-นามสกุล"
                    value={`${firstName} ${lastName}`}
                    readOnly
                  />
                </CCol>
                <hr />
                <h4>รายการอะไหล่</h4>
                <CCol md={3}>
                  <CFormSelect
                    label="อะไหล่"
                    aria-label="Default select example"
                    onChange={(e) => {
                      getSparesDetail(e.target.value)
                    }}
                  >
                    <option>Open this select menu</option>
                    {dataSpares.map((item, index) => {
                      return (
                        <option value={item.sparesSKU} key={index}>
                          {item.sparesName}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="number"
                    id="item-quantity"
                    label="จำนวน"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value)
                    }}
                    min={1}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput type="text" id="unitItem" label="หน่วย" value={unitItem} readOnly />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="text"
                    id="total-price"
                    label="ราคาต่อหน่วย"
                    value={priceItem}
                    readOnly
                  />
                </CCol>
                <CCol md={3}>
                  <Button
                    variant="contained"
                    size="medium"
                    color="info"
                    style={{ marginTop: '18%' }}
                    onClick={() => {
                      addChrageItemSpares()
                    }}
                    startIcon={<AddIcon />}
                  >
                    Add Spares
                  </Button>
                </CCol>
                <CCol md={12}>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">อะไหล่</CTableHeaderCell>
                        <CTableHeaderCell scope="col">จำนวน</CTableHeaderCell>
                        <CTableHeaderCell scope="col">หน่วย</CTableHeaderCell>
                        <CTableHeaderCell scope="col">ราคาสุทธิ</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {listItemAppointment.length > 0 &&
                        listItemAppointment.map((item, index) => {
                          return (
                            <CTableRow key={index}>
                              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                              <CTableDataCell>{item.spares}</CTableDataCell>
                              <CTableDataCell>{item.quantity}</CTableDataCell>
                              <CTableDataCell>{item.unitItem}</CTableDataCell>
                              <CTableDataCell>{item.price * item.quantity}</CTableDataCell>
                              <CTableDataCell>
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="error"
                                  onClick={() => {
                                    removeChrageItemSpares(item.id)
                                  }}
                                  startIcon={<DeleteOutlineIcon />}
                                >
                                  Remove
                                </Button>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })}
                    </CTableBody>
                  </CTable>
                </CCol>
                <CCol md={12}>
                  <div style={{ float: 'right' }}>
                    <CFormInput
                      type="number"
                      min={0}
                      id="charge"
                      label="ค่าดำเนินการซ่อม"
                      onChange={(e) => {
                        setCharge(e.target.value)
                      }}
                      value={charge}
                    />
                    <CFormInput
                      type="text"
                      id="total-price"
                      label="รวมราคาสุทธิ"
                      value={listItemAppointment.reduce((sumTotal, item) => {
                        let sumPrice = item.quantity * item.price
                        return sumTotal + sumPrice
                      }, 0)}
                      readOnly
                    />
                  </div>
                </CCol>
                <hr />
                <CCol md={12}>
                  <CFormTextarea
                    id="cuse_case"
                    label="รายละเอียดการซ่อม"
                    rows="3"
                    onChange={(e) => {
                      setAppointmentDetail(e.target.value)
                    }}
                    value={appointmentDetail}
                  ></CFormTextarea>
                </CCol>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => setVisibleFormConfirmAppointment(false)}
                  >
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
