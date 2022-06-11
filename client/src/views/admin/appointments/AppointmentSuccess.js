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
  CFormTextarea,
} from '@coreui/react'

import {
  cilPeople,
  cilUserFollow,
  cilBasket,
  cilChartPie,
  cilSpeedometer,
  cilSpeech,
  cilPrint,
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
import ReceiptIcon from '@mui/icons-material/Receipt'
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
          fileName: `Appointment_Success${Date.now()}`,
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  )
}

const Appointment = () => {
  // Data API
  const [dataAppointment, setDataAppointment] = useState([])
  const [dataStatus, setDataStatus] = useState([])

  // State Show Table
  const [showTable, setShowTable] = useState(false)

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      await fetch('http://localhost:3001/appointment/getSuccess')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
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
          console.log(data)
          setDataStatus(data.data)
        })
    }
    fetdata()
  }, [])

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
        let status = params.row.status
        console.log(status)
        if (status === '3') {
          return ''
        } else {
          return (
            <Box sx={{ '& button': { m: 1 } }}>
              <Button
                variant="contained"
                size="small"
                color="warning"
                startIcon={<ReceiptIcon />}
                onClick={() => {
                  window.open(`/#/bill?ap=${params.row.ap_code}`, '_blank')
                }}
              >
                Bill Payment
              </Button>
            </Box>
          )
        }
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
        </CCardBody>
      </CCard>
    </>
  )
}

export default Appointment
