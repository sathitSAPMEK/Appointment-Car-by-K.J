import React, { useState } from 'react'
import cookie from 'react-cookies'
import {
  CButton,
  CCard,
  CCardBody,
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

// Import Alert Component
import alertComponent from 'src/components/alertSwal/alertComponent'
// Import Axios
import Axios from 'axios'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [showLinkLogin, setShowLinkLogin] = useState(false)

  const createAccount = (e) => {
    console.log('Register')
    if (password !== rePassword) {
      alertComponent('warning', 'รหัสผ่านไม่ตรงกัน')
    }

    let payload = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      userName: userName,
    }

    Axios.post('http://localhost:3001/register', payload)
      .then((result) => {
        let status = result.data.status
        if (status === 200) {
          alertComponent('success', 'สร้างบัญชีสำเร็จ')
          setShowLinkLogin(true)
        } else if (status === 201) {
          alertComponent('warning', 'User Name นี้ใช้เเล้ว')
        }
      })
      .catch((error) => {
        console.log(error)
        alertComponent('error', 'ไม่สามารถสร้างบัญชีได้กรุณาลองใหม่อีกครั้ง')
      })
    e.preventDefault()
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              {!showLinkLogin && (
                <CCardBody className="p-4">
                  <CForm
                    onSubmit={(e) => {
                      createAccount(e)
                    }}
                  >
                    <h1>ลงทะเบียนผู้ใช้</h1>
                    <p className="text-medium-emphasis">สร้างผู้ใช้งานเพื่อเข้าใช้งานระบบ</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="First name"
                        autoComplete="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Last name"
                        autoComplete="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="user name"
                        autoComplete="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" type="submit">
                        Create Account
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              )}
              {showLinkLogin && (
                <CCard className="mx-4">
                  <h5>ลงทะเบียนเสร็จสิ้น คลิกลิ้งระบบจะนำไปสู่การเข้าใช้งาน</h5>
                  <CButton
                    color="info"
                    type="submit"
                    onClick={() => (window.location.href = '/?#/login')}
                  >
                    Click To Login
                  </CButton>
                </CCard>
              )}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
