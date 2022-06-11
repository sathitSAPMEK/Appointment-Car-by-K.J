import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Import Alert Component
import alertComponent from 'src/components/alertSwal/alertComponent'
// Import Axios
import Axios from 'axios'

const Login = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const login = (e) => {
    if (userName === '' || password === '') {
      alertComponent('warning', 'กรุณาใส่ข้อมูลเพื่อเข้าใช้!')
    }

    let payload = {
      userName: userName,
      password: password,
    }

    if (userName !== '' && password !== '') {
      Axios.post('http://localhost:3001/auth', payload)
        .then((result) => {
          let status = result.data.status
          let data = result.data.data
          console.log(data)
          if (status === 200) {
            alertComponent('success', 'ลงชื่อเข้าใช้สำเร็จ').then(() => {
              dispatch({
                type: 'setRole',
                userData: {
                  userName: data.userName,
                  role: data.role,
                  fullName: `${data.firstName} ${data.lastName}`,
                },
              })

              cookie.save(
                'userId',
                {
                  userName: data.userName,
                  role: data.role,
                  fullName: `${data.firstName} ${data.lastName}`,
                },
                { maxAge: 3600 * 3 },
              )
              return navigate('/dashboard')
            })
          }
        })
        .catch((error) => {
          console.log(error)
          alertComponent('error', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
        })
    }
    e.preventDefault()
  }

  dispatch({
    type: 'setRole',
    userData: [],
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    onSubmit={(e) => {
                      login(e)
                    }}
                  >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">ล็อกอินเพื่อเข้าใช้งาน</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="userName"
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {/* <Link to="/dashboard"> */}
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                        {/* </Link> */}
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '100%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>ลงทะเบียน</h2>
                    <p>
                      ผู้แจ้งซ่อมสามารถแจ้งผ่านระบบออนไลน์ และสามารถตรวจสอบสถานะการแจ้งซ่อม
                      ว่างานที่แจ้งอยู่ในสถานะใด เช่น แจ้งซ่อม/ รอตรวจสอบ / ดำเนินการ / ส่งซ่อม
                      เป็นต้น
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        ลงทะเบียน ตอนนี้!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
