import React, { useState } from 'react'
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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

const Ledger = () => {
  const [visible, setVisible] = useState(false)

  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

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
                  onClick={() => setVisible(!visible)}
                  color="success"
                  shape="rounded-pill"
                  size="lg"
                >
                  Select Date
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
          <CContainer style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
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
