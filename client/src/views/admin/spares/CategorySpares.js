import React, { useState, useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

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
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

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

const Dashboard = () => {
  // State Table
  const [showTable, setShowTable] = useState(false)

  // State Modal Form
  const [visibleFormAdd, setVisibleFormAdd] = useState(false)
  const [visibleFormView, setVisibleFormView] = useState(false)
  const [visibleFormEdit, setVisibleFormEdit] = useState(false)
  const [visibleFormDelete, setVisibleFormDelete] = useState(false)

  // State Validate Form Add Category
  const [validated, setValidated] = useState(false)

  // State Input Form
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryCode, setCategoryCode] = useState('')
  const [remark, setRemark] = useState('')

  // Get Data Category
  const [dataCategory, setDataCategory] = useState([])

  // Get API Data
  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3001/category/getAll')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDataCategory(data.data)
          setShowTable(true)
        })
    }
    fetchData()
      // make sure to catch any error
      .catch(() => {
        alertComponent('error', `Server is Disable Please Try Again!`)
      })
  }, [visibleFormAdd, visibleFormEdit, visibleFormDelete])

  // Send Data Add Category To Server
  const handleSubmitAdd = (event) => {
    event.preventDefault()
    event.stopPropagation()
    // setValidated(false)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      let playLoad = {
        categoryName: categoryName,
        categoryCode: categoryCode,
        remark: remark,
        created: dateFormat('dateFormat', 'yyyy-MM-dd HH:mm:ss'),
        updated: dateFormat('dateFormat', 'yyyy-MM-dd HH:mm:ss'),
      }

      console.log(playLoad)

      let checkDuplicate = dataCategory.filter((item) => item.categoryCode === categoryCode)

      if (checkDuplicate.length > 0) {
        alertComponent('error', `Category Spares Code is Dulplicate!`)
      } else {
        Axios.post('http://localhost:3001/category/add', playLoad)
          .then((result) => {
            if (result.status === 200) {
              alertComponent('success', `Add ${categoryName} Successfully!`)
              setVisibleFormAdd(false)
            }
          })
          .catch((error) => {
            alertComponent('error', `Can't Add ${categoryName} Please Try Again!`)
          })
      }
    }

    setValidated(true)
  }

  // Send Edit Data Add Category To Server
  const handleSubmitEdit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      let playLoad = {
        categoryId: categoryId,
        categoryName: categoryName,
        categoryCode: categoryCode,
        remark: remark,
        updated: dateFormat('dateFormat', 'yyyy-MM-dd HH:mm:ss'),
      }

      console.log(playLoad)

      Axios.put('http://localhost:3001/category/Edit', playLoad)
        .then((result) => {
          if (result.status === 200) {
            alertComponent('success', `Edit ${categoryName} Successfully!`)
            setVisibleFormEdit(false)
          }
        })
        .catch((error) => {
          alertComponent('error', `Can't Edit ${categoryName} Please Try Again!`)
        })
    }

    setValidated(true)
  }

  // Add Data To Modal
  const sendDataToModalView = (data) => {
    console.log(data)
    setValidated(false)
    setCategoryId(data.id)
    setCategoryName(data.categoryName)
    setCategoryCode(data.categoryCode)
    setRemark(data.remark)
    setVisibleFormView(true)
  }

  const sendDataToModalEdit = (data) => {
    setValidated(false)
    console.log(data)
    setCategoryId(data.id)
    setCategoryName(data.categoryName)
    setCategoryCode(data.categoryCode)
    setRemark(data.remark)
    setVisibleFormEdit(true)
  }

  const setValueEmpty = () => {
    setValidated(false)
    setCategoryId('')
    setCategoryName('')
    setCategoryCode('')
    setRemark('')
  }

  // Delete Data
  const deleteData = (data) => {
    setVisibleFormDelete(false)
    Swal.fire({
      title: 'Are you sure?',
      text: `คุณต้องการลบ หมวดหมู่ ${data.categoryName}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `ใช้, ต้องการลบ!`,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/category/delete/${data.id}`)
          .then((result) => {
            if (result.status === 200) {
              setVisibleFormDelete(true)
              alertComponent('success', `Delete ${data.categoryName} Successfully!`)
            }
          })
          .catch(() => {
            alertComponent('error', `Can't Delete ${data.categoryName} Please Try Again!`)
          })
      }
    })
  }

  const columns = [
    { field: 'index', headerName: '#', width: 60 },
    { field: 'categoryName', headerName: 'Category Name', width: 250 },
    { field: 'categoryCode', headerName: 'Category Code', width: 300 },
    { field: 'remark', headerName: 'Remark', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: '100%',
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
              startIcon={<EditOutlinedIcon />}
              onClick={() => {
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
                deleteData(params.row)
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

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CButton
            color="info"
            onClick={() => {
              setValueEmpty()
              setVisibleFormAdd(!visibleFormAdd)
            }}
            className="float-end"
          >
            Add Category
          </CButton>
          <br /> <br />
          <CContainer style={{ height: 450, width: '100%' }}>
            {showTable && (
              <>
                <DataGrid
                  rows={dataCategory}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick
                  rowsPerPageOptions={[5]}
                  className="mt-2"
                />
              </>
            )}
          </CContainer>
          {/* Form Add Category */}
          <CModal scrollable visible={visibleFormAdd} onClose={() => setVisibleFormAdd(false)}>
            <CModalHeader>
              <CModalTitle>Add Category Spares</CModalTitle>
            </CModalHeader>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmitAdd}
            >
              <CModalBody className="row g-3 ">
                {/* <CCol md={12}>
                  <CFormSwitch label="Status" id="switchStatus" defaultChecked />
                </CCol> */}
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="CategoryName"
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    feedbackInvalid="Please provide a valid Category Name."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>

                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="categoryCode"
                    label="Category Code"
                    value={categoryCode}
                    onChange={(e) => setCategoryCode(e.target.value)}
                    feedbackInvalid="Please provide a valid Category Code."
                    feedbackValid="Look Good!"
                    required
                  />
                </CCol>

                <CCol md={12}>
                  <CFormInput
                    type="text"
                    id="remark"
                    label="Remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    feedbackValid="Looks good!"
                  />
                </CCol>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleFormAdd(false)}>
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CModalFooter>
            </CForm>
          </CModal>
          {/* Form View Category */}
          <CModal scrollable visible={visibleFormView} onClose={() => setVisibleFormView(false)}>
            <CModalHeader>
              <CModalTitle>View Category Spares</CModalTitle>
            </CModalHeader>
            <CForm className="needs-validation">
              <CModalBody className="row g-3 ">
                {/* <CCol md={12}>
                  <CFormSwitch label="Status" id="switchStatus" defaultChecked />
                </CCol> */}
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    feedbackValid="Looks good!"
                    id="CategoryName"
                    label="Category Name"
                    value={categoryName}
                    readOnly
                  />
                </CCol>

                <CCol md={6}>
                  <CFormInput
                    type="text"
                    feedbackValid="Looks good!"
                    id="categoryCode"
                    label="Category Code"
                    value={categoryCode}
                    readOnly
                  />
                </CCol>

                <CCol md={12}>
                  <CFormInput
                    type="text"
                    feedbackValid="Looks good!"
                    id="remark"
                    label="Remark"
                    value={remark}
                    readOnly
                  />
                </CCol>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleFormView(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CForm>
          </CModal>
          {/* Form Edit Category */}
          <CModal scrollable visible={visibleFormEdit} onClose={() => setVisibleFormEdit(false)}>
            <CModalHeader>
              <CModalTitle>Edit Category Spares</CModalTitle>
            </CModalHeader>
            <CForm
              className="needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmitEdit}
            >
              <CModalBody className="row g-3 ">
                {/* <CCol md={12}>
                  <CFormSwitch label="Status" id="switchStatus" defaultChecked />
                </CCol> */}
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="CategoryName"
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    feedbackValid="Looks good!"
                    feedbackInvalid="Please provide a valid Category Name."
                    required
                  />
                </CCol>

                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="categoryCode"
                    label="Category Code"
                    value={categoryCode}
                    onChange={(e) => setCategoryCode(e.target.value)}
                    feedbackValid="Looks good!"
                    feedbackInvalid="Please provide a valid Category Code."
                    readOnly
                    required
                  />
                </CCol>

                <CCol md={12}>
                  <CFormInput
                    type="text"
                    feedbackValid="Looks good!"
                    id="remark"
                    label="Remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </CCol>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleFormEdit(false)}>
                  Close
                </CButton>
                <CButton color="success" type="submit">
                  Submit
                </CButton>
              </CModalFooter>
            </CForm>
          </CModal>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
