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
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

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

import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

// Import Component Date Format
import dateFormat from 'src/components/date/dateFormat'

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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: `Report_Appointment${Date.now()}`,
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  )
}

const Ledger = () => {
  const [visible, setVisible] = useState(false)

  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const [showTable, setShowTable] = useState(false)
  const [dataAppointment, setdataAppointment] = useState([])

  const [updateData, setUpdateData] = useState(false)

  // Fetch Data
  useEffect(() => {
    const fetdata = async () => {
      let dateNow = dateFormat('dateFormat', 'yyyy-MM-dd')

      await fetch(
        `http://localhost:3001/report/getAppointment?dateStart=${
          dateStart === '' ? dateNow : dateStart
        }&dateEnd=${dateEnd === '' ? dateNow : dateEnd}`,
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setdataAppointment(data.data)
          setShowTable(true)
        })
    }
    fetdata()
  }, [updateData])

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
      // renderCell: (params) => {
      //   let status = params.row.status
      //   let statusName = dataStatus
      //     .filter((item) => {
      //       if (item.status_id === status) {
      //         return item.name
      //       }
      //     })
      //     .map((item) => item.name)
      //   return statusName[0]
      // },
    },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol sm="auto">
                <TextField
                  id="date"
                  label="Date Start"
                  type="date"
                  defaultValue={dateFormat('dateFormat', 'yyyy-MM-dd')}
                  onChange={(e) => {
                    setDateStart(e.target.value)
                  }}
                  sx={{ width: 180 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CCol>
              <CCol sm="auto">
                <TextField
                  id="date"
                  label="Date End"
                  type="date"
                  defaultValue={dateFormat('dateFormat', 'yyyy-MM-dd')}
                  onChange={(e) => {
                    setDateEnd(e.target.value)
                  }}
                  sx={{ width: 180 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CCol>
              <CCol sm="auto">
                <CButton
                  onClick={() => {
                    console.log('Click')
                    setUpdateData(!updateData)
                  }}
                  color="success"
                  shape="rounded-pill"
                  size="lg"
                >
                  Select Date
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
          <CContainer style={{ height: 450, width: '100%' }}>
            <DataGrid
              rows={dataAppointment}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="mt-2"
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </CContainer>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Ledger
